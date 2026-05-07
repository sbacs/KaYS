"use client"

import FilterBar from "../_components/FilterBar"
import ProdottoRow from "../_components/Rows/Prodotto"
import Search from "../_components/Search"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import PannelloProdotto from "../_components/PanelloProdotto"
import { Prodotto, Categoria, Unita } from "../lib/types"

export default function prodotti() {

    const params = useSearchParams()

    const Categoria = params.get("Categoria") ?? ""
    const Unità = params.get("Unità") ?? ""
    const q = params.get("q") ?? ""
    const p = Number(params.get("p")) ?? null

    const [prodotti, setProdotti] = useState<Prodotto[]>()
    const [filters, setFilters] = useState<Record<string, { values: string[], active: number }>>()
    const [infoProdotto, setInfoProdotto] = useState<Prodotto | undefined>()

    async function getProdotti() {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti`;
        const searchParams = new URLSearchParams({ Categoria, Unità, q })
        const endpoint = `${url}?${searchParams}`

        const res = await fetch(endpoint)
        setProdotti(await res.json())
    }

    async function refresh() {
        await getProdotti();
        if (p) {
            const prodotto: Prodotto = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti/${p}`)).json()
            setInfoProdotto(prodotto)
        }
    }

    useEffect(() => {
        async function getDropdowns() {
            const [unitaList, categoriaList] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unita`).then(r => r.json() as Promise<Unita[]>),
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categorie`).then(r => r.json() as Promise<Categoria[]>),
            ])

            setFilters({
                "Ordine": { values: ["Data", "Alfabetico"], active: 0 },
                "Categoria": { values: ["tutti", ...categoriaList.map(c => c.nome)], active: 0 },
                "Unità": { values: ["tutti", ...unitaList.map(u => u.tipo)], active: 0 }
            })
        }

        getDropdowns();
        getProdotti();
    }, [])

    useEffect(() => {
        if (!p) return;

        setInfoProdotto(undefined)

        async function getInfo() {
            const prodotto: Prodotto = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti/${p}`)).json()
            setInfoProdotto(prodotto)
        }

        getInfo()
    }, [p])

    useEffect(() => {
        getProdotti()
    }, [Categoria, Unità, q])

    if (!filters) return <div className="w-full h-full flex items-center justify-center">loading</div>

    if (!prodotti) return <div>Nessun prodotto trovato</div>

    return (
        <div className="flex w-full h-full min-h-0 pt-5">

            <div className="flex flex-col gap-y-8 px-5 h-full min-h-0 w-full items-center overflow-hidden">

                <h1 className="text-4xl text-text font-bold text-center">Catalogo Prodotti</h1>
                <div className="w-full flex gap-x-4 flex-wrap flex-row gap-y-4">
                    <Search />
                    <FilterBar initialFilters={filters} className="" />
                </div>

                <div className="flex w-full flex-col flex-1 min-h-0">
                    <div className="hidden lg:flex flex-row font-bold text-lg justify-between px-5 border-b border-border h-8 shrink-0">
                        <h1 className="w-full">Nome</h1>
                        <h1 className="w-full">Descrizione</h1>
                        <h1 className="w-50 shrink-0">Opzioni</h1>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full flex-1 min-h-0 overflow-y-scroll py-2">
                        {prodotti.map((p) => (
                            <ProdottoRow highlighted={p.id === Number(params.get("p"))} prodotto={p} key={p.id} />
                        ))}
                    </div>
                </div>

            </div>

            {(p && infoProdotto) && <PannelloProdotto prodotto={infoProdotto} onSave={refresh} />}

        </div>
    )
}