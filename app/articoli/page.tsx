import { Articolo } from "../lib/types"
import { getArticoli } from "../services/articoli"
import Link from "next/link"

export default async function articolo() {

    const articoli: Articolo[] = await getArticoli()


    return (
        <div className="flex flex-col gap-y-4 justify-center px-5 py-5  w-full items-center">
            <div className="grid  grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-5 w-full">
                {
                    articoli.map((a) => {
                        return <div key={a.id} className="h-75 shrink-0 justify-between aspect-square flex flex-col rounded-lg  bg-white/5 p-5 ">

                            <div>
                                <h1 className="font-extrabold text-lg"> {a.nome}</h1>

                                <div>
                                    <h1 className="font-bold flex">Fornitore</h1>
                                    <h1> {a.fornitore}</h1>
                                </div>
                                <div>
                                    <h1 className="font-bold flex">Descrizione</h1>
                                    <h1> {a.descrizione}</h1>
                                </div>
                            </div>


                            <div className="w-full flex justify-between">
                                <Link href={`/articoli/${a.id}`}  className="bg-yellow-500 p-2 px-5 rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150"> Edit</Link>
                                <button className="bg-red-500 p-2 px-5 rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150">Delete</button>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}