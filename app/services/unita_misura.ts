import pool from "../lib/db";
import { Unita } from "../lib/types";

export async function createUnita(tipo: string, iniziali: string) {
    const [result] = await pool.query(`INSERT INTO unita_misura (tipo, iniziali) VALUES (?, ?)`, [tipo, iniziali]);
    return result;
}

export async function getUnita() {
    const [unita] = await pool.query<Unita[]>(` SELECT * from unita_misura `)
    return unita;
}