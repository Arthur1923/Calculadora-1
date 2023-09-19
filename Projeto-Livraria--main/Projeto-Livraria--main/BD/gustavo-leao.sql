--criar um arquivo unico para o projeto
create database banco_de_dados_gustavo(

create table telefone(
    id_telefone int not null,
    telefone varchar(11),
    primary key(id_telefone)
);

create table endereco(
    id_endereco int not null auto_increment,
    rua varchar(50) not null,
    bairro varchar(50) not null,
    numero_endereco int not null,
    cidade varchar(50) not null,
    estado varchar(50) not null,
    complemento varchar(50) not null
);

create table cliente( 
   id_cliente int  not null auto_increment,
   nome varchar(50) not null,
   cpf varchar(20) not null,
   id_telefone_fk int not null,
   id_endereco_fk int not null,
   primary key(id_cliente),
   foreign key (id_endereco_fk) REFERENCES endereco(id_endereco),
   foreign key (id_telefone_fk) REFERENCES telefone(id_telefone)
);


create table pedido(
    id_pedido int not null auto_increment,
    id_livro int  not null,
    data_venda time  not null,
    numero_unidade int,
    valor_venda float not null,
    primary key(id_pedido),
    FOREIGN key (id_livro) REFERENCES livro(id_livro)  
);

create table vendedor(
    id_vendedor int not null auto_increment,
    nome varchar(200),
    id_telefone int not null,
    primary key(vendedor),
    FOREIGN key (id_telefone) REFERENCES telefone(id_telefone),
);

create table compra(
    id_compra int not null auto_increment,
    quantidade int not null,
    data_compra date,
    id_fornecedor int not null,
    primary key(id_compra),
    FOREIGN key (id_fornecedor) REFERENCES  fornecedor(id_fornecedor)
);

create table fornecedor(
    id_fornecedor int not null auto_increment,
    nome_editora varchar(50) not null,
    cnpj varchar(14),
    id_endereço int not null,
       primary key(id_fornecedor),
    FOREIGN key (id_endereço) REFERENCES endereço(id_endereço)
);

create table livro(
    id_livro int not null auto_increment,
    nome_livro varchar(50),
    titulo varchar(50),
    genero varchar(50),
    idioma varchar(50),
       primary key(id_livro),
    data_lançamento data not null 
);

create table autor(
    id_autor int not null,
    nome varchar(50) not null,
    data_nascimento date,
    primary key(id_autor),
    origem varchar(50)
);

create table autor_livro(
    autor_livro int not null auto_increment,
    id_autor int not null,
    id_livro int not null ,
    primary key(autor_livro),
    FOREIGN key (id_livro) REFERENCES livro(id_livro),
    FOREIGN key (id_autor) REFERENCES autor(id_autor)
);


)
