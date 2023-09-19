<?php
$slides[] = array("Dom casmurro" ,"dom-casmurro.jpg","<p class=container-lg> width=100 Casa dos livros </p>");
$slides[] = array("Mordida ", "mordida.png");
?>
<div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <?php
    for($i = 0; $i < count($slides); $i++) {
    ?>
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="<?php echo $slides[$i][1] ?>" class="d-block w-100" class="tamanho " alt=""><br><br>

  
    </div>

    <?php    }
 ?>
     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>

  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
</div>