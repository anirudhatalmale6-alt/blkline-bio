const WHATSAPP_NUMBER = '61494749909';

const PRODUCTS = [
  { id: 1, name: 'BPC-157', category: 'Recovery', price: 89.99, currency: 'AUD', badge: 'Popular', desc: 'Body Protection Compound. Supports tissue repair and gut health recovery.', specs: { 'Purity': '99%+', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 2, name: 'TB-500', category: 'Recovery', price: 79.99, currency: 'AUD', desc: 'Thymosin Beta-4 fragment. Supports cellular repair and flexibility.', specs: { 'Purity': '99%+', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 3, name: 'GHK-Cu', category: 'Anti-Aging', price: 94.99, currency: 'AUD', badge: 'New', desc: 'Copper peptide complex. Supports skin remodeling and collagen synthesis.', specs: { 'Purity': '98%+', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 4, name: 'CJC-1295', category: 'Performance', price: 109.99, currency: 'AUD', desc: 'Growth hormone releasing hormone analog. Supports GH secretion research.', specs: { 'Purity': '99%+', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },
  { id: 5, name: 'Ipamorelin', category: 'Performance', price: 84.99, currency: 'AUD', desc: 'Selective GH secretagogue peptide. Clean growth hormone pulse support.', specs: { 'Purity': '99%+', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },
  { id: 6, name: 'PT-141', category: 'Wellness', price: 74.99, currency: 'AUD', desc: 'Melanocortin receptor agonist. For wellness and vitality research applications.', specs: { 'Purity': '98%+', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 7, name: 'Selank', category: 'Cognitive', price: 69.99, currency: 'AUD', desc: 'Synthetic peptide analog of tuftsin. Supports cognitive and anxiolytic research.', specs: { 'Purity': '98%+', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 8, name: 'Epithalon', category: 'Anti-Aging', price: 99.99, currency: 'AUD', desc: 'Tetrapeptide for telomerase activation research. Longevity and cellular aging studies.', specs: { 'Purity': '99%+', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },
];

let cart = JSON.parse(localStorage.getItem('blkline_cart') || '[]');

const vialSVG = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="22" y="8" width="20" height="8" rx="2"/><rect x="18" y="16" width="28" height="40" rx="4"/><line x1="18" y1="36" x2="46" y2="36" opacity=".3"/><circle cx="32" cy="46" r="4" opacity=".2"/></svg>`;

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function saveCart() {
  localStorage.setItem('blkline_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty, currency: product.currency });
  }
  saveCart();
  showToast(`${product.name} added to cart`);
  renderCartItems();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCartItems();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCartItems();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    if (totalEl) totalEl.textContent = '$0.00';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${vialSVG}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} ${item.currency}</div>
        <div class="cart-item-qty">
          <button onclick="updateQty(${item.id},-1)">&minus;</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&#x2715;</button>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function renderProducts(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map(p => `
    <div class="product-card fade-up" onclick="goToProduct(${p.id})">
      <div class="product-image">
        ${vialSVG}
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price"><span class="currency">$</span>${p.price.toFixed(2)} <span class="currency">${p.currency}</span></div>
          <button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
  observeFadeUp();
}

function goToProduct(id) {
  window.location.href = `pages/product.html?id=${id}`;
}

function goToCheckout() {
  if (cart.length === 0) return;
  closeCart();
  window.location.href = window.location.pathname.includes('/pages/') ? 'checkout.html' : 'pages/checkout.html';
}

// Header scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// Scroll animations
function observeFadeUp() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  observeFadeUp();

  const featuredContainer = document.getElementById('featuredProducts');
  if (featuredContainer) {
    renderProducts('featuredProducts', PRODUCTS.slice(0, 4));
  }

  const allContainer = document.getElementById('allProducts');
  if (allContainer) {
    renderProducts('allProducts', PRODUCTS);
  }
});
