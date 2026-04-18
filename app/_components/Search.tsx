"use client"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface SearchProps {
    route?: String;
}

export default function Search({ route = "/articoli" }: SearchProps) {

    const router = useRouter()
    const [query, setQuery] = useState<String>("")

    useEffect(() => {
        if (query.trim())
            router.push(`${route}?q=${query}`)
        else
            router.push(`${route}`)

    }, [query])

    return (
        <div className="flex gap-x-4 relative border-b border-card/50">
            <SearchIcon className="absolute right-0 text-card/25 p-0.5" />
            <input onKeyDown={(e) => {
                if (e.key == "Enter") {
                    setQuery(e.currentTarget.value)
                }

            }} type="text" className=" decoration-0 border-none outline-none" />
        </div>
    )
}