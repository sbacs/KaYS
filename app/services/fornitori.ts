import pool from "../lib/db";
import { Fornitore } from "../lib/types";

export async function createFornitoro(nome: string) {
    const [result] = await pool.query(`INSERT INTO fornitori (nome) VALUES (?)`, [nome]);
    return result;
}

export async function getFornitori() {
    const [fornitore] = await pool.query<Fornitore[]>(` SELECT * from fornitori `)
    return fornitore;
}