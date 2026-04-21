"use client"

import { ArticoloDettagliato, Categoria, Fornitore, Prodotto, Unita } from "../lib/types"
import Link from "next/link";
import { useEffect, useState } from "react";

interface pannelloProdottoProps {
    prodotto: Prodotto | undefined;
}

export default function PannelloProdotto({ prodotto }: pannelloProdottoProps) {

    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | undefined>(prodotto?.categoria);
    const [selectedUnita, setSelectedUnita] = useState<Unita | undefined>(prodotto?.unita);

    console.log("unitatatatata")
    console.log(selectedUnita)

    const [editedProdotto, setEditedProdotto] = useState<Prodotto | undefined>(prodotto);


    const [categorie, setCategorie] = useState<Categoria[]>();
    const [unita, setUnita] = useState<Unita[]>();

    async function applyChanges() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti/${prodotto?.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: prodotto?.nome,
                cas: prodotto?.cas,
                idUnita: selectedUnita?.id,
                quantitaRiordino: prodotto?.quantitaRiordino,
                descrizione: prodotto?.descrizione,
                classificazione: prodotto?.classificazione,
                idCategoria: selectedCategoria?.id
            }),
        });

        console.log("done")
        console.log(await res.json());
    }

    useEffect(() => {
        if (!prodotto) return;
        setEditedProdotto(prodotto);
        setSelectedCategoria(prodotto.categoria)
        setSelectedUnita(prodotto.unita)
    }, [prodotto])

    useEffect(() => {
        async function getDropdowns() {

            const [categorie, prodotti] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categorie`).then(r => r.json() as Promise<Categoria[]>),
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unita`).then(u => u.json() as Promise<Unita[]>),
            ])

            setUnita(prodotti);
            setCategorie(categorie)
        }

        getDropdowns()

    }, [])

    console.log(selectedCategoria)
    console.log(unita)
    console.log(categorie)
    console.log("unita")
    console.log(selectedUnita)

    if (!selectedCategoria || !unita || !categorie || !selectedUnita) return <div className="max-w-100 flex items-center justify-center min-w-100 h-full bg-card-secondary rounded-xl  shadow-md lg:p-5 p-2 border border-card/15">Loading View</div>;

    return (

        <div className="overflow-y-scroll lg:max-w-100 lg:min-w-100 w-full h-full bg-card-secondary rounded-xl flex flex-col border border-card/15 shadow-md p-5 ">


            {
                (prodotto && selectedCategoria && selectedUnita) ? (
                    <div className="flex flex-col gap-y-8 ">
                        <div className="flex flex-col gap-y-4">
                            <h1 className="font-extrabold text-2xl border-b border-card/25">Prodotto</h1>
                            <div className="flex flex-col gap-y-1">
                                <h1 className="text-lg font-bold">{prodotto.nome}</h1>
                                <h1 className="text-md text-card/75">{prodotto.descrizione}</h1>
                                <h1 className="text-md text-card/75">Quantita' di riordino {prodotto.quantitaRiordino} {selectedUnita.tipo}</h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-4">
                            <h1 className="font-bold text-2xl border-b border-card/25">Prodotto</h1>
                            <div className="flex flex-col gap-y-1">
                                <div className="flex gap-x-4">
                                    <h1 className="text-card/75">Unita di misura</h1>
<select
                                    value={selectedUnita.id}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setSelectedUnita(unita.find(u => u.id === Number(e.target.value))!)
                                    }}
                                    className="text-lg font-bold text-card bg-transparent border-none outline-none hover:text-card/75 cursor-pointer w-fit"
                                >
                                    {unita.map(p => {
                                        return p.id && <option key={p.id} value={p.id}>{p.tipo}</option>
                                    })}
                                </select>
                                </div>
                                
                                <h1 className="text-md text-card/75">CAS {prodotto.cas}</h1>
                                <h1 className="text-md text-card/75">Quantita' di riordino {prodotto.quantitaRiordino} {selectedUnita.tipo}</h1>
                                <h1 className="text-md text-card/75">{prodotto.classificazione}</h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-4">
                            <h1 className="font-bold text-2xl border-b border-card/25">Categoria</h1>
                            <select
                                value={selectedCategoria.id}
                                onChange={e => setSelectedCategoria(categorie.find(c => c.id === Number(e.target.value)))}
                                className="text-md text-card/75 bg-transparent border-none outline-none hover:text-card cursor-pointer w-fit"
                            >
                                {categorie.map(f => (
                                    <option key={f.id} value={f.id}>{f.nome}</option>
                                ))}
                            </select>

                        </div>


                        <button onClick={async () => { await applyChanges(); window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Salvato!" } })); }} className="bg-card shadow-md text-card-secondary w-fit rounded-xl self-center p-2 hover:cursor-pointer hover:scale-105 transition-all duration-150">Applica</button>

                    </div>


                ) : (
                    <div className=" h-full w-100 shrink-0 flex items-center justify-center">Loading</div>
                )
            }

        </div >

    )
}