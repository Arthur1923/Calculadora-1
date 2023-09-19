create table clientes(
   id_cliente int  not null,
   nome varchar(50) not null,
   telefone varchar(20),
   cpf varchar(20) not nul,
   primary key(id_cliente),
   FOREIGN key (id_telefone_fk) REFERENCES telefone(id_telefone)
);

create table pedido(
    id_pedido int not null,
    livro_fk int  not null,
    data_venda time  not null,
    numero_unidade int,
    valor_venda float not null,
    FOREIGN key (id_livro_fk) REFERENCES (id_livro_fk)  
);

create table vendedor(
    id_vendedor int not null,
    nome varchar(200),
    telefone varchar(20)
);

create table compra(
    id_compra int not null,
    quantidade int not null,
    data_compra data,
    FOREIGN key (id_fornecedor _fk) REFERENCES  fornecedor(id_fornecedor)
);

create table fornecedor (
    id_fornecedor int not null,
    nome_editora varchar(50) not null,
    cnpj varchar(14),
    id_endereco_fk int,
    FOREIGN key (id_endereco_fk) REFERENCES endereco(id_endereco)
);

create table livro(
    id_livro int not null,
    nome_livro varchar(50),
    titulo varchar(50),
    genero varchar(50),
    idioma varchar(50),
    data_lancamento date not null 
);

create table autor(
    id_autor int not null,
    nome varchar(50) not null,
    data_nascimento date,
    origem varchar(50)
);

create table autor_X_livro(
    FOREIGN key (id_livro_fk) REFERENCES livro(id_livro_fk),
    FOREIGNkey (id_autor_fk) REFERENCES autor(id_autor)
);

create table endereço(
    id_endereço int not null,
    rua varchar(50) not null,
    bairro varchar(50) not null,
    numero_endereço int not null,
    cidade varchar(50) not null,
    estado varchar(50) not null,
    complemento varchar(50) not null
);

create table telefone(
    id_telefone int not null,
    telefone varchar(11)
);

   