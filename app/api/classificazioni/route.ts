import { NextResponse } from 'next/server';
import { createClassificazione, getClassificazioni } from '@/app/services/classificazioni';
import { classificazione } from '@/app/lib/types';

export async function GET() {

    try {
        const classificazioni : classificazione[] = await getClassificazioni();
        return NextResponse.json(classificazioni, { status: 200 });

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

        await createClassificazione(nome)
        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json({ status: 500 });
    }
}