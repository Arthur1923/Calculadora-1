<?php
include_once 'pessoa.php';
include_once 'endereco.php';
include_once 'pessoa';


//cria um objeto para ser armazenado numa variavel, são executado com memórias, podem ser usados vários objetos para uma classe
    $obj_pessoa = new pessoa ();
    $obj->endereco = $obj_end;
echo "endereco:". $obj-> endereco->rua  ;
    $obj_end = new endereco();
    $obj_end = ->cep= '';
    $obj_end = ->rua= 'Rua quarani';
    $obj_end = ->numero= 735;
    $obj_end = ->bairro='Serraria';
    $obj_end = ->cidade 'Diadema';
    $obj_end = ->estado 'São paulo';



    $obj2_pessoa = new pessoa();
    $obj_pessoa ->cpf = 1234567 ;


 //para atribuir algo ao nome
    $obj_pessoa ->nome= "tio Patinhas";


    $obj2_pessoa  ->nome ="Pato donald";
    $obj_pessoa ->endereco ="olav bilac 234";


 //para mostrar o nome da pessoa se usa o echo, o objeto leva sifrão, mas não o atributo
    echo $obj_pessoa ->nome; 


    echo $obj2_pessoa ->nome;
    $obj_pessoa->idade = 80;

    $obj_pessoa->cadastrarCpf(32313246532);
    $obj_pessoa->mostrarcpf();
    $cliente1 = new cliente();
    
?>
    <?php
    include_once 'cliente.php'
    include_once 'clienteVip.php'

                        //o espaço entre parênteses representa um método para contruir um titulo para o objeto.
    $cliente = new cliente(1, 'tio patinhas');
    $clienteVip1 = new ClienteVip(0,'Papaleguas') 
   
    $clienteVip1->mostraDados();
    $clienteVip1->mostrarVip(50);
    $clienteVip1->somaPontos(50);
    $clienteVip1->expiraPontos(50);

 
    
