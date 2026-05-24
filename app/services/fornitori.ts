import pool from "../lib/db";
import { Fornitore } from "../lib/types";

export async function createFornitoro(nome: string) {
    const [result] = await pool.query(`INSERT INTO fornitori (nome) VALUES (?)`, [nome]);
    return result;
}

export async function getFornitori(idArticolo: string = "", nomeArticolo: string = "") {
    const conditions: string[] = []
    const params: string[] = []

    if (idArticolo) {
        conditions.push("a.id = ?")
        params.push(idArticolo)
    }
        if (nomeArticolo) {
        conditions.push("a.nome = ?")
        params.push(nomeArticolo)
    }


    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""

    const [fornitore] = await pool.query<Fornitore[]>(` SELECT f.id, f.nome from fornitori f
        join articoli a on a.id_fornitore = f.id
        ${where} `, params)
        
    return fornitore;
}