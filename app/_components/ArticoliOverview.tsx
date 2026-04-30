
import { Articolo } from "../lib/types"
import { getArticoliFrom } from "../services/articoli"

export default async function ArticoliOverview() {

    const articoli : Articolo[] = await getArticoliFrom(new Date(`2024-04-04`));

    console.log(articoli

    )
    return (
        <div>
            wad
        </div>
    )
}