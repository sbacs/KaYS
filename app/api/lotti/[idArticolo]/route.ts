import { NextResponse } from 'next/server';
import { Lotto } from '@/app/lib/types';
import { getLotti } from '@/app/services/lotti';
import { error } from 'console';




export async function GET(
    request: Request,
    { params }: { params: Promise<{ idArticolo: string }> }
) {

    

    const { idArticolo: id } = await params;
    try {
        const lotti: Lotto[] = await getLotti(Number(id));
        return NextResponse.json(lotti, { status: 200 });

    } catch (e: any) {

        return NextResponse.json({ status: 500, error: e.message });
    }
}