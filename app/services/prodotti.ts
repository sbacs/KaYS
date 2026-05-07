import pool from "../lib/db";
import { Prodotto } from "../lib/types";
import { RowDataPacket } from "mysql2";

export async function createProdotto(nome: string, descrizione: string = "", idUnita: number, quanitaRiordino: number, classificazione: string, concentrazione: number, cas: string, idCategoria: number) {
    const [result] = await pool.query(`INSERT INTO prodotti (nome, cas, id_unita, descrizione, concentrazione, quantita_riordino, classificazione, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [nome, idUnita, cas, descrizione, concentrazione, quanitaRiordino, classificazione, idCategoria]);
    return result;
}


export async function getProdotti(ordine = "", categoria = "", unita = "", q = "") {
    const conditions: string[] = []
    const params: string[] = []

    if (categoria) {
        conditions.push("c.nome = ?")
        params.push(categoria)
    }

    if (unita) {
        conditions.push("u.tipo = ?")
        params.push(unita)
    }

    if (q) {
        conditions.push("p.nome LIKE CONCAT('%', ?, '%')")
        params.push(q)
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""

    const [prodotti] = await pool.query<Prodotto[]>(`
        SELECT 
            p.nome, 
            p.descrizione, 
            p.id, 
            p.quantita_riordino AS "quantitaRiordino", 
            p.cas, 
            p.classificazione, 
            JSON_OBJECT('id', u.id, 'tipo', u.tipo) as Unita,
            JSON_OBJECT('id', c.id, 'nome', c.nome) as categoria
        FROM prodotti p
        join unita_misura u on u.id = p.id_unita
        JOIN categorie c ON c.id = p.id_categoria
        ${where}
    `, params)

    return prodotti
}

export async function prodottiTotali() {
    const [totale] = await pool.query<RowDataPacket[]>(`
        select count(id) as totale from prodotti;
    `)
    return Number(totale[0].totale);
}

export async function deleteProdotto(id: number) {
    const [result] = await pool.query(`delete from prodotti where id = ?`, [id]);
    return result;
}

export async function getProdotto(id: number) {
    const [prodotto] = await pool.query<Prodotto[]>(` 
        select p.id, p.cas, p.id_unita as "idUnita", p.descrizione, p.nome, p.concentrazione, p.classificazione, p.quantita_riordino as "quantitaRiordino",JSON_OBJECT('id', c.id, 'nome', c.nome) as categoria , JSON_OBJECT('id', um.id, 'tipo', um.tipo) as unita from prodotti p
        join unita_misura as um on um.id = p.id_unita
        join categorie c on c.id = p.id_categoria
        where p.id = ?
    `, [id])

    if (!prodotto[0]) throw { message: "not found", status: 404 }

    return prodotto[0];
}


export async function editProdotto(
    idProdotto: number,
    updates: {
        nome?: string,
        cas?: string,
        idUnita?: number,
        quantitaRiordino?: number,
        descrizione?: string,
        classificazione?: string,
        idCategoria?: number,
    }
) {
    const fields = {
        nome: updates.nome,
        cas: updates.cas,
        quantita_riordino: updates.quantitaRiordino,
        id_categoria: updates.idCategoria,
        descrizione: updates.descrizione,
        classificazione: updates.classificazione,
        id_unita: updates.idUnita,
    };


    const entries = Object.entries(fields).filter(([_, v]) => v !== undefined);
    const setClauses = entries.map(([col], i) => `${col} = ?`).join(', ');
    const values = entries.map(([_, v]) => v);

    const [result] = await pool.query(
        `UPDATE prodotti SET ${setClauses} WHERE id = ?`,
        [...values, idProdotto]
    );

    return [result]
}