import { NextResponse } from 'next/server';
import { Prodotto } from '@/app/lib/types';
import { createProdotto, getProdotti } from '@/app/services/prodotti';

export async function GET() {

    try {
        const articoli : Prodotto[] = await getProdotti();
        return NextResponse.json(articoli, { status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }
}


export async function POST(request: Request

) {

    const body = await request.json();
    const { 
        nome,
        idCategoria,
        descrizione, 
        quanitaRiordino,
        idUnita,
        cas,
        classificazione,
        concentrazione
    } = body;

    if (!nome || !idCategoria || !idUnita || !cas || !classificazione)
        return NextResponse.json({ response: "campi mancanti" }, { status: 400 });

    try {

        await createProdotto(nome, descrizione, idUnita, quanitaRiordino, classificazione, concentrazione, cas, idCategoria)
        return NextResponse.json({ status: 200 });

    } catch(e) {
        console.log("errore", e)
        return NextResponse.json({ status: 500 });
    }
}


