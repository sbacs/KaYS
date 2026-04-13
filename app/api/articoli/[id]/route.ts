import { NextResponse } from 'next/server';
import { Articolo } from '@/app/lib/types';
import { createArticolo, deleteArticolo, getArticoli } from '@/app/services/articoli';



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
