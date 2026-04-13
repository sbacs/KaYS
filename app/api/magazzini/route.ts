import { NextResponse } from 'next/server';
import { getMagazzini, createMagazzino } from '@/app/services/magazzini';
import { Magazzino } from '@/app/lib/types';

export async function GET() {

    try {
        const magazzini : Magazzino[] = await getMagazzini();

        return NextResponse.json(magazzini, { status: 200 });

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

        await createMagazzino(nome)
        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json({ status: 500 });
    }
}