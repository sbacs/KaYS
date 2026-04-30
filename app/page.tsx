import Image from "next/image";
import Overview from "./_components/Overview";
import Link from "next/link";
import Preview from "./_components/Preview";
import { SquareArrowOutUpRight } from "lucide-react";

export default async function Home() {
 
  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-x-10 py-5 px-5">
      <div className="flex flex-col items-left font-sans w-full gap-y-5">

        <Overview />

        <div className="flex w-full h-full">
          <Preview />
        </div>
      </div>

      <div className="w-full h-full ">
        <div className="flex flex-col bg-surface p-5 gap-y-5 rounded-xl border border-border shadow-md">
          <Link href={`/prodotti`} className="border-border border bg-surface-raised rounded-xl p-3 hover:scale-102 transition-all duration-100 flex justify-between">Visualizza prodotti <SquareArrowOutUpRight/> </Link>
          <Link href={`/articoli`} className="border-border border bg-surface-raised rounded-xl p-3 hover:scale-102 transition-all duration-100 flex justify-between">Visualizza articoli <SquareArrowOutUpRight/> </Link>
          <Link href={`/`} className="border-border border bg-surface-raised rounded-xl p-3 hover:scale-102 transition-all duration-100 flex justify-between">visualizza lotti <SquareArrowOutUpRight/> </Link>
        </div>
      </div>
    </div>
  );
}
