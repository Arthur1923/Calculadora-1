<?php 
$menu[] = array("index.php", "Pagina Inicial", "<a href=index.php>");
$menu[] = array("catalogo.php", "Catalogo", "<a href=catalogo.php>");
$menu[] = array("Cadastro.php", "<img src=\"user.jpg\" width=\"50\" />","<a href=Cadastro.php>");
?>

<nav>
    <?php 
    for($i = 0; $i < count($menu); $i++) {
        
        echo "<a class=\"navegacao\" href=\"".$menu[$i][0]."\">".$menu[$i][1]."</a>";
    }

    
?>
</nav>