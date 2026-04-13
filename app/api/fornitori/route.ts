import { NextResponse } from 'next/server';
import { createFornitoro, getFornitori } from '@/app/services/fornitori';
import { Fornitore } from '@/app/lib/types';

export async function GET() {

    try {
        const fornitori : Fornitore[] = await getFornitori();
        return NextResponse.json(fornitori, { status: 200 });

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

        await createFornitoro(nome)
        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json({ status: 500 });
    }
}