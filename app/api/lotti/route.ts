import { NextResponse } from 'next/server';
import { Lotto } from '@/app/lib/types';
import { getLotti } from '@/app/services/lotti';



export async function GET(
    request: Request
) {

    const { searchParams } = new URL(request.url)

    const nomeArticolo = searchParams.get("NomeArticolo") ?? ""
    const idMagazzino = searchParams.get("IdMagazzino") ?? ""
    const quantita = searchParams.get("q") ?? ""
    const dataScadenza = searchParams.get("DataScadenza") ?? ""
    const dataLotto = searchParams.get("DataLotto") ?? ""
    try {
        const lotti: Lotto[] = await getLotti(0, nomeArticolo, Number(idMagazzino), Number(quantita), dataScadenza ? new Date(dataScadenza) : null, dataLotto ? new Date(dataLotto) : null);
        return NextResponse.json(lotti, { status: 200 });

    } catch (e: any) {

        return NextResponse.json({ status: 500, error: e.message });
    }
}