import pool from "../lib/db";
import { Ricetta, RicettaDettagliata, Ingrediente } from "../lib/types";

export async function createRicetta(nome: string, descrizione: string = "") {
    const [result] = await pool.query(`INSERT INTO ricette (nome, descrizione) VALUES (?, ?)`, [nome, descrizione]);
    return result;
}

export async function getRicette() {
    const [ricette] = await pool.query<Ricetta[]>(` SELECT * from ricette `)
    return ricette;
}

export async function getRicetta(id: number) {
    const [ricetta] = await pool.query<Ricetta[]>(` SELECT * from ricette r where r.id = ? `, [id])

    if(!ricetta[0]) throw { message: "not found", status: 404 }

    const [ingredienti] = await pool.query<Ingrediente[]>(`
        select JSON_OBJECT('id', c.id, 'nome', c.nome) as categoria, p.id, p.nome, p.cas, p.classificazione, p.quantita_riordino as "quantitaRiordino", 
        p.descrizione, JSON_OBJECT('id', um.id, 'tipo', um.tipo) as unita from ricette r 
        join prodotto_ricetta pr on pr.id_ricetta  = r.id 
        join prodotti p on p.id  = pr.id_prodotto 
        join unita_misura um on um.id = p.id_unita
        join categorie c on c.id = p.id_categoria
        where r.id  = ?`, [id])

    return {
        ...ricetta[0],
        ingredienti

    };
}

export async function addProduct(idProdotto: number, idRicetta: number, quantita: number ) {
    const [result] = await pool.query(` 
        insert into prodotto_ricetta (id_prodotto, id_ricetta, quantita_richiesta) values (?, ?, ?)    
    `, [idProdotto, idRicetta, quantita])

    return result
}

export async function deleteRicetta(id:number) {
    const [result] = await pool.query(`delete from ricette where id = ?`, [id]);
    return result;
}