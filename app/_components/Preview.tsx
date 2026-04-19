"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Ellipsis } from "lucide-react"
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
        console.log(prodotti)
    }, [])

    const panel: Record<string, React.ReactNode> = {
        articoli: articoli?.slice(0, 4).map((a) => {
            return <div className="flex flex-col border-card/15 rounded-xl shadow-md border w-75 gap-y-2 h-40 p-5">
                <div className="flex justify-between items-start">
                    <h1 className="font-bold text-card text-xl">{a.nome}</h1>
                    <button className="hover:cursor-pointer transition-all duration-150 hover:scale-110"><Ellipsis /></button>
                </div>

                <h1 className="text-sm text-card/75">{a.descrizione}</h1>
                <h1 className="text-card">{a.fornitore}</h1>
            </div>
        }),
        prodotti: prodotti?.slice(0, 4).map((p) => {
            return <div className="flex flex-col border-card/15 rounded-xl shadow-md border w-75 gap-y-2 h-40 p-5">
                <div className="flex justify-between items-start">
                    <h1 className="font-bold text-card text-xl">{p.nome}</h1>
                    <button className="hover:cursor-pointer transition-all duration-150 hover:scale-110"><Ellipsis /></button>
                </div>

                <h1 className="text-sm text-card/75">{p.descrizione}</h1>
                <h1 className="text-card">CAS {p.cas}</h1>
                <h1 className="text-card">Riordino di {p.quantitaRiordino} {p.Unita.tipo}</h1>
            </div>
        }),
        categorie: categorie?.slice(0, 4).map((c) => {
            return <div className="flex flex-col border-card/15 rounded-xl shadow-md border w-75 gap-y-2 h-40 p-5">
                <div className="flex justify-between items-start">
                    <h1 className="font-bold text-card text-xl">{c.nome}</h1>
                    <button className="hover:cursor-pointer transition-all duration-150 hover:scale-110"><Ellipsis /></button>
                </div>
            </div>
        })
    }

    return (


        <div className="bg-card-secondary   p-5 shadow-lg rounded-2xl border-card/15 border flex-col flex gap-y-4">
            <div className="flex gap-x-4 items-center ">
                <h1 className="text-card font-bold text-2xl ">Preview</h1>
                <h1 className="text-sm text-card/75">Più Recenti</h1>
            </div>

            <div className="flex justify-between border-b border-card/15 py-2">
                <div className="flex gap-x-4 text-md  ">
                    <button onClick={() => setPannello("categorie")} className={`${pannello == "categorie" ? "text-card font-bold" : "text-card/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`}>Categorie</button>
                    <button onClick={() => setPannello("prodotti")} className={`${pannello == "prodotti" ? "text-card font-bold" : "text-card/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`}>Prodotti</button>
                    <button onClick={() => setPannello("articoli")} className={`${pannello == "articoli" ? "text-card font-bold" : "text-card/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`}>Articoli</button>
                </div>
                <Link href={`/${pannello}`} className="hover:scale-105 transition-transform duration-150">Vedi tutti</Link>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-5 ">
                {panel[pannello]}
            </div>
        </div>


    )
}