<!DOCTYPE html>
<html>
<head>
	<title>Carrinho de Compras - Livraria</title>


<style> head{
	box-sizing: border-box;
    background-color: rgb(255, 255, 255);
}

body {
	margin: 0;
	padding: 0;
	font-family: Arial, sans-serif;
}

header {
	background-color: #fcc307;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

h1 {
	margin: 10;
}

nav {
        text-align: center;
        margin-top: -10px;
        margin-left: 900px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      nav a {
        color: rgb(0, 0, 0);
        text-decoration: none;
        padding: 0px 50px 10px 0px;
        font-size: 30px;
        position: relative;
      }
      nav a::after {
        content: "";
        width: 10%;
        height: 0px;
        background-color: rgb(0, 0, 0);
        position: absolute;
        top: 0;
        left: 0;
        transition: 0.2s ease-in;
      }
      nav a:hover::after {
        width: 100%;
      }

main {
	max-width: 800px;
	margin: 50px ;
	padding:0
}
table {
        border-collapse: collapse;
        width: 100%;
      }
	</style>


</head>
<body>
	<header>
		<h1><img src = "livros.png" width ="40"/>Livraria</h1>
		<div>
            <nav>
              <a href="CatalogodeLivros.html">catalogo</a>
              <a href="pagina-lista-desejos.html">desejos</a>
              <a href="pagina-meus-pedidos.html">Pedidos</a>
              <a href="contato.html">contato</a>
              <a href="pagina-cadastro.html"><img src="user.jpg" width="50" /></a>
            </nav>
          </div>
	</header>
	<main>
		
		<h1><img src = "carrinhodecompras.png" width ="60"/> Carrinho de Compras</h1>
	    
		<table>
			<thead>
				<tr>
					<th>Produto</th>
					<th>Quantidade</th>
					<th>Preço Unitário</th>
					<th>Preço Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="product-info">
						<img src="MemoriasPos.jpg" alt="Memorias Postumas de Bras Cubas - Quadrinhos"  width ="200"> 
						<div>
							<h3>Memorias Postumas de Bras Cubas - Quadrinhos</h3>
							<p>Autor: Machado de Assis</p>
					
						</div>
					</td>
					<td class="quantity"><input type="number" value="1"></td>
					<td class="unit-price">R$ 29,90</td>
					<td class="total-price">R$ 29,90</td>
				</tr>
				<tr>
					<td class="product-info">
						<img src="GrandeSertao.jpg" width="200" alt="Grande Sertao: Veredas">
						<div>
							<h3>Grande Sertao: Veredas</h3>
							<p>Autor: Joao Guimaraes Rosa</p>
						
						</div>
					</td>
					<td class="quantity"><input type="number" value="2"></td>
					<td class="unit-price">R$ 39,90</td>
					<td class="total-price">R$ 79,80</td>
				</tr>
			</tbody>
		</table>
		<div class="cart-total">
			<p>Total: R$ 109,70</p>
			<a href="#">Finalizar Compra</a>
		</div>
	</main>
	<footer>
		<p>&copy; 2023 - Livraria</p>
	</footer>
</body>
</html>