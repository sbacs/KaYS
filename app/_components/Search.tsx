"use client"
import { SearchIcon } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export default function Search() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (
        <div className="flex gap-x-4 relative border-b border-border text-text">
            <SearchIcon className="absolute right-0 text-text p-0.5" />
            <input
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const params = new URLSearchParams(searchParams.toString())
                        const value = e.currentTarget.value.trim()
                        if (value)
                            params.set("q", value)
                        else
                            params.delete("q")
                        router.push(`${pathname}?${params.toString()}`)
                    }
                }}
                type="text"
                className="text-text decoration-0 min-w-75 border-none outline-none"
            />
        </div>
    )
}