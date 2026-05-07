"use client"

import { Categoria, Prodotto, Unita } from "../lib/types"
import { useEffect, useState } from "react";
import { Asterisk } from "lucide-react";

interface PannelloProdottoProps {
    prodotto: Prodotto;
    onSave: () => Promise<void>;
}

export default function PannelloProdotto({ prodotto, onSave }: PannelloProdottoProps) {

    const [localCategoria, setLocalCategoria] = useState<Categoria | undefined>(prodotto.categoria);
    const [localUnita, setLocalUnita] = useState<Unita | undefined>(prodotto.unita);

    const [categorie, setCategorie] = useState<Categoria[]>();
    const [unitaDropdown, setUnitaDropdown] = useState<Unita[]>();

    async function applyChanges() {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti/${prodotto.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: prodotto.nome,
                cas: prodotto.cas,
                idUnita: localUnita?.id,
                quantitaRiordino: prodotto.quantitaRiordino,
                descrizione: prodotto.descrizione,
                classificazione: prodotto.classificazione,
                idCategoria: localCategoria?.id
            }),
        });
    }

    function reset() {
        setLocalCategoria(prodotto.categoria);
        setLocalUnita(prodotto.unita);
    }

    useEffect(() => {
        if (!prodotto) return;
        setLocalCategoria(prodotto.categoria);
        setLocalUnita(prodotto.unita);
    }, [prodotto])

    useEffect(() => {
        async function getDropdowns() {
            const [categorie, unita] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categorie`).then(r => r.json() as Promise<Categoria[]>),
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unita`).then(r => r.json() as Promise<Unita[]>),
            ])
            setCategorie(categorie);
            setUnitaDropdown(unita);
        }
        getDropdowns();
    }, [])

    if (!localCategoria || !localUnita || !categorie || !unitaDropdown) return (
        <div className="flex items-center justify-center w-125 shrink-0 h-full bg-surface rounded-xl shadow-md lg:p-5 p-2 border border-border">
            Loading View
        </div>
    );

    const isDirty =
        localCategoria.id !== prodotto.categoria.id ||
        localUnita.id !== prodotto.unita.id;

    return (
        <div className="overflow-y-scroll w-125 shrink-0 h-full bg-surface rounded-xl flex flex-col border border-border shadow-md p-5">
            {(prodotto && localCategoria && localUnita) ? (
                <div className="flex flex-col gap-y-8">

                    <div className="flex flex-col gap-y-6">
                        <h1 className="font-extrabold text-2xl border-b border-border">Prodotto</h1>
                        <div className="flex flex-col gap-y-4">
                            <h1 className="text-2xl font-bold">{prodotto.nome}</h1>
                            <h1 className="text-xl text-text/75">{prodotto.descrizione}</h1>
                            <h1 className="text-xl text-text/75">CAS {prodotto.cas}</h1>
                            <h1 className="text-xl text-text/75">{prodotto.classificazione}</h1>
                            <h1 className="text-xl text-text/75">
                                Quantità di riordino {prodotto.quantitaRiordino} {localUnita.tipo}
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-6">
                        <h1 className="font-bold text-2xl border-b border-border">Unità di misura</h1>
                        <div className="flex gap-x-5">
                            <select
                                value={localUnita.id}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setLocalUnita(unitaDropdown.find(u => u.id === Number(e.target.value))!);
                                }}
                                className="text-xl border-b border-border text-card/75 bg-transparent hover:text-text cursor-pointer w-fit"
                            >
                                {unitaDropdown.map(u => (
                                    <option key={u.id} value={u.id}>{u.tipo}</option>
                                ))}
                            </select>
                            {prodotto.unita.id !== localUnita.id && <Asterisk color="red" />}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-6">
                        <h1 className="font-bold text-2xl border-b border-border">Categoria</h1>
                        <div className="flex gap-x-5">
                            <select
                                value={localCategoria.id}
                                onChange={e => setLocalCategoria(categorie.find(c => c.id === Number(e.target.value)))}
                                className="text-xl border-b border-border text-card/75 bg-transparent hover:text-text cursor-pointer w-fit"
                            >
                                {categorie.map(c => (
                                    <option key={c.id} value={c.id}>{c.nome}</option>
                                ))}
                            </select>
                            {prodotto.categoria.id !== localCategoria.id && <Asterisk color="red" />}
                        </div>
                    </div>

                    <div className="flex gap-x-5">
                        <button
                            disabled={!isDirty}
                            onClick={async () => {
                                await applyChanges();
                                window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Salvato!" } }));
                                await onSave();
                            }}
                            className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150"
                        >
                            Applica
                        </button>
                        <button
                            disabled={!isDirty}
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Resettato!" } }));
                                reset();
                            }}
                            className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150"
                        >
                            Annulla
                        </button>
                    </div>

                </div>
            ) : (
                <div className="h-full w-100 shrink-0 flex items-center justify-center">Loading</div>
            )}
        </div>
    );
}