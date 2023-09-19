<!DOCTYPE html>
<html lang="pt-br">
<head>
    <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">    
            <link rel="stylesheet" href="cadastro.css">
    </div> 
        <meta charset="UTF-8">
    <title>cadastro</title>

</head>

<body>
   
  <div>
      <div class="header">
         
            <p class="container-lg"> <img class="img" src="livros.png" width="100">Casa dos livros </p>
            <?php include "menuCadastro.php"; ?>
     </div>
  </div>
    <div class="container mt-3">
        <div class="row">        
          <div class="col-4"> </div>
        <div class="col-4">
            <form action="insertUsuarios.php" method="post">
          <label for="" class="form-label">Usuario</label>  
          <input type="text" name="usuario" id="" class="form-control">
         
          <label for="" class="form-label">Senha</label>
           <input type="text" name="senha" id="" class="form-control">
           <input type="submit" value="Enviar" class="mt-3 btn btn-success">
        </form></div>
        <div class="col-4">

        </div>
      </div>
    </div>     
        <div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>

        </div>
</body>

</html>