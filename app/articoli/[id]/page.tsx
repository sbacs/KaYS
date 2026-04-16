import { Articolo, Prodotto } from "@/app/lib/types"
import { getArticolo } from "@/app/services/articoli"
import { getProdotto } from "@/app/services/prodotti";


export default async function articolo({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    const articolo: Articolo = await getArticolo(Number(id))
    const prodotto: Prodotto = await getProdotto(Number(id))

    return (
        <div className="flex gap-x-10 justify-center px-5 py-5  w-full ">
            <div className="bg-white/10 rounded-lg p-10 flex gap-5 flex-col">
                <h1 className="font-bold text-2xl">{articolo.nome}</h1>
                <h1>{articolo.quantitaRecipiente} {prodotto.unita.tipo}</h1>
                <h1>{articolo.fornitore}</h1>
                <h1>{articolo.descrizione}</h1>
                <h1>{prodotto.classificazione}</h1>

            </div>
            <div className="bg-white/10 rounded-lg p-10 flex gap-5 flex-col">

                <h1 className="font-bold text-2xl">Informazioni Prodotto</h1>
                <div>
                    <h1 className="font-bold">Numero Cas</h1>
                    <h1> {prodotto.cas}</h1>
                </div>
                <div>
                    <h1 className="font-bold">Classificazione</h1>
                    <h1> {prodotto.classificazione}</h1>
                </div>
                <div>
                    <h1 className="font-bold">Riordino</h1>
                    <h1> {prodotto.quantitaRiordino} {prodotto.unita.tipo}</h1>
                </div>
                <div>
                    <h1 className="font-bold">Descrizione</h1>
                    <h1> {prodotto.descrizione}</h1>
                </div>

            </div>
        </div>
    )
}