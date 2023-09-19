<?php
$dsn = "mysql:host=localhost;dbname=projetolivraria";
$username = "projetolivraria";
$password = "projetolivraria";
//tag para contrução
//dsn data sourse name(onde o banco de dados está)
//username usuário para login
//password senha 
$pdo = new PDO($dsn, $username, $password);

$stmt = $pdo->query("SELECT *FROM  aluno");
while ($aluno = $stmt->fetch()){
    echo $aluno ['nome'] . "-" .$aluno['email']."<br>";
}