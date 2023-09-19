<?php
class endereco{
    public $cep;
    public $rua;
    public $numero;
    public $bairro;
    public $estado;

//uma função para mostrar os dados 
    public function mostraDados(){
        echo 'Rua:',$this->rua;
        echo 'numero',$this->numero;
        echo 'bairro', $this->bairro;
        echo 'estado', $this->estado;
        echo 'cep', $this->cep;
    }
        
         


}