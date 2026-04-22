import pool from "../lib/db";
import { Prodotto } from "../lib/types";
import { RowDataPacket } from "mysql2";

export async function createProdotto(nome: string, descrizione: string = "", idUnita: number, quanitaRiordino: number, classificazione: string, concentrazione: number, cas: string, idCategoria: number) {
    const [result] = await pool.query(`INSERT INTO prodotti (nome, cas, id_unita, descrizione, concentrazione, quantita_riordino, classificazione, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [nome, idUnita, cas, descrizione, concentrazione, quanitaRiordino, classificazione, idCategoria]);
    return result;
}

export async function getProdotti() {
    const [prodotti] = await pool.query<Prodotto[]>(` 
        select p.nome, p.cas, p.descrizione, p.concentrazione, p.id, p.classificazione, p.quantita_riordino as "quantitaRiordino", json_object('id', um.id, 'tipo', um.tipo) as unita, json_object('id', c.id, 'nome', c.nome) as categoria from prodotti p
        join unita_misura um on um.id = p.id_unita   
        join categorie c on c.id = p.id_categoria      
    `)
    return prodotti;
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
} //palle