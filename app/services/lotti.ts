import pool from "../lib/db";
import { Ricetta, RicettaDettagliata, Ingrediente } from "../lib/types";
import { Articolo } from "../lib/types";
import { RowDataPacket } from "mysql2";


export async function lottiTotali() {
    const [totale] = await pool.query<RowDataPacket[]>(`
        select count(id) as totale from lotto;
    `)
    return Number(totale[0].totale);
}