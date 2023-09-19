vetores 
<?php

$lista =array('leonardo','michelangelo','donatelo','zafael');
echo "vetor lista:";
$lista[5] = 'van gogh:';
$lista[] = 10;
//pega a ultima posição livre//
unset($lista[0]);// tira um item do vetor em cochetes//


$alunos['aluno1'] = array('nome'=>'Leonardo','telefone'=>'0000-9999');//cria um vetor dentro de um vetor//
$alunos['alunos2']['nome'] = "michelangelo";//outra maneira de criar um vetor//
$alunos['alunos2']['telefone'] = '8888-8888';
$alunos['aluno3'] = "Donatelo";
$anulos['aluno4'] = "rhafael";

var_dump($alunos);

echo $alunos['aluno1']['nome'];


//vetor com os dados, basicamente repete uma linha de comando selecionada em for, para que os comandos sejam executados varias veses sem ter que escrever//


$links[]=array('link' =>'www.etecjk.com','descricao'=>'site da escola');
$links[]=array('link' =>'www.cps.gov.br','descricao'=>'site da instituicao');
$links[]=array('link' =>'www.google.com','descricao'=>'navegador');

for($i=0;$i<count($links);$i++){
    echo"<br><a href=\"".$links[$i]['link']."\">".$links[$i]['descricao']."</a><br>"; }
?>