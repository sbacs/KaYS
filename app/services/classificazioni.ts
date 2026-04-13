
import pool from "../lib/db";
import { classificazione } from "../lib/types";

export async function createClassificazione(nome: string) {
    const [result] = await pool.query(`INSERT INTO classificazione_merceologica (nome) VALUES (?)`, [nome]);
    return result;
}

export async function getClassificazioni() {
    const [classificazione] = await pool.query<classificazione[]>(` SELECT * from classificazioni_merceologiche `)
    return classificazione;
}