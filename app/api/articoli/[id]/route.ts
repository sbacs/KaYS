import { NextResponse } from 'next/server';
import { Articolo } from '@/app/lib/types';
import { createArticolo, deleteArticolo, getArticolo } from '@/app/services/articoli';


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    try {
        const articolo: Articolo = await getArticolo(Number(id));
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
