"use client"

import { ArticoloDettagliato, Categoria, Fornitore, Prodotto } from "../lib/types"
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";

interface PannelloArticoloProps {
    articolo: ArticoloDettagliato | undefined;
    close: () => void;
    prodotti: Prodotto[] | undefined;
    fornitori: Fornitore[] | undefined;
}

export default function PannelloArticolo({ articolo, close, prodotti, fornitori }: PannelloArticoloProps) {

    const [selectedProdotto, setSelectedProdotto] = useState<Prodotto | undefined>(articolo?.prodotto);
    const [selectedFornitoreId, setSelectedFornitoreId] = useState<string | undefined>(articolo?.fornitore);

    useEffect(() => {
        if (!articolo) return;
        setSelectedProdotto(articolo.prodotto);
        setSelectedFornitoreId(articolo.fornitore);
    }, [articolo])

    if (!selectedProdotto || !selectedFornitoreId || !fornitori || !prodotti) return <div>asuhdajgshdjhbisadjihbdshuij</div>;

    return (

        <div className="w-150 h-full bg-card-secondary rounded-xl flex flex-col shadow-md p-5">

            <div className="self-end items-center flex">
                <button className="hover:cursor-pointer transition-transform duration-150 hover:scale-105" onClick={close}><CircleX /></button>
            </div>

            {
                (articolo && selectedFornitoreId && selectedProdotto) ? (
                    <div className="flex flex-col gap-y-8 bg-violet-600">
                        <div className="flex flex-col gap-y-1">
                            <h1 className="font-extrabold text-2xl border-b border-card/25">Articolo</h1>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold">{articolo.nome}</h1>
                                <select
                                    value={selectedFornitoreId}
                                    onChange={e => setSelectedFornitoreId(e.target.value)}
                                    className="text-md text-card/75 bg-transparent border-none outline-none hover:text-card cursor-pointer w-fit"
                                >
                                    {fornitori.map(f => (
                                        <option key={f.id} value={f.id}>{f.nome}</option>
                                    ))}
                                </select>
                                <h1 className="text-md text-card/75">{articolo.descrizione}</h1>
                                <h1 className="text-md text-card/75">{articolo.linkScheda}</h1>
                                <h1 className="text-md text-card/75">Quantita' del recipiente {articolo.quantitaRecipiente} {articolo.prodotto.unita.tipo}</h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-1">
                            <h1 className="font-bold text-2xl border-b border-card/25">Prodotto</h1>
                            <div className="flex flex-col">
                                <select
                                    value={selectedProdotto.id}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setSelectedProdotto(prodotti.find(p => p.id === Number(e.target.value))!)
                                    }}
                                    className="text-lg font-bold text-card bg-transparent border-none outline-none hover:text-card/75 cursor-pointer w-fit"
                                >
                                    {prodotti.map(p => (
                                        <option key={p.id} value={p.id}>{p.nome}</option>
                                    ))}
                                </select>
                                <h1 className="text-md text-card/75">{selectedProdotto.nome}</h1>
                                <h1 className="text-md text-card/75">CAS {selectedProdotto.cas}</h1>
                                <h1 className="text-md text-card/75">Quantita' di riordino {selectedProdotto.quantitaRiordino} {selectedProdotto.unita.tipo}</h1>
                                <h1 className="text-md text-card/75">{selectedProdotto.classificazione}</h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-1">
                            <h1 className="font-bold text-2xl border-b border-card/25">Categoria</h1>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-bold">{selectedProdotto.categoria.nome}</h1>
                            </div>

                        </div>

                    </div>

                ) : (
                    <div className=" h-full w-full flex items-center justify-center">Loading</div>
                )
            }

        </div>

    )
}