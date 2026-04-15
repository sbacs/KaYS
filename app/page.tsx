import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-y-2">
        <Link href={"/"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Aggiungi nuovo prodotto</Link>
        <Link href={"/"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Aggiungi nuovo articolo</Link>
        <Link href={"/"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Visualizza articoli</Link>
        <Link href={"/articoli"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Visualizza articoli</Link>
    </div>
  );
}
