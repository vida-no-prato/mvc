// Product Data
const products = [
    {
        id: 1,
        name: "Salada Caesar Saudável",
        description: "Alface crocante, croutons integrais, parmesão e molho caesar light",
        price: 18.90,
        category: "saladas",
        image: "/images/Salada_Caesar_Saudavel.jpg",
        
    },
    {
        id: 2,
        name: "Bowl Proteico",
        description: "Quinoa, frango grelhado, abacate, tomate cereja e molho tahine",
        price: 24.90,
        category: "bowls",
        image: "./images/Bowl_Proteico.jpg",
        emoji: "🍲"
    },
    {
        id: 3,
        name: "Suco Verde Detox",
        description: "Couve, maçã, limão, gengibre e água de coco",
        price: 8.90,
        category: "sucos",
        image: "./images/Suco_Verde_Detox.jpg",
        emoji: "🥤"
    },
    {
        id: 4,
        name: "Wrap Vegano",
        description: "Tortilla integral com húmus, vegetais frescos e brotos",
        price: 16.90,
        category: "lanches",
        image: "./images/Wrap_Vegano.jpg",
        emoji: "🌯"
    },
    {
        id: 5,
        name: "Salada Arco-Íris",
        description: "Mix de folhas, cenoura, beterraba, pepino e vinagrete de ervas",
        price: 16.90,
        category: "saladas",
        image: "./images/Salada_Arco-Iris.jpg",
        emoji: "🌈"
    },
    {
        id: 6,
        name: "Bowl Buddha",
        description: "Batata doce assada, grão de bico, espinafre e molho de amendoim",
        price: 22.90,
        category: "bowls",
        image: "./images/Bowl_Buddha.jpg",
        emoji: "🥣"
    },
    {
        id: 7,
        name: "Smoothie Tropical",
        description: "Manga, abacaxi, coco e sementes de chia",
        price: 12.90,
        category: "sucos",
        image: "./images/Smoothie_Tropical.jpg",
        emoji: "🥭"
    },
    {
        id: 8,
        name: "Sanduíche Natural",
        description: "Pão integral, peito de peru, queijo branco, alface e tomate",
        price: 14.90,
        category: "lanches",
        image: "./images/Sanduiche_Natural.jpg",
        emoji: "🥪"
    }
];

// Global variables
let cart = [];
let currentFilter = 'todos';
let currentUser = null;

// Auth functionality
function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });

    if (tabName === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('authTitle').textContent = 'Bem-vindo de volta!';
    } else {
        document.getElementById('registerForm').classList.add('active');
        document.getElementById('authTitle').textContent = 'Crie sua conta';
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.textContent = '🙈';
    } else {
        input.type = 'password';
        toggle.textContent = '👁️';
    }
}

function showForgotPassword() {
    alert('📧 Um link de recuperação foi enviado para seu e-mail!\n\n(Esta é uma simulação - em um app real, um e-mail seria enviado)');
}

function socialLogin(provider) {
    const providerNames = {
        google: 'Google',
        facebook: 'Facebook'
    };
    
    // Simulate social login
    setTimeout(() => {
        const userData = {
            name: 'Usuário ' + providerNames[provider],
            email: 'usuario@' + provider + '.com',
            avatar: providerNames[provider][0]
        };
        
        loginUser(userData);
        alert(`✅ Login realizado com sucesso via ${providerNames[provider]}!`);
        closeAuthModal();
    }, 1500);
}

function loginUser(userData) {
    currentUser = userData;
    
    // Hide login button and show user menu
    document.querySelector('.login-btn').style.display = 'none';
    const userMenu = document.getElementById('userMenu');
    userMenu.style.display = 'block';
    
    // Update user avatar
    const avatar = document.getElementById('userAvatar');
    avatar.textContent = userData.name[0].toUpperCase();
    avatar.title = userData.name;
}

