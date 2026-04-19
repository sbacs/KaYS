import pool from "../lib/db";
import { Ricetta, RicettaDettagliata, Ingrediente, ArticoloDettagliato } from "../lib/types";
import { Articolo } from "../lib/types";
import { RowDataPacket } from "mysql2";

export async function createArticolo(nome: string, descrizione: string = "", idProdotto: number, idFornitore: number, quantitaRecipiente: number, posizione: string, linkScheda: string) {
    const [result] = await pool.query(`INSERT INTO articoli (nome, descrizione, id_prodotto, quantita_recipiente, id_fornitore, posizione, link_scheda) VALUES (?, ?, ?, ?, ?, ?, ?)`, [nome, descrizione, idProdotto, quantitaRecipiente, idFornitore, posizione, linkScheda]);
    return result;
}


export async function deleteArticolo(id: number) {
    const [result] = await pool.query(`delete from articoli where id = ?`, [id]);
    return result;
}

export async function getArticolo(id: number) {
    const [articolo] = await pool.query<ArticoloDettagliato[]>(` 
        SELECT
            a.nome, 
            a.descrizione, 
            a.id, 
            a.quantita_recipiente AS "quantitaRecipiente", 
            a.posizione, 
            a.link_scheda AS "linkScheda", 
            f.nome AS "fornitore",
            a.id_prodotto as "idProdotto",
            JSON_OBJECT(
            'id', p.id,
            'cas', p.cas,
            'idUnita', p.id_unita,
            'descrizione', p.descrizione,
            'nome', p.nome,
            'concentrazione', p.concentrazione,
            'classificazione', p.classificazione,
            'quantitaRiordino', p.quantita_riordino,
            'categoria', JSON_OBJECT('id', c.id, 'nome', c.nome),
            'unita', JSON_OBJECT('id', um.id, 'tipo', um.tipo)
            ) AS prodotto
        FROM articoli a
        JOIN fornitori f ON f.id = a.id_fornitore
        JOIN prodotti p ON p.id = a.id_prodotto
        JOIN unita_misura um ON um.id = p.id_unita
        JOIN categorie c ON c.id = p.id_categoria
        WHERE a.id = ? 
    `, [id])

    if (!articolo[0]) throw { message: "not found", status: 404 }

    return articolo[0];
}

export async function articoliTotali() {
    const [totale] = await pool.query<RowDataPacket[]>(`
        select count(id) as totale from articoli;
    `)
    return Number(totale[0].totale);
}

export async function getArticoli(ordine = "", prodotto = "", fornitore = "", q = "") {
    const conditions: string[] = []
    const params: string[] = []

    if (fornitore) {
        conditions.push("f.nome = ?")
        params.push(fornitore)
    }

    if (prodotto) {
        conditions.push("p.nome = ?")
        params.push(prodotto)
    }

    if (q) {
        conditions.push("a.nome LIKE CONCAT('%', ?, '%')")
        params.push(q)
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""

    const [articoli] = await pool.query<Articolo[]>(`
        SELECT 
            a.nome, 
            a.descrizione, 
            a.id, 
            a.quantita_recipiente AS "quantitaRecipiente", 
            a.posizione, 
            a.link_scheda AS "linkScheda", 
            f.nome AS "fornitore"
        FROM articoli a
        JOIN fornitori f ON f.id = a.id_fornitore
        JOIN prodotti p ON p.id = a.id_prodotto
        ${where}
    `, params)

    return articoli
}
