import { Articolo } from "../lib/types"
import { getArticoli } from "../services/articoli"
import Link from "next/link"

export default async function articolo() {

    const articoli: Articolo[] = await getArticoli()


    return (
        <div className="flex flex-col gap-y-8 justify-center px-5 py-5  w-full items-center">
            <h1 className="text-4xl text-card font-bold">Catalogo Articoli</h1>
            <div className="grid  grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-5 w-full  overflow-y-scroll py-2">
                {
                    articoli.map((a) => {
                        return <div key={a.id} className="h-75 shrink-0 bg-card-light justify-between aspect-square flex flex-col rounded-2xl shadow-md border-card/15 p-5 ">

                            <div className="flex flex-col gap-y-4">


                                <div>
                                    <h1 className="font-extrabold text-xl"> {a.nome}</h1>
                                    <h1 className="text-md text-card/75"> {a.fornitore}</h1>
                                </div>

                                <h1 className="text-card text-md"> {a.descrizione}</h1>

                            </div>


                            <div className="w-full flex justify-between">
                                <Link href={`/articoli/${a.id}`} className="bg-card text-card-light p-2 px-5 rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150"> Edit</Link>
                                <button className="bg-red-500 p-2 px-5 rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150">Delete</button>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}