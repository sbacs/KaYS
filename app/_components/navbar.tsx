"use client"
import { LayoutDashboard, Package, ScanBarcode, Archive } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./DarkMode";
import { usePathname } from "next/navigation";

export default function NavBar() {


    const pathname = usePathname()


    return (
        <div className="h-15 w-full shrink-0 bg-surface justify-between shadow-md flex flex-row  items-center gap-y-5 px-5 text-foreground border-r-2 border-border ">

            <div className="flex w-fit h-[75%]  items-center relative justify-center group  ">
                <Link href={`/`} className={` ${pathname == '/' ? "border-b-2 " : "text-text"} border-surface-invert   p-1 group-hover:scale-102 w-fit hover:cursor-pointer justify-start h-fit  flex items-center gap-x-2 font-bold `}><LayoutDashboard /> Dashboard</Link>
            </div>

            <div className="flex gap-x-5 w-fit h-full items-center">
                <div className="flex w-fit h-[75%]  items-center relative justify-center group  ">
                    <Link href={`/articoli`} className={` ${pathname == '/articoli' ? "border-b-2 " : "text-text"} p-1 border-surface-invert   group-hover:scale-102 w-fit hover:cursor-pointer justify-start h-fit  flex items-center gap-x-2 font-bold `}><ScanBarcode /> Articoli</Link>
                </div>
                <div className="flex w-fit h-[75%]  items-center relative justify-center group  ">
                    <Link href={`/prodotti`} className={` ${pathname == '/prodotti' ? "border-b-2 " : "text-text"} p-1  border-surface-invert  group-hover:scale-102 w-fit hover:cursor-pointer justify-start h-fit  flex items-center gap-x-2 font-bold `}><Archive /> Prodotti</Link>
                </div>
                <div className="flex w-fit h-[75%]  items-center relative justify-center group  ">
                    <Link href={`/lotti`} className={` ${pathname == '/lotti' ? "border-b-2 " : "text-text"} border-surface-invert p-1 group-hover:scale-102 w-fit hover:cursor-pointer justify-start h-fit  flex items-center gap-x-2 font-bold `}><Package /> Lotti</Link>
                </div>

                <ThemeToggle />

            </div>
        </div>
    )
}