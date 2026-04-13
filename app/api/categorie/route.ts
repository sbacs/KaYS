import { NextResponse } from 'next/server';
import { getCategorie, createCategoria } from '@/app/services/categorie';
import { Categoria } from '@/app/lib/types';

export async function GET() {

    try {
        const categorie : Categoria[] = await getCategorie();
        return NextResponse.json(categorie, { status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }

}


export async function POST(request: Request) {

    const body = await request.json();
    const { nome } = body;

    if (!nome)
        return NextResponse.json({ response: "nome richiesto" }, { status: 400 });

    try {

        await createCategoria(nome)
        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json({ status: 500 });
    }
}