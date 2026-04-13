import { NextResponse } from 'next/server';
import { deleteArticolo } from '@/app/services/articoli';


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ idArticolo: string }> }
) {

    const { idArticolo: id } = await params;

    try {
        await deleteArticolo(Number(id));
        return NextResponse.json({ status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }

}
