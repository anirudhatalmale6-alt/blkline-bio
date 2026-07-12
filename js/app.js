const WHATSAPP_NUMBER = '61494749909';
const STRIPE_PK = 'pk_live_51ThGscGuF9J8lg77XDgADgprKDcOLIrYK2XI8W9BrHFfH5CP49O9D4s3idRu6BFYO9DgTxyIjIlgS2GuDKsqjetM00GxrmBOaz';
const API_BASE = 'https://app.factukey.com/blkline-stripe';

var PRODUCTS = [];

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
  if (product.stock <= 0) {
    showToast('This product is coming soon');
    return;
  }
  const existing = cart.find(item => item.id === productId);
  const currentQty = existing ? existing.qty : 0;
  if (currentQty + qty > product.stock) {
    showToast(`Only ${product.stock} left in stock`);
    return;
  }
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
  const product = PRODUCTS.find(p => p.id === productId);
  const newQty = item.qty + delta;
  if (newQty < 1) return;
  if (product && newQty > product.stock) {
    showToast(`Only ${product.stock} left in stock`);
    return;
  }
  item.qty = newQty;
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

  container.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    const imgPath = product && product.image ? getImagePath(product) : '';
    return `
    <div class="cart-item">
      <div class="cart-item-img">${imgPath ? `<img src="${imgPath}" alt="${item.name}">` : vialSVG}</div>
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
    </div>`;
  }).join('');

  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function getImagePath(p) {
  if (!p.image) return '';
  if (p.image.startsWith('http') || p.image.startsWith('uploads/')) {
    return p.image.startsWith('uploads/') ? API_BASE + '/' + p.image : p.image;
  }
  const isSubpage = window.location.pathname.includes('/pages/');
  return isSubpage ? '../' + p.image : p.image;
}

function renderProducts(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map(p => {
    const outOfStock = p.stock <= 0;
    const lowStock = p.stock > 0 && p.stock <= 3;
    const imgPath = getImagePath(p);
    return `
    <div class="product-card fade-up ${outOfStock ? 'out-of-stock' : ''}" onclick="goToProduct(${p.id})">
      <div class="product-image">
        ${p.image ? `<img src="${imgPath}" alt="${p.name}" loading="lazy">` : vialSVG}
        ${p.badge === 'Coming Soon' && outOfStock ? `<span class="product-badge badge-soon">${p.badge}</span>` : p.badge && p.badge !== 'Coming Soon' ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          ${outOfStock
            ? `<div class="product-price" style="color:var(--silver-dark)">Coming Soon</div><button class="btn-add btn-soon" disabled>Coming Soon</button>`
            : `<div class="product-price"><span class="currency">$</span>${p.price.toFixed(2)} <span class="currency">${p.currency}</span></div><button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id})">Add to Cart</button>`
          }
        </div>
        ${lowStock ? `<div class="stock-low">Only ${p.stock} left</div>` : ''}
      </div>
    </div>
  `}).join('');
  observeFadeUp();
}

function goToProduct(id) {
  const isSubpage = window.location.pathname.includes('/pages/');
  window.location.href = isSubpage ? `product.html?id=${id}` : `pages/product.html?id=${id}`;
}

function goToCheckout() {
  if (cart.length === 0) return;
  closeCart();
  window.location.href = window.location.pathname.includes('/pages/') ? 'checkout.html' : 'pages/checkout.html';
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

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

function applyLiveStock(stockData) {
  PRODUCTS.forEach(p => {
    if (stockData[p.name] !== undefined) p.stock = stockData[p.name];
  });
}

function renderAllProducts() {
  const featuredContainer = document.getElementById('featuredProducts');
  if (featuredContainer) {
    // Anything badged "Best Seller" is pinned to the front of the featured row.
    const inStock = PRODUCTS.filter(p => p.stock > 0);
    const isBestSeller = p => (p.badge || '').toLowerCase().includes('best');
    const featured = inStock.filter(isBestSeller).concat(inStock.filter(p => !isBestSeller(p)));
    renderProducts('featuredProducts', featured.slice(0, 4));
  }
  const allContainer = document.getElementById('allProducts');
  if (allContainer) {
    renderProducts('allProducts', PRODUCTS);
  }
}

// Kicked off at load, not on DOMContentLoaded, so pages can await PRODUCTS before
// reading it. Anything depending on PRODUCTS (e.g. checkout's shipping rules) must
// wait on this — otherwise PRODUCTS is still empty and the lookup silently fails.
var PRODUCTS_READY = fetch(API_BASE + '/products')
  .then(r => r.json())
  .then(products => {
    PRODUCTS = products;
    PRODUCTS.forEach(p => { if (p.stock === undefined) p.stock = 0; });
    return fetch(API_BASE + '/stock');
  })
  .then(r => r.json())
  .then(stockData => {
    applyLiveStock(stockData);
  })
  .catch(() => {});

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  observeFadeUp();
  PRODUCTS_READY.then(() => renderAllProducts());
});
