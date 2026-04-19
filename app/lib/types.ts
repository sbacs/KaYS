import { RowDataPacket } from "mysql2"

export interface Unita extends RowDataPacket {
    id: number;
    tipo: string;
}

export interface Categoria extends RowDataPacket {
    id: number;
    nome: string;
}

export interface CategoriaDettagliata extends Categoria{
    prodotti: Prodotto[]
}

export interface Magazzino extends RowDataPacket {
    id: number;
    nome: string;
}

export interface Fornitore extends RowDataPacket {
    id: number;
    nome: string
}

export interface Pericolo extends RowDataPacket {
    id: number;
    nome: string
}

export interface classificazione extends RowDataPacket {
    id: number;
    classificazione: string;
}

export interface Ricetta extends RowDataPacket {
    id: number;
    nome: string;
    descrizione: string
}

export interface RicettaDettagliata extends Ricetta {
    ingredienti: Ingrediente[];
}

export interface Prodotto extends RowDataPacket {
    id: number;
    nome: string;
    descrizione: string;
    categoria: Categoria;
    cas: string;
    unita: Unita;
    concentrazione: number;
    quantitaRiordino: number;
    classificazione: string;
}

export interface Ingrediente extends Prodotto {
    quantita_richiesta: number;
}

export interface Articolo extends RowDataPacket {
    id: number;
    idProdotto: number;
    nome: string;
    quantitaRecipiente: number;
    fornitore: string;
    descrizione: string;
    posizione: string;
    linkScheda: string;
}

export interface ArticoloDettagliato extends Articolo{
    prodotto: Prodotto
}
