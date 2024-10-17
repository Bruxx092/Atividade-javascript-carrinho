const produtosDisponiveis = [
  { nome: "Bala", preco: 50, estoque: 10 },
  { nome: "Bola Quadrada", preco: 50, estoque: 5 },
  { nome: "Brilho", preco: 5, estoque: 15 },
  { nome: "Pirulito", preco: 3, estoque: 2 },
  { nome: "Caixa Bombom", preco: 10, estoque: 0 },
];

let carrinho = [];

function exibirProdutos() {
  const produtosDiv = document.getElementById("produtos");
  produtosDiv.innerHTML = "";
  produtosDisponiveis.forEach((produto) => {
    produtosDiv.innerHTML += `<div class="produto">${
      produto.nome
    } - R$${produto.preco.toFixed(2)} - Estoque: ${produto.estoque}</div>`;
  });
}

function buscarProduto() {
  const nome = document.getElementById("busca").value;
  const produto = produtosDisponiveis.find(
    (p) => p.nome.toLowerCase() === nome.toLowerCase()
  );
  if (produto) {
    alert(
      `Produto encontrado: ${produto.nome} - R$${produto.preco.toFixed(2)}`
    );
  } else {
    alert("Produto não encontrado.");
  }
}

function adicionarCarrinho() {
  const nome = document.getElementById("busca").value;
  const produto = produtosDisponiveis.find(
    (p) => p.nome.toLowerCase() === nome.toLowerCase()
  );
  if (produto && produto.estoque > 0) {
    carrinho.push(produto);
    produto.estoque--;
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho.`);
  } else {
    alert("Produto não disponível ou fora de estoque.");
  }
}

function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho");
  carrinhoDiv.innerHTML = "";
  let total = 0;

  carrinho
    .sort((a, b) => a.preco - b.preco)
    .forEach((item, index) => {
      carrinhoDiv.innerHTML += `
                    <div class="carrinho-item">
                        ${item.nome} - R$${item.preco.toFixed(2)} 
                        <button onclick="removerDoCarrinho(${index})">Remover</button>
                    </div>
                `;
      total += item.preco;
    });

  document.getElementById("total").innerHTML = `Total: R$${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
  const produto = carrinho[index];
  carrinho.splice(index, 1);
  produto.estoque++;
  atualizarCarrinho();
  alert(`${produto.nome} removido do carrinho.`);
}

// Inicializa a exibição de produtos
exibirProdutos();
