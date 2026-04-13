import { NextResponse } from 'next/server';
import { getRicette, createRicetta } from '@/app/services/ricette';
import { Ricetta } from '@/app/lib/types';



//Restituisce tutte le ricette
export async function GET() {

    try {
        const ricette : Ricetta[] = await getRicette()
        return NextResponse.json(ricette, {status: 200});
    } catch {
        return NextResponse.json({ status: 500 });
    }

}



//Crea una nuova richiesta
export async function POST(request: Request) {

    const body = await request.json();
    const { nome, descrizione } = body;

    if (!nome)
        return NextResponse.json({ response: "nome richiesto" }, { status: 400 });

    try {

        await createRicetta(nome, descrizione);
        return NextResponse.json({ status: 200});

    } catch {
        return NextResponse.json({ status: 500 });
    }
}