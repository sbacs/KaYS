import pool from "../lib/db";
import { Magazzino } from "../lib/types";

export async function createMagazzino(nome: string) {
    const [result] = await pool.query(`INSERT INTO magazzini (nome) VALUES (?)`, [nome]);
    return result;
}

export async function getMagazzini() {
    const [magazzini] = await pool.query<Magazzino[]>(` SELECT * from magazzini `)
    return magazzini;
}