function logout() {
    currentUser = null;
    
    // Show login button and hide user menu
    document.querySelector('.login-btn').style.display = 'block';
    document.getElementById('userMenu').style.display = 'none';
    document.getElementById('userDropdown').style.display = 'none';
    
    alert('👋 Você foi desconectado com sucesso!');
}

function toggleDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function showProfile() {
    alert('👤 Funcionalidade "Meu Perfil" em desenvolvimento!');
    document.getElementById('userDropdown').style.display = 'none';
}

function showOrders() {
    alert('📦 Funcionalidade "Meus Pedidos" em desenvolvimento!');
    document.getElementById('userDropdown').style.display = 'none';
}

function showFavorites() {
    alert('❤️ Funcionalidade "Favoritos" em desenvolvimento!');
    document.getElementById('userDropdown').style.display = 'none';
}

// Display products
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToShow.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.name}"/>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Adicionar
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
        
        // Add entrance animation
        setTimeout(() => {
            productCard.style.animation = 'slideInUp 0.6s ease forwards';
        }, index * 100);
    });
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display products
    const filteredProducts = category === 'todos' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();

    // Visual feedback com intervalos claros
    const btn = event.target;
    btn.innerHTML = '<div class="loading"></div>';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = 'Adicionado!';
        btn.style.background = '#4caf50';

        setTimeout(() => {
            btn.innerHTML = 'Adicionar';
            btn.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
            btn.disabled = false;
        }, 1000);
    }, 700); // loader visível por 700ms
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    
    if (count > 0) {
        document.getElementById('cartCount').style.display = 'flex';
    } else {
        document.getElementById('cartCount').style.display = 'none';
    }
}

// Open cart modal
function openCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Display cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'Total: R$ 0,00';
    } else {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Quantidade: ${item.quantity}</small>
                </div>
                <div>
                    <strong>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</strong>
                </div>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    modal.style.display = 'block';
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutText = document.getElementById('checkoutText');
    
    checkoutText.innerHTML = '<div class="loading"></div> Processando...';
    checkoutBtn.disabled = true;

    setTimeout(() => {
        alert('Pedido realizado com sucesso! 🎉\n\nSeu pedido chegará em aproximadamente 30-45 minutos.');
        cart = [];
        updateCartCount();
        closeCart();
        
        checkoutText.textContent = 'Finalizar Pedido';
        checkoutBtn.disabled = false;
    }, 2000);
}

// Form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    displayProducts(products);
    updateCartCount();

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            alert('❌ Por favor, preencha todos os campos!');
            return;
        }
        
        // Simulate login process
        const submitBtn = this.querySelector('.auth-submit');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> Entrando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const userData = {
                name: email.split('@')[0],
                email: email,
                avatar: email[0].toUpperCase()
            };
            
            loginUser(userData);
            alert('✅ Login realizado com sucesso!');
            closeAuthModal();
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!name || !email || !phone || !password || !confirmPassword) {
            alert('❌ Por favor, preencha todos os campos!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('❌ As senhas não coincidem!');
            return;
        }
        
        if (password.length < 6) {
            alert('❌ A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Simulate registration process
        const submitBtn = this.querySelector('.auth-submit');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> Criando conta...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const userData = {
                name: name,
                email: email,
                phone: phone,
                avatar: name[0].toUpperCase()
            };
            
            loginUser(userData);
            alert('🎉 Conta criada com sucesso!\nBem-vindo ao Vida no Prato!');
            closeAuthModal();
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2500);
    });
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const authModal = document.getElementById('authModal');
    const userDropdown = document.getElementById('userDropdown');
    
    if (event.target === cartModal) {
        closeCart();
    }
    
    if (event.target === authModal) {
        closeAuthModal();
    }
    
    // Close user dropdown when clicking outside
    if (!event.target.closest('.user-menu')) {
        userDropdown.style.display = 'none';
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(46, 125, 50, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(46, 125, 50, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});