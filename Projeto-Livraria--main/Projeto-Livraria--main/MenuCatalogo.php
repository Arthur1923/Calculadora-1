<?php 
$menu[] = array("index.php", "Pagina Inicial","<a href=index.php>");
$menu[] = array("Carrinho.php", "Carrinho", "<a href=Carrinho.php>");
$menu[] = array("Cadastro.php", "<img src=\"user.jpg\" width=\"50\" />","<a href=Cadastro.php>");
?>

<nav>
    <?php 
    for($i = 0; $i < count($menu); $i++) {
        
        echo "<a class=\"navegacao\" href=\"".$menu[$i][0]."\">".$menu[$i][1]."</a>";
    }

?>
</nav>