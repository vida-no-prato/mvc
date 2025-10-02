// Variáveis globais
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// A variável 'allProducts' é inicializada no arquivo index.ejs (injetada pelo servidor).

// --- FUNÇÕES DE AUTENTICAÇÃO E MODAIS ---
function openAuthModal() { document.getElementById('authModal').style.display = 'block'; }
function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }
function switchTab(tabName){
    document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
    document.getElementById(tabName === 'login' ? 'loginForm' : 'registerForm').classList.add('active');
}
function togglePassword(inputId){
    const i=document.getElementById(inputId);
    i.type=i.type==='password'?'text':'password';
}
// etc... Mantenha suas outras funções de UI aqui.

// --- LÓGICA DE PRODUTOS E FILTROS ---

function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (category === 'todos' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// --- LÓGICA DO CARRINHO ---

function addToCart(productId, btn) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    btn.disabled = true;
    btn.textContent = 'Adicionado!';
    btn.style.background = '#2e7d32';
    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Adicionar';
        btn.style.background = '';
    }, 1200);
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (count > 0) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = 'flex';
    } else {
        cartCountEl.style.display = 'none';
    }
}

/**
 * ATUALIZAÇÃO PRINCIPAL AQUI
 * Abre o modal do carrinho e exibe os itens usando as propriedades corretas.
 */
function openCart() {
    const modal = document.getElementById('cartModal');
    const itemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    let total = 0;

    itemsEl.innerHTML = ''; 
    if (cart.length === 0) {
        itemsEl.innerHTML = '<p style="text-align:center; padding: 20px; color: #666;">Seu carrinho está vazio</p>';
    } else {
        cart.forEach(item => {
            // CORREÇÃO: Usando Number(item.preco) e item.nome
            const itemTotal = Number(item.preco) * item.quantity;
            total += itemTotal;
            itemsEl.innerHTML += `
                <div class="cart-item">
                    <div><strong>${item.nome}</strong><br><small>Qtd: ${item.quantity}</small></div>
                    <strong>R$ ${itemTotal.toFixed(2).replace('.', ',')}</strong>
                </div>`;
        });
    }

    totalEl.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    modal.style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    window.location.href = '/checkout';
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // Adicione aqui os event listeners dos formulários de login/registro
});

// Fecha modais ao clicar no fundo
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeCart();
        closeAuthModal();
    }
});