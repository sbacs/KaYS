import { NextResponse } from 'next/server';
import { Articolo } from '@/app/lib/types';
import { createArticolo, getArticoli } from '@/app/services/articoli';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)

    const fornitore = searchParams.get("Fornitore") ?? ""
    const prodotto = searchParams.get("Prodotto") ?? ""
    const q = searchParams.get("q") ?? ""

    try {
        const articoli: Articolo[] = await getArticoli("", prodotto, fornitore, q);
        return NextResponse.json(articoli, { status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }

}


export async function POST(request: Request) {

    const body = await request.json();
    const {
        nome,
        idProdotto,
        descrizione,
        quantitaRecipiente,
        idFornitore,
        posizione,
        linkScheda
    } = body;

    if (!nome || !quantitaRecipiente || !idFornitore || !posizione || !linkScheda || !idProdotto)
        return NextResponse.json({ response: "campi mancanti" }, { status: 400 });

    try {

        await createArticolo(nome, descrizione, idProdotto, idFornitore, quantitaRecipiente, posizione, linkScheda)
        return NextResponse.json({ status: 200 });

    } catch (e) {
        console.log("errore", e)
        return NextResponse.json({ status: 500 });
    }
}


