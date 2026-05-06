"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { Articolo } from "@/app/lib/types"

interface ArticoloProps {
    articolo: Articolo;
    highlighted?: boolean;
}

export default function ArticoloRow({ articolo, highlighted = false }: ArticoloProps) {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    params.set("p", String(articolo.id))
    const editHref = `/articoli?${params}`

    return (
        <div className={`h-15 flex transition-color duration-100 ${highlighted ? "bg-yellow-300/50" : "hover:bg-surface-raised bg-surface"} items-center gap-x-4 md:gap-x-0 justify-between shrink-0 rounded-2xl px-5 shadow-md border-border truncate`}>
            <h1 className="w-full font-extrabold text-md lg:text-xl text-ellipsis truncate">{articolo.nome}</h1>
            <h1 className="text-sm w-full text-text/75 hidden lg:block">{articolo.fornitore.nome}</h1>
            <h1 className="text-text w-full text-md text-ellipsis truncate hidden lg:block">{articolo.descrizione}</h1>
            <div className="lg:w-50 shrink-0 flex items-center gap-x-5">
                <Link href={editHref} className="hidden text-text items-center lg:flex h-[75%] rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150">Edit</Link>
                <Link href={editHref} className="flex lg:hidden text-text items-center h-[75%] rounded-lg font-bold hover:cursor-pointer hover:scale-105 transition-transform duration-150">Edit</Link>
                <button className="underline hidden lg:flex rounded-lg font-bold hover:cursor-pointer items-center h-[75%] hover:scale-105 transition-transform duration-150">Delete</button>
            </div>
        </div>
    )
}