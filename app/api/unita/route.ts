import { NextResponse } from 'next/server';
import { createUnita, getUnita } from '@/app/services/unita_misura';
import { Unita } from '@/app/lib/types';

export async function GET() {

    try {
        const unita : Unita[] = await getUnita()
        return NextResponse.json(unita, {status: 200});
    } catch {
        return NextResponse.json({ status: 500 });
    }

}



export async function POST(request: Request) {

    const body = await request.json();
    const { tipo, iniziali } = body;

    if (!tipo || !iniziali)
        return NextResponse.json({ response: "tipo o iniziali richiesti" }, { status: 400 });

    try {

        await createUnita(tipo, iniziali);
        return NextResponse.json({ status: 200});

    } catch {
        return NextResponse.json({ status: 500 });
    }
}