"use client"

import { useEffect, useState } from "react"

interface FilterBarProps {
    initialFilters: Record<string, { values: string[], active: number }>
}

export default function FilterBar({ initialFilters }: FilterBarProps) {

    const [open, setOpen] = useState<string | null>(null)
    const [filters, setFilters] = useState(initialFilters)

    function setActive(key: string, i: number) {
        setFilters(prev => ({
            ...prev,
            [key]: { ...prev[key], active: i }
        }))
    }

    return (
        <>
            {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(null)} />}

            <div className="flex gap-x-2">
                {Object.entries(filters).map(([key, filter]) =>
                    <button key={key} onClick={() => setOpen(key)} className="relative z-20 hover:cursor-pointer hover:scale-105 transition-all duration-150 min-w-40 px-5 text-nowrap flex justify-center">
                        {filter.values[filter.active]}
                        {open === key && (
                            <div className="absolute bottom-0 flex flex-col gap-y-2 translate-y-full w-full max-h-50 overflow-y-scroll bg-card-light rounded-xl shadow-md z-20">
                                {filter.values.map((f, i) =>
                                    <button key={i} className="hover:bg-card/5 w-full px-5 h-15 shrink-0 text-wrap" onClick={(e) => {
                                        e.stopPropagation()
                                        setActive(key, i)
                                        setOpen(null)
                                    }}>{f}</button>
                                )}
                            </div>
                        )}
                    </button>
                )}
            </div>
        </>
    )
}