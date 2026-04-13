# KaYS Gestione magazzino
## API schema

### `GET /unita`
Restituisce le unità di misura disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `POST /unita`
#### Parametri
- `nome` : `nome dell'unità di misura`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /magazzini`
Restituisce tutti i magazzini disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `POST /magazzini`
#### Parametri
- `nome` : `nome del magazzino`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /fornitori`
Restituisce tutti i fornitori disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `POST /fornitori`
#### Parametri
- `nome` : `nome del fornitore`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /pericoli`
Restituisce tutti i pericoli disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `POST /pericoli`
#### Parametri
- `nome` : `nome del pericolo`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /ricette`
Restituisce tutte le ricette disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `POST /ricette`
#### Parametri
- `nome` : `nome della ricetta`
- `descrizione` : `descrizione della ricetta`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /ricette/:id`
Restituisce una ricetta specifica.
#### Parametri path
- `id` : `id della ricetta`
#### Risposta
`200 OK`
```json
{
}
```

### `POST /ricette/:id/prodotti`
Aggiunge un prodotto a una ricetta.
#### Parametri path
- `id` : `id della ricetta`
#### Body
- `id_prodotto` : `id del prodotto`
- `quantita_richiesta` : `quantità richiesta del prodotto`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /classificazioni`
Restituisce tutte le classificazioni merceologiche disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `POST /classificazioni`
#### Parametri
- `classificazione` : `nome della classificazione merceologica`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /categorie`
Restituisce tutte le categorie disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `POST /categorie`
#### Parametri
- `nome` : `nome della categoria`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /articoli`
Restituisce tutti gli articoli disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `GET /articoli/:id`
Restituisce un articolo specifico.
#### Parametri path
- `id` : `id dell'articolo`
#### Risposta
`200 OK`
```json
{
}
```

### `POST /articoli`
Aggiunge un nuovo articolo.
#### Body
- `id_prodotto` : `id del prodotto associato`
- `nome` : `nome dell'articolo`
- `quantita_recipiente` : `quantità del recipiente`
- `id_fornitore` : `id del fornitore`
- `descrizione` : `descrizione dell'articolo`
- `posizione` : `posizione nel magazzino`
- `link_scheda` : `link alla scheda dell'articolo`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /prodotti`
Restituisce tutti i prodotti disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `GET /prodotti/:id`
Restituisce un prodotto specifico.
#### Parametri path
- `id` : `id del prodotto`
#### Risposta
`200 OK`
```json
{
}
```

### `POST /prodotti`
Aggiunge un nuovo prodotto.
#### Body
- `id_categoria` : `id della categoria`
- `cas` : `numero CAS`
- `id_unita` : `id dell'unità di misura`
- `descrizione` : `descrizione del prodotto`
- `concentrazione` : `concentrazione del prodotto`
- `nome` : `nome del prodotto`
- `soglia_riordino` : `soglia di quantità sotto la quale il riordino è necessario`
#### Risposta
`200 OK`
```json
{
}
```

---

### `GET /lotti`
Restituisce tutti i lotti disponibili.
#### Risposta
`200 OK`
```json
{
}
```

### `GET /lotti/:id`
Restituisce un lotto specifico.
#### Parametri path
- `id` : `id del lotto`
#### Risposta
`200 OK`
```json
{
}
```

### `POST /lotti`
Aggiunge un nuovo lotto.
#### Body
- `id_articolo` : `id dell'articolo associato`
- `id_magazzino` : `id del magazzino`
- `data_lotto` : `data dell'ordine del lotto`
- `data_scadenza` : `data di scadenza del lotto`
- `quantita_ordinata` : `quantità ordinata nel lotto`
#### Risposta
`200 OK`
```json
{
}
```