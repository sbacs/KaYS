"use client"
import { LayoutDashboard, Package, ScanBarcode } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function NavBar() {


    const pathname = usePathname()


    return (
        <div className="h-full w-75 bg-card flex flex-col  items-center gap-y-5 text-foreground border-r-2 border-r-black rounded-r-2xl ">
            <h1 className="text-4xl font-extrabold text-card-secondary py-10">KaYS</h1>
            <div className="flex w-full h-12 items-center relative justify-center group">
                {pathname == '/' && <div className="bg-card-secondary w-1 transition-all duration-150 group-hover:w-3 h-full absolute left-0 rounded-r-2xl" />}
                <Link href={`/`} className={` ${ pathname == '/' ? "bg-card-secondary " : "text-card-secondary"} pl-10 transition-all duration-150 group-hover:translate-x-1   p-5 w-[75%] hover:cursor-pointer justify-start h-full  flex items-center rounded-xl gap-x-2 font-bold `}><LayoutDashboard /> Dashboard</Link>
            </div>

            <div className="flex w-full h-12 items-center relative justify-center group">
                {pathname == '/prodotti' && <div className="bg-card-secondary w-1 transition-all duration-150 group-hover:w-3 h-full absolute left-0 rounded-r-2xl" />}
                <Link href={`/prodotti`} className={` ${ pathname == '/prodotti' ? "bg-card-secondary " : "text-card-secondary"} pl-10 transition-all duration-150 group-hover:translate-x-1   p-5 w-[75%] hover:cursor-pointer justify-start h-full  flex items-center rounded-xl gap-x-2 font-bold `}><ScanBarcode /> Prodotti</Link>
            </div>

            <div className="flex w-full h-12 items-center relative justify-center group">
                {pathname == '/lotti' && <div className="bg-card-secondary w-1 transition-all duration-150 group-hover:w-3 h-full absolute left-0 rounded-r-2xl" />}
                <Link href={`/lotti`} className={` ${pathname == '/lotti' ? "bg-card-secondary " : "text-card-secondary"} pl-10 transition-all duration-150 group-hover:translate-x-1   p-5 w-[75%] hover:cursor-pointer justify-start h-full  flex items-center rounded-xl gap-x-2 font-bold `}><Package /> Lotti</Link>
            </div>
        </div>
    )
}