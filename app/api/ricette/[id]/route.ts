import { NextResponse } from "next/server";
import { addProduct, deleteRicetta, getRicetta } from "@/app/services/ricette";
import { RicettaDettagliata } from "@/app/lib/types";


//Restituisce una ricetta specifica
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    try {
        const ricetta: RicettaDettagliata = await getRicetta(Number(id))
        return NextResponse.json(ricetta, { status: 200 });
        
    } catch (e: any) {
        console.log("error: ", e)
        return NextResponse.json({message: e.message}, { status: e.status ?? 500 });
    }

}



//Aggiunge un nuovo prodotto alla ricetta
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const body = await request.json();
    const { 
        idProdotto,
        quantita
     } = body;

    if (!idProdotto || !quantita)
        return NextResponse.json({ response: "quantità e id del prodotto richiesti" }, { status: 400 });

    try {
        await addProduct(idProdotto, Number(id), quantita);
        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json({ status: 500 });
    }
}


//Cancella ricetta

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    try {
        await deleteRicetta(Number(id));
        return NextResponse.json({ status: 200 });

    } catch {

        return NextResponse.json({ status: 500 });
    }

}