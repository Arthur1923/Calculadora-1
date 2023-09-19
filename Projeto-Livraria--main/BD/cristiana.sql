create table cliente(
    id_cliente int,
    nome varchar(200),
    numero_telefone varchar(11),
    cpf varchar(11),
    bairro varchar(50),
    rua varchar(50),
    cidade varchar(50),
    estado varchar(50),
    complemento varchar(50)
);

create table pedido(
    cod_venda_id int,
    data_venda datetime<
    unidades int,
    valor_da_venda float
);

create table estoque(
    id_livro int,
    quantidade int,
    custo_unitario float
);

create  table compra(
    id_compra int,
    quantidade int
    data_compra datetime,
    id_fornecedor_FK int
);
create table fornecedor(
    id_fornecedor_ int,
    nome_editora varchar(50),
    bairro(50),
    cnpj varchar(14),

)
