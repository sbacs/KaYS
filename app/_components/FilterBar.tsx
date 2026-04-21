"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";

interface FilterBarProps {
    initialFilters: Record<string, { values: string[], active: number }>;
    className?: string;
}

export default function FilterBar({ initialFilters, className = "" }: FilterBarProps) {

    const router = useRouter()
    const searchParams = useSearchParams()

    const [open, setOpen] = useState<string | null>(null)
    const [filters, setFilters] = useState(initialFilters)

    function setActive(key: string, i: number) {
        setFilters(prev => ({
            ...prev,
            [key]: { ...prev[key], active: i }
        }))

        const params = new URLSearchParams(searchParams.toString())

        if (filters[key].values[i] === "tutti" || !filters[key]) {
            params.delete(key)
        } else {
            params.set(key, filters[key].values[i])
        }

        router.push(`?${params.toString()}`)
        setOpen(null)
    }

    return (
        <>
            {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(null)} />}

            <div className={` ${className} flex gap-x-2 border-l px-2 border-card/15 w-full flex-col lg:flex-row gap-y-2`}>
                {Object.entries(filters).map(([key, filter]) =>
                    <div className="flex gap-x-5 flex-row border-r border-card/25 px-5 ">

                        <h1 className=" text-sm text-card/75">{key}</h1>
                        <button key={key} onClick={() => setOpen(key)} className="relative  w-full hover:underline underline-card/25  hover:cursor-pointer transition-all duration-150 min-w-20 px-5 text-nowrap flex justify-center">
                            {filter.values[filter.active]}
                            {open === key && (
                                <div className="absolute bottom-0 min-w-40 flex flex-col gap-y-2 translate-y-full w-full max-h-50 overflow-y-scroll bg-card-secondary rounded-xl shadow-md z-20">
                                    {filter.values.map((f, i) =>
                                        <button key={i} className="hover:bg-card/5 w-full px-5 h-15 shrink-0 text-wrap" onClick={(e) => {
                                            e.stopPropagation()
                                            setActive(key, i)
                                        }}>{f}</button>
                                    )}
                                </div>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}