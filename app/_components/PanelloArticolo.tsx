"use client"

import { ArticoloDettagliato, Categoria, Fornitore, Prodotto } from "../lib/types"
import Link from "next/link";
import { useEffect, useState } from "react";

interface PannelloArticoloProps {
    articolo: ArticoloDettagliato | undefined;
}

export default function PannelloArticolo({ articolo }: PannelloArticoloProps) {

    const [selectedProdotto, setSelectedProdotto] = useState<Prodotto | undefined>(articolo?.prodotto);
    const [selectedFornitoreId, setSelectedFornitoreId] = useState<number | undefined>(articolo?.fornitore.id);

    const [prodotti, setProdotti] = useState<Prodotto[]>();
    const [fornitori, setFornitori] = useState<Fornitore[]>();

    async function applyChanges() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articoli/${articolo?.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: articolo?.nome,
                idProdotto: selectedProdotto?.id,
                quantitaRecipiente: articolo?.quantitaRecipiente,
                idFornitore: selectedFornitoreId,
                descrizione: articolo?.descrizione,
                posizione: articolo?.posizione,
                linkScheda: articolo?.linkScheda
            }),
        });

        console.log("done")
        console.log(await res.json());
    }

    useEffect(() => {
        if (!articolo) return;
        setSelectedProdotto(articolo.prodotto);
        setSelectedFornitoreId(articolo.fornitore.id);
    }, [articolo])

    useEffect(() => {
        async function getDropdowns() {

            const [fornitori, prodotti] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fornitori`).then(r => r.json() as Promise<Fornitore[]>),
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti`).then(r => r.json() as Promise<Prodotto[]>),
            ])

            setProdotti(prodotti);
            setFornitori(fornitori)
        }
        getDropdowns()

    }, [])

    if (!selectedProdotto || !selectedFornitoreId || !fornitori || !prodotti) return <div className="max-w-100 flex items-center justify-center min-w-100 h-full bg-card-secondary rounded-xl  shadow-md lg:p-5 p-2 border border-card/15">Loading View</div>;

    return (

        <div className="overflow-y-scroll lg:max-w-100 lg:min-w-100 w-full h-full bg-surface rounded-xl flex flex-col border border-border shadow-md p-5 ">

          
            {
                (articolo && selectedFornitoreId && selectedProdotto) ? (
                    <div className="flex flex-col gap-y-8 ">
                        <div className="flex flex-col gap-y-4">
                            <h1 className="font-extrabold text-2xl border-b border-border">Articolo</h1>
                            <div className="flex flex-col gap-y-1">
                                <h1 className="text-lg font-bold">{articolo.nome}</h1>
                                <select
                                    value={selectedFornitoreId}
                                    onChange={e => setSelectedFornitoreId(Number(e.target.value))}
                                    className="text-md text-card/75 bg-transparent border-none outline-none hover:text-text cursor-pointer w-fit"
                                >
                                    {fornitori.map(f => (
                                        <option key={f.id} value={f.id}>{f.nome}</option>
                                    ))}
                                </select>
                                <h1 className="text-md text-text/75">{articolo.descrizione}</h1>
                                <h1 className="text-md text-text/75">{articolo.linkScheda}</h1>
                                <h1 className="text-md text-text/75">Quantita' del recipiente {articolo.quantitaRecipiente} {selectedProdotto.unita.tipo}</h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-4">
                            <h1 className="font-bold text-2xl border-b border-border">Prodotto</h1>
                            <div className="flex flex-col gap-y-1">
                                <select
                                    value={selectedProdotto.id}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setSelectedProdotto(prodotti.find(p => p.id === Number(e.target.value))!)
                                    }}
                                    className="text-lg font-bold text-text bg-transparent border-none outline-none hover:text-card/75 cursor-pointer w-fit"
                                >
                                    {prodotti.map(p => {
                                        return p.unita.id == articolo.prodotto.unita.id && <option key={p.id} value={p.id}>{p.nome}</option>
                                    })}
                                </select>
                                <h1 className="text-md text-text/75">CAS {selectedProdotto.cas}</h1>
                                <h1 className="text-md text-text/75">Quantita' di riordino {selectedProdotto.quantitaRiordino} {selectedProdotto.unita.tipo}</h1>
                                <h1 className="text-md text-text/75">{selectedProdotto.classificazione}</h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-1">
                            <h1 className="font-bold text-2xl border-b border-border">Categoria</h1>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold">{selectedProdotto.categoria.nome}</h1>
                            </div>

                        </div>


                        <button onClick={async () => { await applyChanges(); window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Salvato!" } })); } } className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 hover:cursor-pointer hover:scale-105 transition-all duration-150">Applica</button>
                     
                    </div>


                ) : (
                    <div className=" h-full w-100 shrink-0 flex items-center justify-center">Loading</div>
                )
            }

        </div >

    )
}