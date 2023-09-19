create database livraria;

create table livro (
    id_livro int not null auto_increment primary key,
    nome_livro varchar (200),
    titulo varchar (200),
    descricao varchar (200),
    genero varchar (200),
    idioma varchar (50),
    data_lancamento date
    );

create table clientes(
    id_cliente int auto_increment primary key,
    nome_cliente varchar (200),
    telefone varchar(50),
    cnpj varchar (50),
    estado varchar (50),
    cidade varchar (50),
    bairro varchar (50),
    rua varchar (50),
    complemento varchar (200)
    data_de_inclusao datetime
);


create table pedidos (
    pedido_id int auto_increment primary key,
    id_livro int 
    vendedor varchar (50),
    data_pedido datetime,
    quantidade int,
    valor_pedido float,
    foreign key (id_livro_fk) references livros(id_livro)
);

create table compras (
   id_compra int auto_increment primary key,
   quantidade int,
   nome_livro varchar (50),
   data_compra datetime,
   nome_fornecedor varchar (50),
   valor_compra float,
   comprador varchar (50));

create table fornecedor (
    fornecedor_id int auto_increment primary key,
    nome_editora varchar (50),
    cnpj varchar (50),
    estado varchar (50),
    cidade varchar (50),
    bairro varchar (50),
    rua varchar (50),
    complemento varchar (50),
    data_de_inclusao datetime
);

create table autor (
        id_autor int auto_increment primary key,
        nome varchar (50),
        data_de_nascimento datetime

)


/*  19/04/2023 --- ABAIXO COMANDOS USADOS NA AULA DO DIA NO BANCO DE DADOS*/

insert into autor (id_autor,nome,data_nascimento,origem) values 
(null,'Machado de Assis','1869-06-16','Rio de Janeiro');
-------------------------------------------------------

insert into livro (id_livro,nome_livro,titulo,genero,idioma,data_lancamento) VALUES
(null,'Dom Casmurro','Dom Casmurro','Romance','Portugues','1899-01-01'),
(null,'Grande Sertao: Veredas','Grande Sertao: Veredas','Romance','Portugues','1956-01-01'),
(null,'Memorias Postumas de Bras Cubas','Memorias Postumas de Bras Cubas','Romance','Portugues','1881-01-01')





---------------ALTERAÇÕES DA AULA DO DIA 26/04/2023-----------

create table vendedor(
id_vendedor int primary Key auto_increment,
nome varchar(50),
Sobrenome varchar(50),
telefone varchar(50)
)

insert into vendedor values (null,"Cris","de Souza",'5511963524171');
insert into vendedor values (null,"Makolin","Cardoso",'5511963524171');



create table endereco(
    id_endereco int primary key auto_increment,
    Rua varchar(50),
    bairro varchar(50),
    numero_endereco varchar(50),
    cidade varchar(50),
    estado varchar(50),
    complemento varchar(50))

    insert into endereco values 
    (null,"Barao Antonio de Angra","Apura","90","Sao Paulo","Sao Paulo"."Casa 11");

    -----------= Alterações feitas no dia 03/05/2023 --------------------------


 insert into endereco values 
 (null,'Rua Barao Antonio de Angra','JD Bandeirantes','90','Sao Paulo','Sao Paulo','Casa 11');



----------------------------------------------------------------------------------------------I
-----Para a pagina contato ---------------
INSERT INTO FaleConosco (NOME,EMAIL,MENSAGEM) VALUES 
('MAKOLIN','makolincardoso@gmail.com','Olá')


------- para a pagina de Livros Disponiveis------ 

select titulo,autor,anoLançamento,valor
from livros

-------  para a tela de login do site --------

------Cadastro------------
insert into TbLogin (Email,Senha) values
('makolincardoso@gmail')

------Login----------------
select Email, senha 
from TbLogin




