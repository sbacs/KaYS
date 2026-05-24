"use client"

import { useState, useEffect } from "react"
import { Fornitore, Prodotto } from "../lib/types"
import { Asterisk } from "lucide-react"

export default function AggiungiPannello() {
    const [pannello, setPannello] = useState<"articolo" | "prodotto" | "categoria" | "lotto" | "fornitore">("articolo")

    return (
        <div className="bg-surface p-5 w-full h-full rounded-xl shadow-md gap-y-5 flex flex-col border border-border">
            <div className="flex gap-x-4 text-md px-1 w-full h-fit">
                <button onClick={() => setPannello("categoria")} className={`${pannello == "categoria" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`} >Categoria</button>
                <button onClick={() => setPannello("prodotto")} className={`${pannello == "prodotto" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`} >Prodotto</button>
                <button onClick={() => setPannello("articolo")} className={`${pannello == "articolo" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`} >Articolo</button>
                <button onClick={() => setPannello("lotto")} className={`${pannello == "lotto" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`} >Lotto</button>
                <button onClick={() => setPannello("fornitore")} className={`${pannello == "fornitore" ? "text-text font-bold" : "text-text/75 hover:cursor-pointer hover:scale-105 transition-all duration-100"}`} >Fornitore</button>

            </div>



            <h1 className="text-2xl font-bold">Aggiungi {pannello}</h1>

            {pannello === "articolo" && <PannelloArticolo />}
        </div>
    )
};


function PannelloArticolo() {

    const [prodottiDropdown, setProdottiDropdown] = useState<Prodotto[]>()
    const [fornitoriDropdown, setFornitoriDropdown] = useState<Fornitore[]>()

    const [descrizione, setDescrizioe] = useState<string>("")
    const [linkScheda, setLinkScheda] = useState<string>("")
    const [nome, setNome] = useState<string>("")
    const [quantitaRecipiente, setQuantitaRecipiente] = useState<number>(0)

    const [prodotto, setProdotto] = useState<Prodotto>()
    const [fornitore, setFornitore] = useState<Fornitore>()

    const [pannello, setPannello] = useState<"articolo" | "prodotto" | "categoria" | "lotto">("articolo");


    useEffect(() => {
        async function getDropdowns() {
            const [resProdotti, resFornitori] = await Promise.all([
                fetch(`/api/prodotti`, { method: 'GET' }),
                fetch(`/api/fornitori`, { method: 'GET' })
            ])

            setProdottiDropdown(await resProdotti.json())

            setFornitoriDropdown(await resFornitori.json())
        }

        getDropdowns()

    }, [])

    useEffect(() => {
        if (!prodottiDropdown) return;

        setProdotto(prodottiDropdown[0])
    }, [prodottiDropdown])

    useEffect(() => {
        if (!fornitoriDropdown) return;

        setFornitore(fornitoriDropdown[0])
    }, [fornitoriDropdown])

    async function Salva() {

        if (!prodotto || !nome || !fornitore || !quantitaRecipiente) return;

        await fetch(`/api/articoli`, {
            method: `POST`,
            body: JSON.stringify({
                nome: nome,
                idProdotto: prodotto.id,
                descrizione: descrizione ?? "",
                quantitaRecipiente: quantitaRecipiente,
                idFornitore: fornitore.id,
                linkScheda: linkScheda
            })
        })

        reset();

    }

    function reset() {
        setNome("")
        setDescrizioe("")
        setQuantitaRecipiente(0)
        setLinkScheda("")
    }


    if (!prodottiDropdown || !fornitoriDropdown || !prodotto || !fornitore) return <div className="w-full h-full text-text text-3xl flex items-center justify-center">...</div>

    const isCompleted = Boolean(nome && prodotto && quantitaRecipiente && fornitore);
    const isEditing = Boolean(nome || quantitaRecipiente || linkScheda || descrizione);

    return (

        <div className="w-full h-full gap-y-5 flex flex-col">


            <div className=" grid grid-cols-2 h-full  w-full gap-x-25">
                <div className="flex gap-x-5">
                    <input type="text" value={nome} className="h-fit border-b border-border outline-none" placeholder="Nome" onChange={(e) => {
                        setNome(e.currentTarget.value)
                    }} />
                    {(isEditing && !nome) && <Asterisk color="red" />}
                </div>
                <div className="flex gap-x-5">

                    <input type="text" value={linkScheda} className="h-fit border-b border-border outline-none" placeholder="Link Scheda" onChange={(e) => {
                        setLinkScheda(e.currentTarget.value)
                    }} />
                    {(isEditing && !linkScheda) && <Asterisk color="red" />}
                </div>
                <input type="text" value={descrizione} className="h-fit border-b border-border outline-none" placeholder="Descrizione" onChange={(e) => {
                    setDescrizioe(e.currentTarget.value)
                }} />
                

                <select
                    value={prodotto.id}
                    onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setProdotto(prodottiDropdown.find(p => p.id === Number(e.target.value))!)
                    }}
                    className="text-xl font-bold h-fit  text-text bg-transparent hover:text-card/75 cursor-pointer w-fit"
                >
                    {prodottiDropdown.map(p => {
                        return <option key={p.id} value={p.id}>{p.nome}</option>
                    })}
                </select>

                <div className="flex gap-x-5">
                    <input type="text" value={quantitaRecipiente} className="h-fit border-b border-border outline-none" placeholder="Quantità Recipiente" onChange={(e) => {
                        const v = e.currentTarget.value;
                        if (v === '' || /^\d*\.?\d*$/.test(v)) setQuantitaRecipiente(Number(v));
                    }} />
                    <h1 className="text-text">{prodotto.unita.tipo}</h1>
                    {(isEditing && !quantitaRecipiente) && <Asterisk color="red" />}
                </div>


                <select
                    value={fornitore.id}
                    onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setFornitore(fornitoriDropdown.find(f => f.id === Number(e.target.value))!)
                    }}
                    className="text-xl font-bold h-fit  text-text bg-transparent hover:text-card/75 cursor-pointer w-fit"
                >
                    {fornitoriDropdown.map(p => {
                        return <option key={p.id} value={p.id}>{p.nome}</option>
                    })}
                </select>

            </div>
            <div className={`flex gap-x-5`}>
                <button onClick={async () => { await Salva(); window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Aggiunto!" } })); }} disabled={!isCompleted} className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150">Salva</button>
                <button disabled={!isEditing} onClick={reset} className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150">Annulla</button>
            </div>
        </div>

    )
}