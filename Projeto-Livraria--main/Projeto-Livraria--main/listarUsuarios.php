<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  </head>
  <body>

<?php 
include 'Dao.php';
$dao = new Dao();
$resultado = $dao->listaUsuarios();
?>
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">usuario</th>
      <th scope="col">senha</th>
    </tr>
  </thead>
  <tbody>

<?php
while($usuario = $resultado->fetch()){
?>
    <tr>
      <td><?php echo $usuario['usuario']?></td>
      <td><?php echo $usuario['senha']?></td>
    </tr>
   
<?php
}
?>
  </tbody>
</table> 


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
  </body>
</html>