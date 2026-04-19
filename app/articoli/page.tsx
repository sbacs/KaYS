"use client"

import { Articolo, ArticoloDettagliato, Categoria, Fornitore, Prodotto } from "../lib/types"
import Link from "next/link"
import FilterBar from "../_components/FilterBar"
import Search from "../_components/Search"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ArticoloRow from "../_components/Rows/articolo"
import PannelloArticolo from "../_components/PanelloArticolo"

export default function articolo() {

    const params = useSearchParams()

    const Fornitore = params.get("Fornitore") ?? ""
    const Prodotto = params.get("Prodotto") ?? ""
    const q = params.get("q") ?? ""

    const [articoli, setArticoli] = useState<Articolo[]>()
    const [edit, setEdit] = useState<Number | null>()

    const [filters, setFilters] = useState<Record<string, { values: string[], active: number }>>()
    const [prodotti, setProdotti] = useState<Prodotto[]>()
    const [fornitori, setFornitori] = useState<Fornitore[]>()

    const [infoArticolo, setInfoArticolo] = useState<ArticoloDettagliato | undefined>(undefined)

    async function getArticoli() {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/articoli`;
        const params = new URLSearchParams({ Fornitore, Prodotto, q })
        const endpoint = `${url}?${params}`

        const res = await fetch(endpoint)
        const articoli = await res.json()

        setArticoli(articoli)
    }

    useEffect(() => {
        async function getDropdowns() {

            const [fornitori, prodotti] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fornitori`).then(r => r.json() as Promise<Fornitore[]>),
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti`).then(r => r.json() as Promise<Prodotto[]>),
            ])

            setProdotti(prodotti);
            setFornitori(fornitori)

            setFilters({
                "Ordine": { values: ["Data", "Alfabetico"], active: 0 },
                "Fornitore": { values: ["tutti", ...fornitori.map(f => f.nome)], active: 0 },
                "Prodotto": { values: ["tutti", ...prodotti.map(p => p.nome)], active: 0 }
            })
        }


        getDropdowns();
        getArticoli();
    }, [])

    useEffect(() => {
        if (!edit) return;

        setInfoArticolo(undefined)

        async function getInfo() {
            const articolo: ArticoloDettagliato = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articoli/${edit}`)).json()
            console.log(articolo)
            setInfoArticolo(articolo)
        }

        getInfo()
    }, [edit])

    useEffect(() => {
        getArticoli()
        console.log("asjdajshdu")
    }, [Prodotto, Fornitore, q])

    if (!filters) return <div>loading</div>

    if (!articoli) return <div>Nessun articolo trovato</div>

    return (
        <div className="flex flex-col gap-y-8 pt-20   px-5 h-full pb-5  w-full items-center overflow-hidden">
            <h1 className="text-4xl text-card font-bold">Catalogo Articoli</h1>
            <div className="w-full flex gap-x-4 ">
                <Search />

                <FilterBar initialFilters={filters} className="" />
            </div>
            <div className="flex w-full h-full gap-x-5 min-h-0 flex-1">
                <div className="flex w-full flex-col" >
                    <div className="flex flex-row font-bold text-lg justify-between px-5 border-b border-card/15 h-8 shrink-0 ">
                        <h1 className="w-full">Nome</h1>
                        <h1 className="w-full">Fornitore</h1>
                        <h1 className="w-full ">Descrizione</h1>
                        <h1 className="w-50 shrink-0 ">Opzioni</h1>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full  overflow-y-scroll py-2">
                        {
                            articoli.map((a) => {
                                return <ArticoloRow articolo={a} setEdit={(id) => setEdit(id)} />
                            })
                        }

                    </div>
                </div>
                {
                    edit && <PannelloArticolo articolo={infoArticolo} close={() => setEdit(null)} prodotti={prodotti} fornitori={fornitori}/>
                }
            </div>

        </div>
    )
}