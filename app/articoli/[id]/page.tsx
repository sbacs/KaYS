import { Articolo, ArticoloDettagliato, Prodotto } from "@/app/lib/types"
import { getArticolo } from "@/app/services/articoli"
import { getProdotto } from "@/app/services/prodotti";
import Link from "next/link";
import PannelloArticolo from "@/app/_components/PanelloArticolo";


export default async function articolo({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    const articolo: ArticoloDettagliato = await getArticolo(Number(id))
    const prodotto: Prodotto = await getProdotto(Number(id))
    //const chemData = prodotto.cas  ? await (await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${await (await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${prodotto.cas}/json`)).json().then(r => r.PC_Compounds[0].id.id.cid) }/JSON/`)).json() : ""

    return (
        <div className="flex gap-x-10 justify-center lg:p-5 py-5 h-full w-full ">
            <PannelloArticolo articolo={articolo} />
        </div>
    )
}