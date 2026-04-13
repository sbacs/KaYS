import { NextResponse } from 'next/server';
import { Articolo } from '@/app/lib/types';
import { createArticolo, deleteArticolo, getArticoli } from '@/app/services/articoli';

export async function GET() {

    try {
        const articoli : Articolo[] = await getArticoli();
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

    } catch(e) {
        console.log("errore", e)
        return NextResponse.json({ status: 500 });
    }
}


