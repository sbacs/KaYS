"use client"

import { Lotto } from "@/app/lib/types"
import FilterBar from "../_components/FilterBar"
import Search from "../_components/Search"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import LottoRow from "../_components/Rows/Lotto"

export default function lotti() {

    const params = useSearchParams()

    //filters
    const DataLotto = params.get("DataLotto") ?? ""
    const DataScadenza = params.get("DataScadenza") ?? ""
    const NomeArticolo = params.get("q") ?? ""
    const p = Number(params.get("p")) ?? null



    const [lotti, setLotti] = useState<Lotto[]>([])

    const [filters, setFilters] = useState<Record<string, { values: string[], active: number }>>()


    async function getLotti() {
        const url = `/api/lotti`;
        const params = new URLSearchParams({ DataLotto, DataScadenza, NomeArticolo })
        const endpoint = `${url}?${params}`

        const res = await fetch(endpoint)
        const lotti: Lotto[] = await res.json()

        console.log(lotti.map(l => l.dataLotto ? String(l.dataLotto).split('T')[0] : null))

        console.log(lotti.map(l => l.dataScadenza ? String(l.dataScadenza).split('T')[0] : null))

        setFilters({
            "Ordine": { values: ["Data di Ordine", "Data di Scadenza"], active: 0 },
            "DataLotto": {
                values: ["tutti", ...[...new Set(
                    lotti
                        .map(l => String(l.dataLotto).split('T')[0] )
                )]],
                active: 0
            },
            "DataScadenza": {
                values: ["tutti", ...[...new Set(
                    lotti
                        .map(l => String(l.dataScadenza).split('T')[0])
                )]],
                active: 0
            }
        })

        setLotti(lotti)
    }

    async function refresh() {
        await getLotti();
    }

    useEffect(() => {
        getLotti();
    }, [])


    useEffect(() => {
        if (!p) return;

    }, [p])

    useEffect(() => {
        getLotti()
    }, [DataLotto, DataScadenza, NomeArticolo])

    if (!filters) return <div className="w-full h-full flex items-center justify-center">loading</div>

    if (!lotti) return <div>Nessun lotto trovato</div>

    return (
        <div className="flex w-full h-full min-h-0 pt-5">

            <div className="flex flex-col gap-y-8 px-5 h-full min-h-0 w-full items-center overflow-hidden ">

                <h1 className="text-4xl text-text font-bold text-center">Catalogo Lotti</h1>
                <div className="w-full flex gap-x-4 flex-wrap flex-row gap-y-4 ">
                    <Search />
                    <FilterBar initialFilters={filters} className="" />
                </div>

                <div className="flex w-full flex-col flex-1 min-h-0">
                    <div className="hidden lg:flex flex-row font-bold text-lg justify-between px-5 border-b border-border h-8 shrink-0">
                        <h1 className="w-full">Articolo</h1>
                        <h1 className="w-full">Quantità ordinata</h1>
                        <h1 className="w-full">Data di Ordine</h1>
                        <h1 className="w-full">Data di Scadenza</h1>
                        <h1 className="w-50 shrink-0">Opzioni</h1>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full flex-1 min-h-0  overflow-y-scroll py-2">
                        {lotti.map((l) => (
                            <LottoRow key={l.id} lotto={l} highlighted={p === l.id} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}