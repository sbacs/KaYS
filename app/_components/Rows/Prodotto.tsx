"use client"

import Link from "next/link"
import { Articolo, Prodotto } from "@/app/lib/types"
import { useSearchParams } from "next/navigation";

interface ArticoloProps {
    prodotto: Prodotto;
    highlighted?: boolean;
}

export default function ProdottoRow({ prodotto, highlighted }: ArticoloProps) {

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    params.set("p", String(prodotto.id))
    const editHref = `/prodotti?${params}`

    return (
        <div key={prodotto.id} className={`h-15 flex items-center gap-x-4 md:gap-x-0 justify-between shrink-0  rounded-2xl px-5 shadow-md border-border truncate ${highlighted ? "bg-yellow-300/50" : "hover:bg-surface-raised bg-surface"}`}>

            <h1 className="w-full font-extrabold text-md lg:text-xl text-ellipsis truncate"> {prodotto.nome}</h1>

            <h1 className="text-text w-full text-md text-ellipsis truncate hidden lg:block "> {prodotto.descrizione}</h1>


            <div className="lg:w-50 shrink-0 flex items-center gap-x-5">
                <div>
                <Link href={editHref} className="hidden text-text items-center lg:flex h-[75%] rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150">Edit</Link>
                    <Link href={`/prodotti/${prodotto.id}`} className="flex lg:hidden text-text items-center h-[75%]  rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150">Edit</Link>
                </div>
                <button className="underline hidden lg:flex  rounded-lg font-bold hover:cursor-pointer items-center h-[75%]  hover:scale-105 transition-transform duration-150">Delete</button>
            </div>

        </div>
    )
}