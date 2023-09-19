<!DOCTYPE html>
<html>
  <head>
    <title>Catalogo</title>
    <link rel="stylesheet" href="catalogo.css"> 
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">    

  </head>
  <body>

      <div class="header">
    <p class="container-lg"> <img class="img" src="livros.png" width="100">Casa dos livros </p>
      <?php include "menuCatalogo.php"; ?>
    </div>
    <section>
      <p class="fonte-oficial">Livros Disponiveis</p>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Ano de lancamento</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img style="vertical-align: middle" src="GrandeSertao.jpg" width="60" /> Grande Sertao: Veredas
            </td>
            <td>Joao Guimaraes Rosa</td>
            <td>1956</td>
            <td>189,90</td>
          </tr>
          <tr>
            <td>
              <img style="vertical-align: middle" src="MemoriasPos.jpg" width="60" /> Memorias Postumas de Bras
              Cubas - Quadrinhos
            </td>
            <td>Machado de Assis</td>
            <td>1881</td>
            <td>199,90</td>
          </tr>
          <tr>
            <td>
              <img style="vertical-align: middle" src="harrypotter.png" width="60" /> harrypotter - Reliquias da morte -
            </td>
            <td>harrypotter</td>
            <td>2017</td>
            <td>199,90</td>
          </tr>
          <tr>
            <td>
              <img style="vertical-align: middle" src="MemoriasPos.jpg" width="60" /> Memorias Postumas de Bras
              Cubas - Quadrinhos
            </td>
            <td>Machado de Assis</td>
            <td>1881</td>
            <td>199,90</td>
          </tr>
          <tr>
            <td>
              <img style="vertical-align: middle" src="MemoriasPos.jpg" width="60" /> Memorias Postumas de Bras
              Cubas - Quadrinhos
            </td>
            <td>Machado de Assis</td>
            <td>1881</td>
            <td>199,90</td>
          </tr>
          <tr>
            <td>
              <img style="vertical-align: middle" src="MemoriasPos.jpg" width="60" /> Memorias Postumas de Bras
              Cubas - Quadrinhos
            </td>
            <td>Machado de Assis</td>
            <td>1881</td>
            <td>199,90</td>
          </tr>
        </tbody>
      </table>
    </section>     
    
    <div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    </div>
  </body>
</html>
