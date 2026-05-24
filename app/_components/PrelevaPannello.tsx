"use client"
import { useState, useEffect } from "react"
import { Articolo, Fornitore, Prodotto } from "../lib/types"


export default function PrelevaPannello() {

    const [SuggerimentiArticolo, setSuggerimentiArticolo] = useState<Articolo[] | null>(null);
    const [selectedArticolo, setSelectedArticolo] = useState<Articolo | null>(null)

    const [fornitori, setForntori] = useState<Fornitore[]>()
    const [selectedFornitore, setSelectedFornitore] = useState<Fornitore>()
    const [selectedProdotto, setSelectedProdotto] = useState<Prodotto>()

    const [isEditing, setIsEditing] = useState(false)

    const [input, setInput] = useState("")

    const [capienze, setCapienze] = useState<Articolo[]>()
    const [selectedCapienza, setSelectedCapienza] = useState<Articolo>()

    const [quantitaPrelievo, setQuantitaPrelievo] = useState<number>(0)

    const [quantitaMassimaPrelievo, setQuantitaMassimaPrelievo] = useState<number>(0)


    async function getQuantitaMassimaPrelievo(idArticolo: number) {
        const resLotti = await fetch(`/api/lotti/${idArticolo}`)
        const lotti = await resLotti.json()

        const quantita = lotti.reduce((acc: number, l: any) => acc + l.quantita, 0)

        setQuantitaMassimaPrelievo(quantita)
    }

    async function suggerimenti(query: string) {
        const resArticoli = await fetch(`/api/articoli?q=${query}`)
        const articoli = await resArticoli.json();

        setSuggerimentiArticolo(articoli)
    }

    async function getProdotto(idProdotto: number) {
        const resProdotto = await fetch(`/api/prodotti/${idProdotto}`)
        const prodotto = await resProdotto.json();

        setSelectedProdotto(prodotto)
    }

    async function getFornitori(articolo: Articolo) {
        const resFornitori = await fetch(`/api/fornitori?nomeArticolo=${articolo.nome}`)
        const fornitori = await resFornitori.json()

        setForntori(fornitori)
        setSelectedFornitore(fornitori[0])
        getCapienze(articolo.nome, fornitori[0].nome)
        getProdotto(articolo.idProdotto)
    }

    async function getCapienze(nomeArticolo: string, nomeFornitore: string) {
        const resArticoli = await fetch(`/api/articoli?nomeArticolo=${nomeArticolo}&Fornitore=${nomeFornitore}`)
        const articoli = await resArticoli.json()

        setCapienze(articoli)
        setSelectedCapienza(articoli[0])
        getQuantitaMassimaPrelievo(articoli[0].id)
    }

    useEffect(() => {
            if (selectedCapienza && selectedFornitore && selectedArticolo) {  
                setIsEditing(true)
            }
            else {
                setIsEditing(false)
            }
    }, [selectedCapienza, selectedFornitore, selectedArticolo])

    function reset(){
        setSelectedArticolo(null)
        setSelectedFornitore(undefined)
        setSelectedCapienza(undefined)
        setCapienze(undefined)
        setForntori(undefined)
        setInput("")
        setSuggerimentiArticolo(null)
        setQuantitaPrelievo(0)
    }

    return (
        <div className="h-full rounded-xl border border-border shadow-md p-5 w-full bg-surface flex gap-y-5 flex-col">
            <h1 className="text-text text-2xl font-bold ">Preleva Articolo</h1>
            <div className="relative w-fit h-fit ">
                <input type="text" placeholder="Nome Articolo" value={input} className="font-bold border-b border-border w-fit  outline-none"
                    onChange={async (e) => {
                        const v = e.currentTarget.value;

                        setInput(v)
                        setSelectedArticolo(null)

                        if (v.trim()) {
                            await suggerimenti(v)
                        }
                        else {
                            setSuggerimentiArticolo(null)
                        }


                    }}

                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setSuggerimentiArticolo(null)
                        }
                        else if (e.key == "Enter" && SuggerimentiArticolo?.[0]) {
                            const a = SuggerimentiArticolo[0]
                            setSelectedArticolo(a)
                            setInput(a.nome)
                        }
                    }}
                />

                {
                    SuggerimentiArticolo && !selectedArticolo && <div className="h-fit w-full bg-surface-raised border-border border shadow-md z-100 rounded-xl overflow-hidden absolute translate-y-full  flex flex-col gap-y-2 items-center -bottom-2 ">
                        {
                            SuggerimentiArticolo?.slice(0, 4).map((a) => {
                                return <button onClick={() => {
                                    setSelectedArticolo(a)
                                    setInput(a.nome)
                                    setSelectedFornitore(undefined)
                                    setSelectedCapienza(a)
                                    setCapienze(undefined)
                                    getFornitori(a)
                                }}
                                    className="h-fit w-full hover:bg-surface hover:cursor-pointer p-1" >
                                    <h1 className="font-bold text-lg">{a.nome}</h1>
                                </button>
                            })
                        }

                    </div>
                }
            </div>


            {
                fornitori && selectedArticolo && <select
                    value={selectedFornitore?.id}
                    onChange={(e) => {
                        const f = fornitori.find(f => f.id === Number(e.target.value))!
                        setSelectedFornitore(f)
                        setSelectedCapienza(undefined)
                        getCapienze(selectedArticolo!.nome, f.nome)
                    }}
                    className="text-lg font-bold h-fit  text-text bg-transparent hover:text-card/75 cursor-pointer w-fit"
                >
                    {fornitori.map(f => {
                        return <option key={f.id} value={f.id}>{f.nome}</option>
                    })}
                </select>
            }


            {
                capienze && fornitori && selectedArticolo && <div className="flex gap-x-5 items-center">
                    Quantità Recipiente
                    <select
                        value={selectedCapienza?.id || ""}
                        onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setSelectedCapienza(capienze.find(c => c.id === Number(e.target.value))!)
                            getQuantitaMassimaPrelievo(capienze.find(c => c.id === Number(e.target.value))!.id)
                        }}
                        className="text-lg  font-bold h-fit  text-text bg-transparent hover:text-card/75 cursor-pointer w-fit"
                    >
                        {capienze.map(f => {
                            return <option key={f.id} value={String(f.id)}>{f.quantitaRecipiente}</option>
                        })}
                    </select>


                    <h1 className="text-text">{selectedProdotto?.unita?.tipo}</h1>

                </div>
            }


            {
                fornitori && capienze && selectedArticolo && <div className="flex gap-x-5">
                    Quantità da prelevare
                    <input type="text" value={quantitaPrelievo} className="h-fit font-bold border-b border-border outline-none" placeholder="Quantità Recipiente" onChange={(e) => {
                        const v = e.currentTarget.value;

                        if (v === '' || /^\d*\.?\d*$/.test(v) && Number(v) <= quantitaMassimaPrelievo) setQuantitaPrelievo(Number(v));
                        else setQuantitaPrelievo(0)
                    }} />

                    <h1 className="text-text">{selectedProdotto?.unita?.tipo}</h1>
                    <h1 className="text-text">( max {quantitaMassimaPrelievo} {selectedProdotto?.unita?.tipo} )</h1>

                </div>
            }

            <div className={`flex gap-x-5`}>
                <button onClick={async () => { window.dispatchEvent(new CustomEvent("open-modal", { detail: { message: "Aggiunto!" } })); }} disabled={!isEditing && !quantitaPrelievo } className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150">Salva</button>
                <button disabled={!isEditing} onClick={reset} className="bg-surface-raised shadow-md text-text border border-border w-fit rounded-xl self-center py-2 px-5 disabled:opacity-50 hover:cursor-pointer hover:scale-105 transition-all duration-150">Annulla</button>
            </div>

        </div >
    )
}