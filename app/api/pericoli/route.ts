import { NextResponse } from 'next/server';
import { getPericoli, createPericolo } from '@/app/services/pericoli';
import { Pericolo } from '@/app/lib/types';

export async function GET() {

    try {
        const pericoli : Pericolo[] = await getPericoli()
        return NextResponse.json(pericoli, {status: 200});
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

        await createPericolo(nome);
        return NextResponse.json({ status: 200});

    } catch {
        return NextResponse.json({ status: 500 });
    }
}