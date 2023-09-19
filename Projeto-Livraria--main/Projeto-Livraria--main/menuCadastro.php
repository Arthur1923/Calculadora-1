<?php 
$menu[] = array("index.php", "Pagina Inicial", "<a href=index.php>");
$menu[] = array("Carrinho.php", "Carrinho", "<a href=Carrinho.php>");
$menu[] = array("catalogo.php", "catalogo", "<a href=catalogo.php>");
?>

<nav>
    <?php 
    for($i = 0; $i < count($menu); $i++) {
        
        echo "<a class=\"navegacao\" href=\"".$menu[$i][0]."\">".$menu[$i][1]."</a>";
    }

?>
</nav>