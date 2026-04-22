import Image from "next/image";
import Link from "next/link";
import { Search, ScanBarcodeIcon, Package, Archive } from "lucide-react";
import { SparkAreaChart } from "./_components/SparkChart";
import Preview from "./_components/Preview";
import { articoliTotali } from "./services/articoli";
import { prodottiTotali } from "./services/prodotti";
import { lottiTotali } from "./services/lotti";

const chartdata = [
  { month: "Jan 21", Performance: 4000 },
  { month: "Feb 21", Performance: 3000 },
  { month: "Mar 21", Performance: 2000 },
  { month: "Apr 21", Performance: 2780 },
  { month: "May 21", Performance: 1890 },
  { month: "Jun 21", Performance: 2390 },
  { month: "Jul 21", Performance: 3490 },
];

export default async function Home() {
  const articoliTot = await articoliTotali();
  const prodottiTot = await prodottiTotali();
  const lottiTot = await lottiTotali();

  return (
    <div className="flex h-full w-full gap-x-20">
      <div className="flex flex-col items-left pt-5 font-sans w-full gap-y-5">
        <div className="w-full h-90 bg-card rounded-2xl flex-col flex items-center shrink-0 border-black border-2">
          <div className=" w-[95%] self-center h-[25%] border-b border-card-secondary/10 shrink-0 justify-between text-card-secondary items-center flex">
            <h1 className="text-3xl font-bold">KaYS</h1>
            <div className="flex gap-x-1"> 
              <Search />
              <h1>Search</h1>
            </div>
          </div>

          <div className="flex h-full w-[95%] ">
            <div className="py-5 h-full w-full gap-y-5 flex flex-col ">
              <h1 className="text-card-secondary font-bold text-xl">
                Dati di magazzino
              </h1>
              <div className="flex flex-row gap-x-10 h-full w-full">
                <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-secondary rounded-2xl items-center">
                  <ScanBarcodeIcon className="w-8 h-8" />
                  <div className="flex flex-col gap-y-1 items-center">
                    <h1 className="text-card/75">Articoli registrati</h1>
                    <h1 className="font-bold text-3xl">{articoliTot}</h1>
                  </div>
                </div>
                <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-secondary rounded-2xl items-center">
                  <Archive className="w-8 h-8" />
                  <div className="flex flex-col gap-y-1 items-center">
                    <h1 className="text-card/75">Prodotti registrati</h1>
                    <h1 className="font-bold text-3xl">{prodottiTot}</h1>
                  </div>
                </div>
                <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-secondary rounded-2xl items-center">
                  <Package className="w-8 h-8" />
                  <div className="flex flex-col gap-y-1 items-center">
                    <h1 className="text-card/75">Lotti totali</h1>
                    <h1 className="font-bold text-3xl">{lottiTot}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-full">
          <Preview />
        </div>

        <Link
          href={"/"}
          className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer"
        >
          Aggiungi nuovo prodotto
        </Link>
        <Link
          href={"/"}
          className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer"
        >
          Aggiungi nuovo articolo
        </Link>
        <Link
          href={"/articoli"}
          className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer"
        >
          Visualizza articoli
        </Link>
        <Link
          href={"/prodotti"}
          className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer"
        >
          Visualizza prodotti
        </Link>
      </div>

      <div className="flex flex-col w-full h-full ">
        <div className="flex flex-col pt-5 font-sans w-full gap-y-5">
          <div className="w-full h-90 bg-card rounded-2xl flex-col flex items-center shrink-0 border-black border-2 ">
            <div className=" w-[95%] self-center h-[25%] border-b border-card-secondary/10 shrink-0 justify-between text-card-secondary items-center flex">
              <h1 className="text-3xl font-bold">KaYS</h1>
              <div className="flex gap-x-1">
                <Search />
                <h1>Search</h1>
              </div>
            </div>

            <div className="flex h-full w-[95%] ">
              <div className="py-5 h-full w-full gap-y-5 flex flex-col ">
                <h1 className="text-card-secondary font-bold text-xl">
                  Dati di magazzino
                </h1>
                <div className="flex flex-row gap-x-10 h-full w-full">
                  <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-secondary rounded-2xl items-center">
                    <ScanBarcodeIcon className="w-8 h-8" />
                    <div className="flex flex-col gap-y-1 items-center">
                      <h1 className="text-card/75">Articoli registrati</h1>
                      <h1 className="font-bold text-3xl">{articoliTot}</h1>
                    </div>
                  </div>
                  <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-secondary rounded-2xl items-center">
                    <Archive className="w-8 h-8" />
                    <div className="flex flex-col gap-y-1 items-center">
                      <h1 className="text-card/75">Prodotti registrati</h1>
                      <h1 className="font-bold text-3xl">{prodottiTot}</h1>
                    </div>
                  </div>
                  <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-secondary rounded-2xl items-center">
                    <Package className="w-8 h-8" />
                    <div className="flex flex-col gap-y-1 items-center">
                      <h1 className="text-card/75">Lotti totali</h1>
                      <h1 className="font-bold text-3xl">{lottiTot}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
