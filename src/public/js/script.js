// Variáveis globais
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// A variável 'allProducts' é inicializada no arquivo index.ejs (injetada pelo servidor).

// --- FUNÇÕES DE AUTENTICAÇÃO E MODAIS ---
function openAuthModal() { document.getElementById('authModal').style.display = 'block'; }
function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }
function switchTab(tabName){
    document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
    // Encontra o botão pelo atributo e adiciona a classe 'active'
    document.querySelector(`.auth-tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
    document.getElementById(tabName === 'login' ? 'loginForm' : 'registerForm').classList.add('active');
}
function togglePassword(inputId){
    const i=document.getElementById(inputId);
    i.type=i.type==='password'?'text':'password';
}

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

// --- LÓGICA DE LOGIN E UI ---
function updateUserUI(user) {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');

    if (user && user.nome) {
        if(loginBtn) loginBtn.style.display = 'none';
        if(userMenu) {
            userMenu.style.display = 'block';
            userMenu.querySelector('#userAvatar').textContent = user.nome.charAt(0).toUpperCase();
        }
    } else {
        if(loginBtn) loginBtn.style.display = 'block';
        if(userMenu) userMenu.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('user');
    updateUserUI(null);
    window.location.reload();
}

function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const loggedUser = JSON.parse(localStorage.getItem('user'));
    updateUserUI(loggedUser);

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginPassword').value;

            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.usuario));
                updateUserUI(data.usuario);
                closeAuthModal();
            } else {
                alert(data.message);
            }
        });
    }

    if(registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const telefone = document.getElementById('registerPhone').value;
            const senha = document.getElementById('registerPassword').value;
            const confirmSenha = document.getElementById('confirmPassword').value;

            if (senha !== confirmSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, telefone, senha })
            });

            const data = await response.json();
            if (data.success) {
                alert('Cadastro realizado com sucesso! Faça o login.');
                switchTab('login');
            } else {
                alert(data.message);
            }
        });
    }
});
// (Adicione esta função dentro de script.js)

function showOrders() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
        window.location.href = `/pedido/meus-pedidos/${user.id}`;
    } else {
        alert('Faça login para ver seus pedidos.');
        openAuthModal();
    }
}
// Fecha modais ao clicar no fundo
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal') || event.target.classList.contains('auth-modal')) {
        closeCart();
        closeAuthModal();
    }
});