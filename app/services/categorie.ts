
import pool from "../lib/db";
import { Categoria, Prodotto } from "../lib/types";

export async function createCategoria(nome: string) {
    const [result] = await pool.query(`INSERT INTO categorie (nome) VALUES (?)`, [nome]);
    return result;
}

export async function getCategorie() {
    const [categoria] = await pool.query<Categoria[]>(` SELECT * from categorie `)
    return categoria;
}

export async function deleteCategoria(id: number) {
    const [result] = await pool.query(`delete from categorie where id = ?`, [id]);
    return result;
}




export async function getCategoria(id: number) {

    const [categoria] = await pool.query<Categoria[]>(`
        select * from categorie c where c.id = ?
    `, [id])

    if (!categoria[0]) throw { message: "categoria non trovata", status: 404 }

    const [prodotti] = await pool.query<Prodotto[]>(`
        select * from categorie c
        join prodotti p on p.id_categoria  =  c.id 
        where c.id  = ?
    `, [id])

    return {
        ...categoria[0],
        prodotti
    };
}