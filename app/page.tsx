import Image from "next/image";
import Overview from "./_components/Overview";
import Link from "next/link";
import Preview from "./_components/Preview";
import AggiungiPannello from "./_components/AggiungiPannello";
import { SquareArrowOutUpRight } from "lucide-react";
import PrelevaPannello from "./_components/PrelevaPannello";

export default async function Home() {

  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-x-10 py-5 px-5">
      <div className="flex flex-col items-left font-sans w-full gap-y-5">

        <Overview />

        <div className="flex w-full h-full">
          <Preview />
        </div>
      </div>

      <div className="h-full w-full gap-y-5 flex flex-col">

        <AggiungiPannello />

        <PrelevaPannello />

      </div>

    </div>
  );
}
