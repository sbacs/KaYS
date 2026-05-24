import pool from "../lib/db";
import { Ricetta, RicettaDettagliata, Ingrediente, Lotto } from "../lib/types";
import { Articolo } from "../lib/types";
import { RowDataPacket } from "mysql2";


export async function lottiTotali() {
    const [totale] = await pool.query<RowDataPacket[]>(`
        select count(id) as totale from lotto;
    `)
    return Number(totale[0].totale);
}

export async function getLotti(idArticolo: number = 0, nomeArticolo: string = "", idMagazzino: number = 0, quantita: number = 0, dataScadenza: Date | null = null, dataLotto: Date | null = null) {

    const conditions: string[] = []
    const params: string[] = []

    if (idArticolo) {
        conditions.push("l.id_articolo = ?")
        params.push(String(idArticolo))
    }

    if (nomeArticolo) {
        conditions.push("a.nome LIKE ?")
        params.push(`%${nomeArticolo}%`)
    }

    if (idMagazzino) {
        conditions.push("l.id_magazzino = ?")
        params.push(String(idMagazzino))
    }

    if (quantita) {
        conditions.push("l.quantita > ?")
        params.push(String(quantita))
    }

    if(dataScadenza){
        conditions.push("DATE(l.data_scadenza) <= ?")
        params.push(dataScadenza.toISOString().split("T")[0])
    }
    
    if(dataLotto){
        conditions.push("DATE(l.data_lotto) <= ?")
        params.push(dataLotto.toISOString().split("T")[0])
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""

    const [lotti] = await pool.query<Lotto[]>(`
        select 
            l.id, 
            l.quantita, 
            l.data_scadenza as dataScadenza, 
            l.posizione,
            l.quantita_ordinata as quantitaOrdinata,
            l.data_lotto as dataLotto,
            JSON_OBJECT('id', m.id, 'nome', m.nome) as magazzino,
            JSON_OBJECT('id', um.id, 'tipo', um.tipo) as unita,
            JSON_OBJECT('id', a.id, 
                'nome', a.nome, 
                'descrizione', a.descrizione, 
                'idProdotto', a.id_prodotto, 
                'idFornitore', a.id_fornitore,
                'quantitaRecipiente', a.quantita_recipiente,
                'linkScheda', a.link_scheda,
                'fornitore', JSON_OBJECT('id', f.id, 'nome', f.nome) 
                ) as articolo
        from lotto l
        JOIN articoli a on a.id = l.id_articolo
        JOIN prodotti p on p.id = a.id_prodotto
        JOIN unita_misura um on um.id = p.id_unita
        JOIN fornitori f on f.id = a.id_fornitore
        JOIN magazzini m on m.id = l.id_magazzino
        ${where} order by l.data_scadenza asc;
    `, params)

    return lotti;
}
