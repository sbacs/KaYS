-- MAGAZZINI
INSERT INTO magazzini (nome) VALUES
('Magazzino principale'),
('Magazzino reagenti'),
('Deposito infiammabili'),
('Deposito materiali pericolosi');

-- CATEGORIE
INSERT INTO categorie (nome) VALUES
('Acidi'),
('Basi'),
('Solventi'),
('Sali'),
('Reagenti'),
('Detergenti'),
('Ossidanti'),
('Indicatori');

-- FORNITORI
INSERT INTO fornitori (nome) VALUES
('Sigma-Aldrich'),
('Merck'),
('Carlo Erba Reagents'),
('Fisher Scientific'),
('VWR International'),
('Thermo Fisher');

-- PERICOLI
INSERT INTO pericoli (nome) VALUES
('Infiammabile'),
('Corrosivo'),
('Tossico'),
('Nocivo'),
('Comburente'),
('Irritante'),
('Pericoloso per ambiente'),
('Esplosivo'),
('Gas sotto pressione');

-- UNITA DI MISURA
INSERT INTO unita_misura (tipo, iniziali) VALUES
('Millilitro', 'ml'),
('Litro', 'L'),
('Milligrammo', 'mg'),
('Grammо', 'g'),
('Chilogrammo', 'kg'),
('Mole', 'mol');

-- CLASSIFICAZIONI MERCEOLOGICHE
INSERT INTO classificazioni_merceologiche (classificazione) VALUES
('Reagente analitico'),
('Grado laboratorio'),
('Grado tecnico'),
('Solvente HPLC'),
('Solvente ACS'),
('Materiale di consumo'),
('Reagente industriale');

-- RICETTE
INSERT INTO ricette (nome, descrizione) VALUES
('Soluzione salina 0.9%', 'Soluzione acquosa di cloruro di sodio allo 0.9%'),
('Soluzione acida diluita', 'Soluzione di acido cloridrico diluito per uso didattico'),
('Soluzione basica', 'Soluzione di idrossido di sodio per esercitazioni'),
('Soluzione tampone pH 7', 'Soluzione tampone per calibrazione del pH'),
('Soluzione detergente', 'Miscela detergente per pulizia di superfici');

-- PRODOTTI
INSERT INTO prodotti
(id_categoria, cas, id_unita, descrizione, concentrazione, nome, quantita_riordino)
VALUES
(1, '7647-01-0', 2, 'Acido cloridrico in soluzione acquosa', 37, 'Acido cloridrico', 5),
(1, '7664-93-9', 2, 'Acido solforico concentrato', 96, 'Acido solforico', 3),
(2, '1310-73-2', 4, 'Idrossido di sodio in forma solida', 100, 'Soda caustica', 10),
(3, '67-64-1', 2, 'Solvente organico volatile', 100, 'Acetone', 5),
(3, '64-17-5', 2, 'Alcol etilico', 96, 'Etanolo', 5),
(4, '7647-14-5', 4, 'Cloruro di sodio', 100, 'Cloruro di sodio', 10),
(4, '7757-82-6', 4, 'Solfato di sodio', 100, 'Solfato di sodio', 5),
(7, '7722-84-1', 2, 'Perossido di idrogeno in soluzione', 30, 'Acqua ossigenata', 3),
(8, '7664-93-9', 4, 'Indicatore chimico per titolazioni', 100, 'Fenolftaleina', 2),
(5, '7732-18-5', 2, 'Acqua deionizzata', 100, 'Acqua distillata', 10);

-- ARTICOLI
INSERT INTO articoli
(id_prodotto, nome, quantita_recipiente, id_fornitore, descrizione, posizione, link_scheda)
VALUES
(1, 'Acido cloridrico 1L', 1, 1, 'Flacone in vetro da 1 litro', 'A01', NULL),
(1, 'Acido cloridrico 500ml', 0.5, 2, 'Flacone da 500 ml', 'A02', NULL),
(2, 'Acido solforico 1L', 1, 3, 'Flacone da 1 litro', 'A03', NULL),
(3, 'Soda caustica 1kg', 1, 1, 'Contenitore da 1 kg', 'B01', NULL),
(4, 'Acetone 1L', 1, 4, 'Bottiglia da 1 litro', 'C01', NULL),
(5, 'Etanolo 1L', 1, 2, 'Bottiglia da 1 litro', 'C02', NULL),
(6, 'Cloruro di sodio 500g', 500, 3, 'Confezione da 500 grammi', 'D01', NULL),
(7, 'Solfato di sodio 1kg', 1000, 5, 'Confezione da 1 kg', 'D02', NULL),
(8, 'Acqua ossigenata 1L', 1, 6, 'Flacone da 1 litro', 'E01', NULL),
(9, 'Fenolftaleina 100g', 100, 1, 'Confezione da 100 grammi', 'E02', NULL),
(10, 'Acqua distillata 5L', 5, 4, 'Tanica da 5 litri', 'F01', NULL);

-- LOTTI
INSERT INTO lotto
(id_articolo, id_magazzino, data_lotto, data_scadenza, quantita_ordinata, quantita)
VALUES
(1, '2', '2026-01-10', '2028-01-10', 10, 8),
(2, '2', '2026-02-15', '2028-02-15', 5, 3),
(3, '2', '2026-03-01', '2028-03-01', 5, 4),
(4, '1', '2026-01-20', '2028-01-20', 10, 7),
(5, '3', '2026-02-10', '2027-02-10', 10, 6),
(6, '3', '2026-03-12', '2028-03-12', 10, 9),
(7, '1', '2026-04-01', '2029-04-01', 20, 15),
(8, '1', '2026-04-05', '2029-04-05', 10, 8),
(9, '4', '2026-05-10', '2027-05-10', 5, 4),
(10, '1', '2026-06-01', '2028-06-01', 20, 18),
(11, '1', '2026-06-15', '2028-06-15', 10, 9);

-- PRODOTTO_RICETTA
INSERT INTO prodotto_ricetta (id_prodotto, id_ricetta, quantita_richiesta) VALUES
(6, 1, 9),
(10, 1, 1000),
(1, 2, 10),
(10, 2, 990),
(3, 3, 10),
(10, 3, 990),
(6, 4, 5),
(10, 4, 995),
(5, 5, 100),
(10, 5, 900);

-- ARTICOLO_PERICOLO
INSERT INTO articolo_pericolo (id_articolo, id_pericolo) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 1),
(6, 1),
(9, 5),
(10, 4);

-- PRODOTTO_MERCEOLOGICA
INSERT INTO prodotto_merceologica (id_prodotto, id_merceologica) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 4),
(5, 5),
(6, 2),
(7, 2),
(8, 1),
(9, 1),
(10, 3);