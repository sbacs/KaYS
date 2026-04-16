import Image from "next/image";
import Link from "next/link";
import { Search, ScanBarcodeIcon, Package, Archive } from "lucide-react";
import { SparkAreaChart } from "./_components/SparkChart";
import Preview from "./_components/Preview";


const chartdata = [{ month: "Jan 21", Performance: 4000, }, { month: "Feb 21", Performance: 3000, }, { month: "Mar 21", Performance: 2000, }, { month: "Apr 21", Performance: 2780, }, { month: "May 21", Performance: 1890, }, { month: "Jun 21", Performance: 2390, }, { month: "Jul 21", Performance: 3490, },]


export default function Home() {


  return (
    <div className="flex flex-col flex-1 items-center pt-5 font-sans w-full gap-y-5">

      <div className="w-full h-90 bg-card rounded-2xl shadow-lg flex-col flex items-center shrink-0 ">

        <div className=" w-[95%] self-center h-[25%] border-b border-card-light/10 shrink-0 justify-between text-card-light items-center flex">
          <h1 className="text-3xl font-bold">KaYS</h1>
          <div className="flex gap-x-1">
            <Search />
            <h1>Search</h1>
          </div>
        </div>


        <div className="flex h-full w-[95%] ">

          <div className="py-5 h-full w-full gap-y-5 flex flex-col ">

            <h1 className="text-card-light font-bold text-xl">Dati di magazzino</h1>
            <div className="flex flex-row gap-x-4 h-full w-full">

              <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-light rounded-2xl">
                <ScanBarcodeIcon className="w-8 h-8" />
                <div className="flex flex-col gap-y-1">
                  <h1 className="text-card/75">Articoli registrati</h1>
                  <h1 className="font-bold text-3xl">72492</h1>
                </div>

              </div>
              <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-light rounded-2xl">
                <Archive className="w-8 h-8" />
                <div className="flex flex-col gap-y-1">
                  <h1 className="text-card/75">Prodotti registrati</h1>
                  <h1 className="font-bold text-3xl">72492</h1>
                </div>
              </div>
              <div className="h-full w-full gap-y-6 flex flex-col p-5 bg-card-light rounded-2xl">
                <Package className="w-8 h-8" />
                <div className="flex flex-col gap-y-1">
                  <h1 className="text-card/75">Lotti totali</h1>
                  <h1 className="font-bold text-3xl">72492</h1>
                </div>

              </div>

            </div>

          </div>

          <div className="bg-card-light/10 w-1 mx-5 self-center h-[90%]" />

          <div className="py-5 h-full w-full gap-y-5 flex flex-col  ">

            <h1 className="text-card-light font-bold text-xl">Progressi</h1>
            <div className="flex flex-row gap-x-4 h-full w-full ">

              <div className="h-full w-full bg-card-light rounded-2xl flex p-5 gap-x-2">
                <div className="flex flex-col h-full justify-center gap-y-4 ">
                  <h1 className="text-card/75">Lotti totali ordinati</h1>
                  <h1 className="font-bold text-3xl">205</h1>
                </div>
                <div className="flex flex-col h-full w-full ">
                  <h1 className="text-green-600 text-xl self-end flex"><h1 className="rotate-90">»</h1>30%</h1>
                  <SparkAreaChart data={chartdata} categories={["Performance"]} index={"month"} colors={["gray"]} className="h-full w-full " />
                </div>

              </div>

              <div className="h-full w-full bg-card-light rounded-2xl flex p-5 gap-x-2">
                <div className="flex flex-col h-full justify-center gap-y-4  ">
                  <h1 className="text-card/75" >Prelievi mensili</h1>
                  <h1 className="font-bold text-3xl">67</h1>
                </div>
                <div className="flex flex-col h-full w-full ">
                  <h1 className="text-red-600 text-xl self-end flex"><h1 className="-rotate-90">»</h1>30%</h1>
                  <SparkAreaChart data={chartdata} categories={["Performance"]} index={"month"} colors={["gray"]} className="h-full w-full " />
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
      <div className="flex w-full h-full">
        <Preview />
      </div>


      <Link href={"/"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Aggiungi nuovo prodotto</Link>
      <Link href={"/"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Aggiungi nuovo articolo</Link>
      <Link href={"/"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Visualizza articoli</Link>
      <Link href={"/articoli"} className="bg-white/10 rounded-lg p-3 font-bold hover:scale-102 transition-all duration-150 hover:cursor-pointer">Visualizza articoli</Link>
    </div>
  );
}
