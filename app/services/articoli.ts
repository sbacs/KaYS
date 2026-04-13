import pool from "../lib/db";
import { Ricetta, RicettaDettagliata, Ingrediente } from "../lib/types";
import { Articolo } from "../lib/types";

export async function createArticolo(nome: string, descrizione: string = "", idProdotto: number, idFornitore: number, quantitaRecipiente: number, posizione: string, linkScheda: string) {
    const [result] = await pool.query(`INSERT INTO articoli (nome, descrizione, id_prodotto, quantita_recipiente, id_fornitore, posizione, link_scheda) VALUES (?, ?, ?, ?, ?, ?, ?)`, [nome, descrizione, idProdotto, quantitaRecipiente, idFornitore, posizione, linkScheda]);
    return result;
}

export async function getArticoli() {
    const [articoli] = await pool.query<Articolo[]>(` 
        SELECT a.nome, a.descrizione, a.quantita_recipiente as "quantitaRecipiente", a.posizione, a.link_scheda as "linkScheda", f.nome as "fornitore" from articoli a
        join fornitori f on f.id = a.id_fornitore            
    `)
    return articoli;
}


export async function deleteArticolo(id:number) {
    const [result] = await pool.query(`delete from articoli where id = ?`, [id]);
    return result;
}