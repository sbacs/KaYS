    import { Package, Archive, ScanBarcodeIcon } from "lucide-react";
    import Search from "./Search";
    import { prodottiTotali } from "../services/prodotti";
    import { articoliTotali } from "../services/articoli";
    import Link from "next/link";
    import { lottiTotali } from "../services/lotti";

    export default async function Overview() {

        const totaleArticoli = await articoliTotali();
        const totaleProdotti = await prodottiTotali();
        const totaleLotti = await lottiTotali();

        return (
            <div className="w-full h-90 bg-surface rounded-2xl flex-col flex items-center shrink-0 border-border border-2">

                <div className=" w-full  px-2 lg:px-5 self-center h-[25%] border-b border-border  justify-between text-text items-center flex">
                    <h1 className="text-3xl font-bold">KaYS</h1>
                    <div className="flex gap-x-1 w-fit ">
                        <Search route={`/`} />
                    </div>
                </div>

                <div className="flex h-full w-full px-2 lg:px-5 ">
                    <div className="py-5  h-full w-full gap-y-5 flex flex-col items-center lg:items-start ">
                        <h1 className="text-text font-bold text-xl">
                            Dati di magazzino
                        </h1>
                        <div className="flex flex-col lg:flex-row gap-x-10 gap-y-2 h-full w-full text-nowrap">
                            <Link href={`/articoli`} className="h-full hover:scale-105 border-border shadow-md border transition-all duration-100 w-full gap-y-6 gap-x-2 flex lg:flex-col lg:p-5  flex-row px-5 lg:px-0 bg-surface-raised rounded-2xl items-center justify-center">
                                <ScanBarcodeIcon className="w-12 h-12 text-text" />
                                <div className="flex gap-x-5 lg:flex-col w-full justify-between lg:justify-start  flex-row gap-y-1 items-center">
                                    <h1 className="text-text/75">Totale articoli</h1>
                                    <h1 className="font-bold text-3xl text-text">{totaleArticoli}</h1>
                                </div>
                            </Link>
                            <Link href={`/prodotti`} className="h-full hover:scale-105 border-border shadow-md border transition-all duration-100 w-full gap-y-6 flex lg:flex-col gap-x-2 lg:p-5 px-5 lg:px-0 bg-surface-raised  rounded-2xl items-center justify-center">
                                <Archive className="w-12 h-12 text-text" />
                                <div className="flex gap-x-5 lg:flex-col flex-row w-full justify-between lg:justify-start items-center">
                                    <h1 className="text-text/75">Totale Prodotti</h1>
                                    <h1 className="font-bold text-3xl text-text">{totaleProdotti}</h1>
                                </div>
                            </Link>
                            <Link href={`/lotti`} className="h-full hover:scale-105 border-border shadow-md border transition-all duration-100 w-full gap-y-6 flex gap-x-2  lg:flex-col lg:p-5 px-5 lg:px-0 bg-surface-raised  rounded-2xl items-center justify-center">
                                <Package className="w-12 h-12 text-text" />
                                <div className="flex gap-x-5 lg:flex-col w-full justify-between lg:justify-start flex-row items-center">
                                    <h1 className="text-text/75">Totale Lotti</h1>
                                    <h1 className="font-bold text-3xl text-text">{totaleLotti}</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }