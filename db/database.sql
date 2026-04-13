create table magazzini (
	id int primary key not null auto_increment,
	nome varchar(50) not null
);

create table categorie (
	id int primary key not null auto_increment,
	nome varchar(50) not null
);

create table fornitori (
	id int primary key not null auto_increment,
	nome varchar(50) not null
);

create table pericoli (
	id int primary key not null auto_increment,
	nome varchar(50) not null
);

create table unita_misura (
	id int primary key not null auto_increment,
	tipo varchar(50) not null
);

create table classificazioni_merceologiche (
	id int primary key not null auto_increment,
	classificazione varchar(50) not null
);

create table ricette (
	id int primary key not null auto_increment,
	nome varchar(50) not null,
	descrizione text
);

create table prodotti (
	id int primary key not NULL auto_increment,
	id_categoria integer not null,
	cas varchar(11),
	id_unita integer not null,
	descrizione text,
	concentrazione integer,
	nome varchar(25) not null,
	quantita_riordino integer not null default 0,
	classificazione varchar(25) not null,

	foreign key (id_categoria) references categorie(id) ON DELETE CASCADE,
	foreign key (id_unita) references unita_misura(id) ON DELETE CASCADE
);

create table articoli (
	id int primary key not null auto_increment,
	id_prodotto int not null,
	nome varchar(50) not null,
	quantita_recipiente int not null,
	id_fornitore integer,
	descrizione text,
	posizione varchar(5) not null,
	link_scheda text,

	foreign key (id_prodotto) references prodotti(id),
	foreign key (id_fornitore) references fornitori(id) ON DELETE CASCADE
);

create table lotto (
	id int primary key not null auto_increment,
	id_articolo int not null,
	id_magazzino int not null,
	data_lotto datetime not null default current_timestamp,
	data_scadenza timestamp not null default (current_timestamp + interval 3 year),
	quantita_ordinata int not null,
	quantita int not null,

	foreign key (id_magazzino) references magazzini(id) ON DELETE CASCADE,
	foreign key (id_articolo) references articoli(id) ON DELETE CASCADE
);

create table prodotto_ricetta (
	id_prodotto int not null,
	id_ricetta int not null,
	quantita_richiesta int not null,

	foreign key (id_prodotto) references prodotti(id) ON DELETE CASCADE,
	foreign key (id_ricetta) references ricette(id) ON DELETE CASCADE
);

create table articolo_pericolo (
	id_articolo int not null,
	id_pericolo int not null,

	foreign key (id_articolo) references articoli(id) ON DELETE CASCADE,
	foreign key (id_pericolo) references pericoli(id) ON DELETE CASCADE
);

create table prodotto_merceologica (
	id_prodotto int not null,
	id_merceologica int not null,

	foreign key (id_prodotto) references prodotti(id) ON DELETE CASCADE,
	foreign key (id_merceologica) references classificazioni_merceologiche(id) ON DELETE CASCADE
);