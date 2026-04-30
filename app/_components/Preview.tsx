"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Ellipsis, SquareArrowOutUpRight, FolderSymlink} from "lucide-react"
import { Articolo, Prodotto, Categoria } from "../lib/types"


interface Preview {
    className?: string;
}



export default function Preview({ className }: Preview) {

    const [articoli, setArticoli] = useState<Articolo[]>();
    const [prodotti, setProdotti] = useState<Prodotto[]>();
    const [categorie, setCategorie] = useState<Categoria[]>();

    const [pannello, setPannello] = useState<"articoli" | "prodotti" | "categorie">("articoli")

    useEffect(() => {
        async function getPreviews() {

            setArticoli(await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articoli`)).json())
            setProdotti(await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti`)).json())
            setCategorie(await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categorie`)).json())
        }

        getPreviews();
    }, [])

    const panel: Record<string, React.ReactNode> = {
        articoli: articoli?.slice(0, 4).map((a) => {
            return <div key={a.id} className="flex flex-col border-border rounded-xl bg-surface-raised shadow-md border w-full shrink-0  gap-y-2 lg:h-full h-fit lg:p-5 p-2 justify-center lg:justify-center">
                <div className="flex justify-between items-center lg:items-start gap-x-5">
                    <h1 className="font-bold text-text text-xl text-nowrap truncate">{a.nome}</h1>
                    <Link href={`/articoli/${a.id}`} className="hover:cursor-pointer  text-text transition-all duration-150 hover:scale-110"><FolderSymlink /></Link>
                </div>

                <h1 className="hidden lg:block text-sm text-text/75">{a.descrizione}</h1>
                <h1 className="text-text hidden lg:block">{a.fornitore.nome}</h1>
            </div>
        }),
        prodotti: prodotti?.slice(0, 4).map((p) => {
            return <div key={p.id} className="flex flex-col border-border rounded-xl bg-surface-raised justify-center shadow-md border w-full gap-y-1 h-full lg:p-5 p-2">
                <div className="flex justify-between lg:items-start items-center ">
                    <h1 className="font-bold text-text text-xl">{p.nome}</h1>
                    <Link href={`/prodotti/${p.id}`} className="hover:cursor-pointer transition-all duration-150 hover:scale-110 "><FolderSymlink /></Link>
                </div>

                <h1 className="text-sm text-text/75 hidden lg:block">{p.descrizione}</h1>
                <h1 className="text-text hidden lg:block">CAS {p.cas}</h1>
                <h1 className="text-text hidden lg:block">Riordino di {p.quantitaRiordino} {p.unita.tipo}</h1>
            </div>  
        }),
        categorie: categorie?.slice(0, 4).map((c) => {
            return <div key={c.id} className="flex flex-col border-border rounded-xl bg-surface-raised shadow-md border w-full shrink-0  gap-y-2 lg:h-full h-fit lg:p-5 p-2 justify-center lg:justify-center">
                <div className="flex justify-between items-center lg:items-start gap-x-5">
                    <h1 className="font-bold text-text text-xl text-nowrap truncate">{c.nome}</h1>
                    <Link href={`/categorie/${c.id}`} className="hover:cursor-pointer transition-all duration-150 hover:scale-110"><FolderSymlink /></Link>
                </div>
            </div>
        })
    }

    return (


        <div className="bg-surface p-5 shadow-lg rounded-2xl max-h-full shrink-0 border-border border flex-col flex gap-y-4 w-full h-full">
            <div className="flex gap-x-4 items-center ">
                <h1 className="text-text font-bold text-2xl ">Anteprima</h1>
                <h1 className="text-sm text-text/50">Più Recenti</h1>
            </div>

            <div className="flex justify-between border-b border-border py-2 w-full items-center gap-x-5">
                <div className="flex gap-x-4 text-md overflow-x-scroll px-1 h-full w-full ">
                    <button onClick={() => setPannello("categorie")} className={`${pannello == "categorie" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`}>Categorie</button>
                    <button onClick={() => setPannello("prodotti")} className={`${pannello == "prodotti" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`}>Prodotti</button>
                    <button onClick={() => setPannello("articoli")} className={`${pannello == "articoli" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`}>Articoli</button>
                </div>
                <Link href={`/${pannello}`} className="hover:scale-105 transition-transform duration-150 items-center flex justify-center w-fit">
                    <div className="hidden lg:block text-nowrap">Vedi tutti</div>
                    <Link href={`/${pannello}`}><SquareArrowOutUpRight className="lg:hidden" /></Link>
                </Link>
            </div>
            <div className="lg:grid flex flex-col grid-cols-2 grid-rows-2 w-full h-full max-h-full min-h-0 gap-5 ">
                {panel[pannello]}
            </div>
        </div>


    )
}