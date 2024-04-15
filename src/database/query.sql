create database amandiitta_store;
-- drop table usuarios;
-- drop table clientes;
-- drop table estoque;
-- drop table pedidos;
-- drop table fornecedores;

create table usuarios
(
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table clientes
(
  id serial primary key,
  nome text not null,
<<<<<<< HEAD
=======
  email text not null unique,
  endereco text not null,
>>>>>>> release
  telefone text not null unique
);

create table produtos
(
  id serial primary key,
  descricao text not null,
  qtd_estoque int not null,
  valor numeric not null,
  imagem text,
  fornecedor_id int not null references fornecedores(id)
);

create table pedidos
(
  id serial primary key,
  data timestamp,
  produto_qtd int not null,
  produto_id int not null references estoque(id),
  pagamento_tipo char(50) not null,
  cliente_id int not null references clientes(id),
  pedido_status char(50) not null
);

create table fornecedores
(
  id serial primary key,
  nome_fornecedor char(50),
  email text not null,
  endereco text not null,
  telefone text not null unique
)
