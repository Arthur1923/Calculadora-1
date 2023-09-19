<?php
include_once 'pessoa';
//extends, significa que a classe cliente erda todos os atributos da classe pessoa
class cliente extends pessoa {
     public $codCliente;

    public function _construct($numeroCliente, $nomeCliente)
    {
       // é usado para comparar os métodos da própria classe $this->
       $this->codCliente =$numeroCliente;
       $this->nome= $nomeCliente;
    }
}
