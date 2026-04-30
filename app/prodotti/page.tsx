"use client"

import FilterBar from "../_components/FilterBar"
import ProdottoRow from "../_components/Rows/Prodotto"
import Search from "../_components/Search"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import PannelloProdotto  from "../_components/PanelloProdotto"
import { Prodotto, Fornitore, Categoria, Unita } from "../lib/types"

export default function prodotti() {

    const params = useSearchParams()

    const categoria = params.get("categoria") ?? ""
    const unita = params.get("unita") ?? ""
    const q = params.get("q") ?? ""

    const [edit, setEdit] = useState<Number | null>()

    const [filters, setFilters] = useState<Record<string, { values: string[], active: number }>>()
    const [prodotti, setProdotti] = useState<Prodotto[]>()
    const [fornitori, setFornitori] = useState<Fornitore[]>()
    const [infoProdotto, setInfoProdotto] = useState<Prodotto | undefined>()

    async function getProdotti() {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti`;
        const params = new URLSearchParams({ categoria, unita, q })
        const endpoint = `${url}?${params}`

        const res = await fetch(endpoint)
        const prodotti = await res.json()

        setProdotti(prodotti)
    }

    useEffect(() => {
        async function getDropdowns() {

            const [unita, categoria] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unita`).then(r => r.json() as Promise<Unita[]>),
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categorie`).then(r => r.json() as Promise<Categoria[]>),
            ])

            setProdotti(prodotti);
            setFornitori(fornitori)

            setFilters({
                "Ordine": { values: ["Data", "Alfabetico"], active: 0 },
                "categoria": { values: ["tutti", ...categoria.map(c => c.nome)], active: 0 },
                "unità": { values: ["tutti", ...unita.map(u => u.tipo)], active: 0 }
            })
        }


        getDropdowns();
    }, [])

    useEffect(() => {
        if (!edit) return;

        setInfoProdotto(undefined)

        async function getInfo() {
            const prodotto: Prodotto = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti/${edit}`)).json()
            console.log(prodotto)
            setInfoProdotto(prodotto)
        }

        getInfo()
    }, [edit])

    useEffect(() => {
        getProdotti()
    }, [categoria, unita, q])



    if (!filters) return <div className="w-full h-full flex items-center justify-center">loading</div>

    if (!prodotti) return <div>Nessun prodotto trovato</div>


    return (
        <div className="flex pb-5 w-full h-full">

            <div className="flex flex-col gap-y-8  px-5 h-full pb-5  w-full items-center overflow-hidden">
                <h1 className="text-4xl text-card font-bold text-center">Catalogo Prodotti</h1>
                <div className="w-full flex gap-x-4 flex-col lg:flex-row gap-y-4">
                    <Search route={`/prodotti`} />

                    <FilterBar initialFilters={filters} className="" />
                </div>
                <div className="flex w-full h-full gap-x-5 min-h-0 flex-1">
                    <div className="flex w-full flex-col" >
                        <div className="hidden lg:flex flex-row font-bold text-lg justify-between px-5 border-b border-border h-8 shrink-0 ">
                            <h1 className="w-full">Nome</h1>
                            <h1 className="w-full ">Descrizione</h1>
                            <h1 className="w-50 shrink-0 ">Opzioni</h1>
                        </div>
                        <div className="flex flex-col gap-y-2 w-full  overflow-y-scroll py-2">
                            {
                                prodotti.map((p) => {
                                    return <ProdottoRow prodotto={p} setEdit={(id) => setEdit(id)} />
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>

            {
                edit && <PannelloProdotto prodotto={infoProdotto} />
            }


        </div>
    )
}