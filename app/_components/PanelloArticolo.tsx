"use client"

import { ArticoloDettagliato, Fornitore, Prodotto } from "../lib/types"
import { useEffect, useState } from "react";
import { Asterisk } from "lucide-react";

interface PannelloArticoloProps {
    articolo: ArticoloDettagliato;
    onSave: () => Promise<void>;
}

export default function PannelloArticolo({ articolo, onSave }: PannelloArticoloProps) {

    const [localProdotto, setLocalProdotto] = useState<Prodotto | undefined>(articolo.prodotto);
    const [LocalFornitoreId, setLocalFornitoreId] = useState<number | undefined>(articolo.fornitore.id);
    const [localDescrizione, setLocalDescrizione] = useState<string | undefined>(articolo.descrizione);
    const [localQuantita, setLocalQuantita] = useState<number>(articolo.quantitaRecipiente);
    const [localLinkScheda, setlocalLinkScheda] = useState<string>(articolo.linkScheda ?? "");

    const [prodottiDropdown, setProdottiDropdown] = useState<Prodotto[]>();
    const [fornitoriDropdown, setFornitoriDropdown] = useState<Fornitore[]>();

    async function applyChanges() {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articoli/${articolo.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: articolo.nome,
                idProdotto: localProdotto?.id,
                quantitaRecipiente: localQuantita,
                idFornitore: LocalFornitoreId,
                descrizione: localDescrizione,
                posizione: articolo.posizione,
                linkScheda: localLinkScheda
            }),
        });

    }

    function reset() {
        setLocalProdotto(articolo.prodotto)
        setLocalFornitoreId(articolo.fornitore.id)
        setLocalDescrizione(articolo.descrizione)
        setlocalLinkScheda(articolo.linkScheda)
        setLocalQuantita(articolo.quantitaRecipiente)
    }

    useEffect(() => {
        if (!articolo) return;
        setLocalProdotto(articolo.prodotto);
        setLocalFornitoreId(articolo.fornitore.id);
        setLocalDescrizione(articolo.descrizione)
        setlocalLinkScheda(articolo.linkScheda)
        setLocalQuantita(articolo.quantitaRecipiente)
    }, [articolo])

    useEffect(() => {
        async function getDropdowns() {

            const [fornitori, prodotti] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fornitori`).then(r => r.json() as Promise<Fornitore[]>),
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prodotti`).then(r => r.json() as Promise<Prodotto[]>),
            ])

            setProdottiDropdown(prodotti);
            setFornitoriDropdown(fornitori)
        }
        getDropdowns()

    }, [])


    if (!localProdotto || !LocalFornitoreId || !fornitoriDropdown || !prodottiDropdown) return <div className=" flex items-center justify-center w-125 shrink-0 h-full bg-surface rounded-xl  shadow-md lg:p-5 p-2 border border-border">Loading View</div>;

    const isDirty =
        LocalFornitoreId !== articolo.fornitore.id ||
        localProdotto.id !== articolo.prodotto.id ||
        localDescrizione !== articolo.descrizione ||
        localQuantita !== articolo.quantitaRecipiente ||
        localLinkScheda !== (articolo.linkScheda ?? "");


    return (

        <div className=" overflow-y-scroll  w-125 shrink-0 h-full bg-surface rounded-xl flex flex-col border border-border shadow-md p-5 ">


            {
                (articolo && LocalFornitoreId && localProdotto) ? (
                    <div className="flex flex-col gap-y-8 ">
                        <div className="flex flex-col gap-y-6">
                            <h1 className="font-extrabold text-2xl border-b border-border">Articolo</h1>
                            <div className="flex flex-col gap-y-4">
                                <h1 className="text-2xl font-bold">{articolo.nome}</h1>
                                <div className="flex gap-x-5">
                                    <select
                                        value={LocalFornitoreId}
                                        onChange={e => setLocalFornitoreId(Number(e.target.value))}
                                        className="text-xl border-b border-border  text-card/75 bg-transparent hover:text-text cursor-pointer w-fit"
                                    >
                                        {fornitoriDropdown.map(f => (
                                            <option key={f.id} value={f.id}>{f.nome}</option>
                                        ))}
                                    </select>


                                    {articolo.fornitore.id != LocalFornitoreId && < Asterisk color="red" />}
                                </div>

                                <div className="flex gap-x-5 ">
                                    <input type="text" className="text-xl text-text/75 outline-none border-b border-border w-fit" defaultValue={localDescrizione} value={localDescrizione} onChange={(e) => { setLocalDescrizione(e.currentTarget.value) }} />
                                    {articolo.descrizione != localDescrizione && < Asterisk color="red" />}
                                </div>

                                <div className="flex gap-x-5 ">
                                    <input type="text" className="text-xl text-text/75 outline-none border-b border-border " defaultValue={localLinkScheda} value={localLinkScheda} onChange={(e) => { setlocalLinkScheda(e.currentTarget.value) }} />
                                    {articolo.linkScheda != localLinkScheda && < Asterisk color="red" />}
                                </div>

                                <div className="flex text-xl text-text w-full">
                                    <input type="text" className="outline-none border-b border-border " defaultValue={localQuantita} value={localQuantita} onChange={(e) => {
                                        const v = e.currentTarget.value;
                                        if (v === '' || /^\d*\.?\d*$/.test(v)) setLocalQuantita(Number(v));
                                    }} />
                                    {articolo.quantitaRecipiente != localQuantita && < Asterisk color="red" />}
                                    <h1> { "  " + localProdotto.unita.tipo}</h1>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-6">
                            <h1 className="font-bold text-2xl border-b border-border">Prodotto</h1>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex gap-x-5">
                                    <select
                                        value={localProdotto.id}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setLocalProdotto(prodottiDropdown.find(p => p.id === Number(e.target.value))!)
                                        }}
                                        className="text-xl font-bold border-b border-border text-text bg-transparent hover:text-card/75 cursor-pointer w-fit"
                                    >
                                        {prodottiDropdown.map(p => {
                                            return p.unita.id == articolo.prodotto.unita.id && <option key={p.id} value={p.id}>{p.nome}</option>
                                        })}
                                    </select>
                                    {articolo.prodotto.id != localProdotto.id && < Asterisk color="red" />}
                                </div>
                                <h1 className="text-xl text-text/75">CAS {localProdotto.cas}</h1>
                                <h1 className="text-xl text-text/75">Quantita' di riordino {localProdotto.quantitaRiordino} {localProdotto.unita.tipo}</h1>
                                <h1 className="text-xl text-text/75">{localProdotto.classificazione}</h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-y-6">
                            <h1 className="font-bold text-2xl border-b border-border">Categoria</h1>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">{localProdotto.categoria.nome}</h1>
                            </div>

                        </div>

                        <div className="flex gap-x-5">
                            <button disabled={!isDirty} onClick={async () => { await applyChanges(); window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Salvato!" } })); await onSave() }} className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150">Applica</button>
                            <button disabled={!isDirty} onClick={async () => { window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Resettato!" } })); reset() }} className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150">Annulla</button>

                        </div>


                    </div>


                ) : (
                    <div className=" h-full w-100 shrink-0 flex items-center justify-center">Loading</div>
                )
            }

        </div >

    )
}