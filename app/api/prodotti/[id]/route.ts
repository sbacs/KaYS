import { NextResponse } from 'next/server';
import { Prodotto } from '@/app/lib/types';
import { deleteProdotto, getProdotto } from '@/app/services/prodotti';


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    try {
        const prodotto : Prodotto = await getProdotto(Number(id));
        return NextResponse.json(prodotto, { status: 200 });

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
        await deleteProdotto(Number(id));
        return NextResponse.json({ status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }

}
