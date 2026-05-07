import { NextResponse } from 'next/server';
import { Articolo, ArticoloDettagliato } from '@/app/lib/types';
import { createArticolo, deleteArticolo, editArticolo, getArticolo } from '@/app/services/articoli';


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    try {
        const articolo: ArticoloDettagliato = await getArticolo(Number(id));
        return NextResponse.json(articolo, { status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    try {
        await deleteArticolo(Number(id));
        return NextResponse.json({ status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }

}




export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }>}
) {

    const { id } = await params;

    const body = await request.json();
    const {
        nome,
        idProdotto,
        quantitaRecipiente,
        idFornitore,
        descrizione,
        posizione,
        linkScheda
    } = body;

    try {

        await editArticolo(Number(id), {
            nome,
            idProdotto,
            quantitaRecipiente,
            idFornitore,
            descrizione,
            posizione,
            linkScheda
        })

        return NextResponse.json({ status: 200 });

    } catch (e){
        return NextResponse.json({error: e,  status: 500 });
    }
}