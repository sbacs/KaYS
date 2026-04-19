"use client"

import Link from "next/link"
import { Articolo } from "@/app/lib/types"

interface ArticoloProps {
    articolo: Articolo;
    setEdit: (id : Number) => void;
}

export default function ArticoloRow({ articolo, setEdit }: ArticoloProps) {
    return (
        <div key={articolo.id} className="h-15 flex  bg-card-secondary items-center justify-between shrink-0  rounded-2xl px-5 shadow-md border-card/15 truncate ">

            <h1 className="w-full font-extrabold text-xl"> {articolo.nome}</h1>
            <h1 className="text-sm w-full text-card/75"> {articolo.fornitore}</h1>

            <h1 className="text-card w-full text-md text-ellipsis truncate "> {articolo.descrizione}</h1>


            <div className="w-50 shrink-0 flex items-center ">
                <button onClick={() => setEdit(articolo.id)} className=" text-card items-center flex h-[75%]  rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150"> Edit</button>
                <button className="underline px-5 rounded-lg font-bold hover:cursor-pointer items-center flex h-[75%]  hover:scale-105 transition-transform duration-150">Delete</button>
            </div>
            
        </div>
    )
}