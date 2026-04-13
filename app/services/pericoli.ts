import pool from "../lib/db";
import { Pericolo } from "../lib/types";

export async function createPericolo(nome: string) {
    const [result] = await pool.query(`INSERT INTO pericoli (nome) VALUES (?)`, [nome]);
    return result;
}

export async function getPericoli() {
    const [pericoli] = await pool.query<Pericolo[]>(` SELECT * from pericoli `)
    return pericoli;
}