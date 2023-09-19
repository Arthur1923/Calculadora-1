<?php
//cada classe tem seu arquivo//
class Pessoa {
    private $cpf;
    public $nome;
    public $idade;
    public $endereço;
    public $telefone;
    public $email;
    public $cargo;
    public $codigoFunc;
    public $depto;
    public $salario;
    public $cep;

    

    public function cadastrarCpf($cpf){
        //valida cpf, para fazer referencias de arquivos e atributos de uma mesma pasta, deve-se utilizar o prefixo (THIS)
        
        echo "CPF valido";
        $this->$cpf=$cpf;
    }
        public function mostrarCpf(){
            echo '<br>CPF: '.$this->cpf;
        }
      
        
    
    
}