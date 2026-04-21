"use client"

import Link from "next/link"
import { Articolo } from "@/app/lib/types"

interface ArticoloProps {
    articolo: Articolo;
    setEdit: (id: Number) => void;
}

export default function ArticoloRow({ articolo, setEdit }: ArticoloProps) {
    return (
        <div key={articolo.id} className="h-15 flex  bg-card-secondary items-center gap-x-4 md:gap-x-0 justify-between shrink-0  rounded-2xl px-5 shadow-md border-card/15 truncate ">

            <h1 className="w-full font-extrabold text-md lg:text-xl text-ellipsis truncate"> {articolo.nome}</h1>
            <h1 className="text-sm w-full text-card/75 hidden lg:block"> {articolo.fornitore.nome}</h1>

            <h1 className="text-card w-full text-md text-ellipsis truncate hidden lg:block "> {articolo.descrizione}</h1>


            <div className="lg:w-50 shrink-0 flex items-center gap-x-5">
                <div>
                    <button onClick={() => setEdit(articolo.id)} className="hidden  text-card items-center lg:flex h-[75%]  rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150"> Edit</button>
                    <Link href={`/articoli/${articolo.id}`} className="flex lg:hidden text-card items-center h-[75%]  rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150">Edit</Link>
                </div>
                <button className="underline hidden lg:flex  rounded-lg font-bold hover:cursor-pointer items-center h-[75%]  hover:scale-105 transition-transform duration-150">Delete</button>
            </div>

        </div>
    )
}