<?php
/*
Pontos gerados por compra referente ao valor financeiro
bonus serão descontos gerados pelo sistema.
100-300 pontos - 10%
301-500 pontos - 15%

*/
    class ClienteVip extends Cliente {
        public $pontos; 
        public $desconto;//0.10 - 0.15
        // public $bonus;
        

        public function expiraPontos($pontos){
            $this->pontos=$this->pontos-$pontos;
            $this->aplicaDesconto();
            $this->mostraVip();
            
        }
       
    
        //parametro é só quando for receber uma coisa de fora da classe, para comparar com outra classe
        public function SomaPontos($pontos){
            $this->pontos = $this->pontos+$pontos;
            $this->aplicaDesconto();
            $this->mostraVip();
        }
        public function PrimeiroDesconto(){

        if($this->pontos>=100 && $this->pontos<=300){
            $this->desconto=0.1;
        } else {
            if($this->pontos>=301){
                $this->desconto=0.15;
                } else {
                    if($this->pontos<100);
                    $this->desconto=0;
        }
        }
        }
    
        public function mostrarVip()
        {
         echo 'pontos'.$this->pontos.'<br>';
         echo 'desconto'.$this->desconto.'<br>';
        }
        public function mostrarDados(){
            //parent trás a herança da tabela pai.
            parent::mostrarDados();
            echo 'Pontos'.$this->pontos.'<br>';
            echo 'Desconto'.$this->desconto.'<br>';
        }
      
    }