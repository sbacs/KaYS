# Documentazione Progetto - Gestione Digitale Magazzino Chimica

**Data Creazione:** 15 Maggio 2026  
**Ultima Revisione:** 15 Maggio 2026  
**Destinatari:** Alunni sviluppatori del prossimo anno accademico (2026-2027)

---

## � A Chi È Rivolta Questa Documentazione

Questo documento è stato preparato per gli **alunni sviluppatori dell'anno accademico 2026-2027** che erediteranno questo progetto.

Lo scopo è fornire una **guida completa** che vi permetta di:
- Comprendere gli obiettivi e i requisiti del progetto
- Conoscere cosa è stato già fatto e cosa rimane da fare
- Identificare le priorità di sviluppo
- Proseguire il lavoro in modo efficiente e consapevole

Questa documentazione sarà la vostra base per continuare e completare il sistema di gestione del magazzino.

---

1. [Descrizione del Progetto](#descrizione-del-progetto)
2. [Obiettivi Generali](#obiettivi-generali)
3. [Obiettivi per gli Studenti Sviluppatori](#obiettivi-per-gli-studenti-sviluppatori)
4. [Stato Attuale dello Sviluppo](#stato-attuale-dello-sviluppo)
5. [Funzionalità Completate](#funzionalità-completate)
6. [Funzionalità Non Ancora Implementate](#funzionalità-non-ancora-implementate)
7. [Glossario Progetto](#glossario-progetto)

---

## 🎯 Descrizione del Progetto

### Che cos'è

Il progetto è un **sistema di gestione digitale del magazzino di chimica** che mira a digitalizzare e tracciare l'inventario di materiali chimici e articoli di laboratorio. 

L'obiettivo principale è passare da un sistema di gestione manuale/cartaceo a una soluzione software moderna basata su web, scalabile e user-friendly, che permetta il tracciamento accurato di:
- **Lotti** di materiale
- **Articoli** (singole tipologie di materiale)
- **Prodotti** (categorie omologate di articoli)
- **Partizioni** del magazzino (zone specifiche di stoccaggio)

### Contesto

Il sistema si divide in:
- **Magazzino Scorte**: area di stoccaggio a lungo termine (oggetto della digitalizzazione)
- **Magazzino Polmone**: area di stoccaggio a breve termine (standardizzazione futura)

La digitalizzazione partirà dallo **Scaffale Fiale Normex** come prototipo pilota, per poi espandersi ad altre aree (Armadio Acidi e Basi, Ingredienti Cosmetici, Vetreria, Solventi).

### Stack Tecnologico

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS (presumibilmente)
- **Backend**: Next.js API Routes
- **Database**: SQL (struttura in `db/database.sql`)
- **Architettura**: Moderno, scalabile, web-based

---

## 🎓 Obiettivi Generali

### Obiettivi Primari

1. **Tracciamento Materiale**: Creare un sistema che traccia accuratamente lotti, articoli e prodotti nel magazzino
2. **Gestione Prelievi**: Registrare automaticamente i prelievi di materiale dal magazzino, con sottrazione dal lotto più vecchio (FIFO)
3. **Gestione Reintegri**: Permettere l'inserimento di nuovi lotti acquistati
4. **Controllo Accesso**: Implementare un sistema di autorizzazioni con diversi livelli utente (user, admin)
5. **Monitoraggio Giacenze**: Tracciare quantità disponibili e prevedere esaurimento scorte

### Obiettivi Secondari (Funzionalità Avanzate)

1. **QR Code Scanning**: Supportare prelievi tramite scansione QR
2. **Mobile Access**: Accessibilità tramite webview per smartphone
3. **Bill of Materials**: Gestione esperimenti con distinte base
4. **Storicizzazione Prelievi**: Registro datato dei prelievi
5. **Alert Riordini**: Sistema di notifiche per riordini basato su soglie calcolate
6. **Indicatori Visivi**: Colore su giacenze per indicare rischio esaurimento
7. **Report e Export**: Generazione report (prelievi, scadenze, riordini) e export su Excel/PDF
8. **Documentazione**: Archivio digitale di schede di sicurezza

---

## 👨‍💻 Obiettivi per gli Studenti Sviluppatori

### Competenze da Acquisire

1. **Sviluppo Full-Stack**: Frontend (Next.js/React) e Backend (API Routes)
2. **Database Design**: Strutturazione e gestione di dati relazionali complessi
3. **UX/UI Design**: Interfaccia intuitiva per utenti non tecnici
4. **Gestione Requisiti**: Implementazione accurata di specifiche funzionali
5. **Testing e Validazione**: Assicurare qualità del software
6. **Documentazione**: Scrivere documentazione tecnica e per l'utente finale
7. **Scalabilità**: Progettare soluzioni scalabili e manutenibili

### Responsabilità

- Analizzare i requisiti forniti (vedi documento "Mappatura requisiti software")
- Implementare le funzionalità in priorità
- Validare il prototipo pilota (Scaffale Fiale Normex)
- Preparare il sistema per future espansioni
- Documentare il codice e il progetto
- Garantire un software robusto e performante

---

## 📊 Stato Attuale dello Sviluppo

**Data Valutazione**: 15 Maggio 2026

### Struttura Progetto (Creata ✅)

```
app/
├── _components/           # Componenti React UI
├── api/                   # Endpoint API (intelligenze backend)
├── articoli/              # Pagina articoli
├── prodotti/              # Pagina prodotti
├── lib/                   # Utility e tipi TypeScript
└── services/              # Servizi di comunicazione con API

db/
├── database.sql           # Schema del database
└── docker-compose.yaml    # Configurazione database

Configurazione:
├── package.json           # Dipendenze progetto
├── tsconfig.json          # Configurazione TypeScript
├── next.config.ts         # Configurazione Next.js
└── eslint.config.mjs      # Configurazione linter
```

### Infrastruttura di Base (Creata ✅)

- ✅ Progetto Next.js inizializzato
- ✅ Database SQL configurato
- ✅ Routing API structure creato
- ✅ Componenti UI base implementati
- ✅ Servizi per comunicazione API
- ✅ TypeScript configurato

---

## ✅ Funzionalità Completate

### Fase 1: Fondamentale (Completato - Presumibilmente ✅)

1. **Struttura Database**
   - ✅ Schema SQL per lotti, articoli, prodotti, magazzini
   - ✅ Relazioni tra entità configurate
   - ✅ Gestione partizioni magazzino

2. **API Backend**
   - ✅ Endpoint CRUD per articoli, prodotti, categorie
   - ✅ Endpoint per gestione fornitori
   - ✅ Endpoint per classificazioni e pericoli
   - ✅ Endpoint per unità di misura

3. **Interfaccia Utente Base**
   - ✅ Layout principale con navbar
   - ✅ Pagine per articoli e prodotti
   - ✅ Dark mode (toggle disponibile)
   - ✅ Ricerca e filtri base

4. **Servizi**
   - ✅ Layer di servizi per chiamate API
   - ✅ Utility e funzioni di supporto

### Fase 2: Core (Parzialmente ✅)

- ⚠️ Gestione prelievi (struttura presente, logica da verificare)
- ⚠️ Calcolo FIFO per prelievi (da testare)
- ⚠️ Aggiornamento quantità articoli/prodotti (da verificare)
- ⚠️ Autenticazione e autorizzazioni user/admin (struttura da verificare)

---

## ❌ Funzionalità Non Ancora Implementate

### Funzionalità di Base (Critica)

1. **Gestione Autorizzazioni**
   - ❌ Sistema di login/autenticazione
   - ❌ Ruoli user/admin con autorizzazioni differenziate
   - ❌ Protezione endpoint API

2. **Gestione Prelievi (Core)**
   - ❌ Interfaccia user-friendly per registrazione prelievi
   - ❌ Logica FIFO per selezione automatica lotto
   - ❌ Validazione quantità disponibili
   - ❌ Conferma prelievo

3. **Gestione Reintegri (Core)**
   - ❌ Interfaccia inserimento nuovi lotti
   - ❌ Impostazione data scadenza automatica (3 anni)
   - ❌ Collegamento lotto-articolo

4. **Query e Ricerche**
   - ❌ Ricerca avanzata per categoria
   - ❌ Filtri multiple e combinati
   - ❌ Ordinamento per vari criteri

### Funzionalità Avanzate (Importante)

5. **QR Code Scanning**
   - ❌ Integrazione libreria QR scanner
   - ❌ Interfaccia QR per prelievi
   - ❌ Generazione QR code per articoli

6. **Pagina Prelievi per Mobile**
   - ❌ Pagina dedicata per prelievi su smartphone
   - ❌ Interfaccia ottimizzata per touch e schermo piccolo
   - ❌ Supporto scansione QR integrata

7. **Bill of Materials**
   - ❌ Interfaccia creazione esperimenti
   - ❌ Gestione distinte base
   - ❌ Verificazione disponibilità materiali con click
   - ❌ Avviso magazzino polmone

8. **Storicizzazione Prelievi**
   - ❌ Tabella storico prelievi
   - ❌ Timestamp e tracciamento utente
   - ❌ Visualizzazione cronologia

9. **Sistema Riordini**
    - ❌ Calcolo soglia riordino (FeedForward)
    - ❌ Alert automatici
    - ❌ Lista riordini gestibile
    - ❌ Analisi consumo mensile medio

10. **Indicatori Visivi**
    - ❌ Colore giacenza per rischio esaurimento
    - ❌ Display fabbisogno stimato
    - ❌ Dashboard indicatori KPI

11. **Report e Export**
    - ❌ Generazione report prelievi (Excel/PDF)
    - ❌ Report materiali in scadenza
    - ❌ Report lista riordini
    - ❌ Export dati per backup

### Documentazione e Manutenzione (Importante)

12. **Documentazione Software**
    - ⚠️ README.md base (presente)
    - ❌ Documentazione API completa
    - ❌ Guide per sviluppatori

---

## 📚 Glossario Progetto

### Concetti Chiave

| Termine | Definizione |
|---------|-----------|
| **Partizione** | Zona specifica, distinta e denominata univocamente del magazzino scorte |
| **Lotto** | Singola partita commerciale di materiale con ID univoco |
| **Articolo** | Singola tipologia di materiale distinguibile per nome, formato o fornitore |
| **Prodotto** | Categoria di articoli equivalenti per omologazione d'uso nel laboratorio |
| **Magazzino Scorte** | Area di stoccaggio a lungo termine di grandi quantità (OGGETTO DEL PROGETTO) |
| **Magazzino Polmone** | Area di stoccaggio breve termine di piccole quantità "in uso" (FUTURA) |
| **Numero CAS** | Identificativo numerico univoco di una sostanza chimica |
| **Classe CLP** | Classificazione di pericolo per sostanze chimiche e miscele |
| **Frasi H** | Codici alfanumerici identificativi dei pericoli specifici |
| **Frasi P** | Codici alfanumerici identificativi dei consigli di prudenza |
| **Categoria** | Insieme di prodotti accomunati da una finalità d'uso tecnologica |
| **Quarti** | Unità di misura (1/4 di confezione) per materiali a bassa giacenza |

### Acronimi

- **FIFO**: First In, First Out (primo entrato, primo uscito - prelievi automatici)
- **BOM**: Bill of Materials (distinta base)
- **CAS**: Chemical Abstracts Service
- **CLP**: Classification, Labelling and Packaging
- **QR**: Quick Response (codice)
- **PDF**: Portable Document Format
- **Excel**: Microsoft Excel
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete
- **KPI**: Key Performance Indicator

---

## 📝 Prossimi Passi Consigliati

### Priorità Immediata (Sprint 1-2)

1. Completare **autenticazione e autorizzazioni**
2. Implementare **interfaccia prelievi** (core functionality)
3. Implementare **interfaccia reintegri** (core functionality)
4. Testare logica **FIFO e calcolo quantità**
5. Validare prototipo su **Scaffale Fiale Normex**

### Priorità Media (Sprint 3-4)

6. Implementare **unità di misura e conversioni**
7. Aggiungere **storicizzazione prelievi**
8. Implementare **sistema riordini base**
9. Creare **report e export**
10. Sviluppare **UI mobile-responsive**

### Priorità Futura (Post MVP)

11. QR code scanning
12. Bill of Materials per esperimenti
13. Indicatori visivi avanzati
14. Integrazione magazzino polmone
15. Estensione ad altre aree magazzino

---

## 📞 Note Importanti

- **Documento di Riferimento**: "Mappatura requisiti software" (Ultima Revisione: 08/04/26 09:00, Autore: LB)
- **Prototipo Pilota**: Scaffale Fiale Normex (area iniziale di validazione)
- **Database**: Disponibile in `db/docker-compose.yaml` e `db/database.sql`
- **Scalabilità**: Il progetto deve essere progettato considerando possibili estensioni ad altri contesti

---

**Fine Documentazione**
