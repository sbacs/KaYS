import pool from "../lib/db";
import { Ricetta, RicettaDettagliata, Ingrediente } from "../lib/types";
import { Prodotto } from "../lib/types";

export async function createProdotto(nome: string, descrizione: string = "", idUnita: number, quanitaRiordino: number, classificazione: string, concentrazione: number, cas: string, idCategoria: number) {
    const [result] = await pool.query(`INSERT INTO prodotti (nome, cas, id_unita, descrizione, concentrazione, quantita_riordino, classificazione, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [nome, idUnita, cas, descrizione, concentrazione, quanitaRiordino, classificazione, idCategoria]);
    return result;
}

export async function getProdotti() {
    const [articoli] = await pool.query<Prodotto[]>(` 
        select p.nome, p.cas, p.descrizione, p.concentrazione, p.classificazione, p.quantita_riordino as "quantitaRiordino", json_object('id', um.id, 'tipo', um.tipo) as Unita, json_object('id', c.id, 'nome', c.nome) as Categoria from prodotti p
        join unita_misura um on um.id = p.id_unita   
        join categorie c on c.id = p.id      
    `)
    return articoli;
}


export async function deleteProdotto(id: number) {
    const [result] = await pool.query(`delete from articoli where id = ?`, [id]);
    return result;
}

export async function getProdotto(id: number) {
    const [prodotto] = await pool.query<Prodotto[]>(` 
        select p.*, JSON_OBJECT('id', um.id, 'tipo', um.tipo) as unita from prodotti p
        join unita_misura as um on um.id = p.id_unita
        where p.id = ?
    `, [id])

    if (!prodotto[0]) throw { message: "not found", status: 404 }

    return prodotto[0];
}
