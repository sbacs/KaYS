import { Articolo } from "../lib/types"
import { getArticoli } from "../services/articoli"


export default async function articolo() {

    const articoli : Articolo[] = await getArticoli()

    return (
        <div className="flex flex-col gap-y-4 justify-center px-25 py-5">
            {
                articoli.map((a) => {
                    return <div className="h-10 flex items-center rounded-lg  bg-white/5 px-5 ">{a.nome} + {a.fornitore} + {a.posizione} + {a.descrizione} + {a.quantitaRecipiente} </div>
                })
            }
        </div>
    )
}