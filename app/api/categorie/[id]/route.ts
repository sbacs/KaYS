import { NextResponse } from 'next/server';
import { CategoriaDettagliata } from '@/app/lib/types';
import { getCategoria } from '@/app/services/categorie';



export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    try {
        const prodotti : CategoriaDettagliata = await getCategoria(Number(id));
        return NextResponse.json(prodotti);

    } catch(e : any) {

        return NextResponse.json({message: e.message,  status: e.status ?? 500 });
    }

}
