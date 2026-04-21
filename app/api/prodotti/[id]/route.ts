import { NextResponse } from 'next/server';
import { Prodotto } from '@/app/lib/types';
import { deleteProdotto, editProdotto, getProdotto } from '@/app/services/prodotti';


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    try {
        const prodotto: Prodotto = await getProdotto(Number(id));
        return NextResponse.json(prodotto, { status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const body = await request.json();
    const {
        nome,
        cas,
        idUnita,
        quantitaRiordino,
        descrizione,
        classificazione,
        idCategoria
    } = body;

    if (!id)
        return NextResponse.json({ response: "id prodotto richiesto" }, { status: 400 });

    try {

        await editProdotto(Number(id), {
            nome,
            cas,
            idUnita,
            quantitaRiordino,
            descrizione,
            classificazione,
            idCategoria
        })

        return NextResponse.json({ status: 200 });

    } catch (e) {
        return NextResponse.json({ error: e, status: 500 });
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    try {
        await deleteProdotto(Number(id));
        return NextResponse.json({ status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }

}
