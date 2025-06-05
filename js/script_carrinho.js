// Recupera carrinho ou inicia novo
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.qtd += 1;
    } else {
        carrinho.push({ nome, preco, qtd: 1 });
    }
    salvarCarrinho();
    alert(`${nome} adicionado ao carrinho!`);
}

function configurarBotoesComprar() {
    const botoes = document.querySelectorAll('.btn.btn-primary');
    if (botoes.length === 0) return; // Verifica se há botões

    botoes.forEach(botao => {
        botao.addEventListener('click', function () {
            const card = this.closest('.card');
            const nome = card.querySelector('.card-title').textContent;
            const precoTexto = card.querySelector('.price').textContent.replace('R$', '').replace(',', '.').trim();
            const preco = parseFloat(precoTexto);
            adicionarAoCarrinho(nome, preco);
        });
    });
}

function mostrarCarrinho() {
    const tabela = document.querySelector('tbody');
    const totalEl = document.querySelector('.total');

    if (!tabela) return;

    let html = '';
    let subtotal = 0;

    carrinho.forEach(item => {
        const totalItem = item.preco * item.qtd;
        subtotal += totalItem;

        html += `
                <tr>
                    <td>${item.nome}</td>
                    <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
                    <td><input type="number" class="form-control" value="${item.qtd}" min="1" data-nome="${item.nome}" /></td>
                    <td>R$ ${totalItem.toFixed(2).replace('.', ',')}</td>
                </tr>
            `;
    });

    tabela.innerHTML = html;
    if (totalEl) totalEl.textContent = `Total: R$ ${(subtotal + 15).toFixed(2).replace('.', ',')}`;
}

// Atualiza quantidade direto do input (se quiser)
function escutarMudancaQuantidade() {
    document.addEventListener('change', (e) => {
        if (e.target.matches('input[type="number"][data-nome]')) {
            const nome = e.target.dataset.nome;
            const novaQtd = parseInt(e.target.value);
            const item = carrinho.find(i => i.nome === nome);
            if (item && novaQtd > 0) {
                item.qtd = novaQtd;
                salvarCarrinho();
                mostrarCarrinho();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    configurarBotoesComprar();     // só funciona se tiver produtos na página
    mostrarCarrinho();            // só funciona se for a página do carrinho
    escutarMudancaQuantidade();   // permite alterar quantidades direto no input
});