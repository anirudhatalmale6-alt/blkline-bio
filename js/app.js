const WHATSAPP_NUMBER = '61494749909';
const STRIPE_PK = 'pk_live_51ThGscGuF9J8lg77XDgADgprKDcOLIrYK2XI8W9BrHFfH5CP49O9D4s3idRu6BFYO9DgTxyIjIlgS2GuDKsqjetM00GxrmBOaz';

// =============================================
// PRODUCT DATA - Edit stock numbers here to
// update availability. Set stock to 0 to show
// "Coming Soon". Set a price when product
// becomes available.
// =============================================
const PRODUCTS = [
  // ========== WEIGHT LOSS ==========
  { id: 1, name: 'Retatrutide 10mg', category: 'Weight Loss', price: 90, currency: 'AUD', stock: 18, badge: 'Popular', stripePriceId: 'price_1ThQ2ZGuF9J8lg77WpbpGltY', image: 'images/products/retatrutide-10mg.jpg', desc: 'Triple agonist targeting GLP-1, GIP, and glucagon receptors. Advanced metabolic research compound.', specs: { 'Purity': '99%+', 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 2, name: 'Retatrutide 20mg', category: 'Weight Loss', price: 150, currency: 'AUD', stock: 13, stripePriceId: 'price_1Tn7u0GuF9J8lg77Y0DiRJL1', image: 'images/products/retatrutide-20mg.jpg', desc: 'High-dose triple agonist for extended metabolic research protocols.', specs: { 'Purity': '99%+', 'Amount': '20mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 26, name: 'Retatrutide 30mg', category: 'Weight Loss', price: 210, currency: 'AUD', stock: 10, stripePriceId: 'price_1Tn7u2GuF9J8lg77xZQSAs0v', image: 'images/products/retatrutide-30mg.jpg', desc: 'Maximum-dose triple agonist for advanced metabolic research protocols.', specs: { 'Purity': '99%+', 'Amount': '30mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 5, name: '5-Amino-1MQ 5mg', category: 'Weight Loss', price: 40, currency: 'AUD', stock: 4, stripePriceId: 'price_1ThQ2cGuF9J8lg77k7JhGDzW', image: 'images/products/5-amino-1mq.jpg', desc: 'NNMT inhibitor. Supports cellular energy metabolism and fat oxidation research.', specs: { 'Purity': '98%+', 'Amount': '5mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 21, name: '5-Amino-1MQ 10mg', category: 'Weight Loss', price: 0, currency: 'AUD', stock: 0, badge: 'Coming Soon', image: 'images/products/5-amino-1mq-10mg.jpg', desc: 'High-dose NNMT inhibitor. Double concentration for extended metabolic and fat oxidation research.', specs: { 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 23, name: 'Tesamorelin 10mg', category: 'Weight Loss', price: 0, currency: 'AUD', stock: 0, badge: 'Coming Soon', image: '', desc: 'Growth hormone-releasing hormone analog. Supports body recomposition and visceral fat reduction research.', specs: { 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },

  // ========== RECOVERY ==========
  { id: 6, name: 'BPC-157 10mg', category: 'Recovery', price: 70, currency: 'AUD', stock: 8, badge: 'Popular', stripePriceId: 'price_1ThQ2gGuF9J8lg77meOWKT3j', image: 'images/products/bpc-157.jpg', desc: 'Body Protection Compound. Supports tissue repair, gut health, and angiogenesis research.', specs: { 'Purity': '99%+', 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 7, name: 'TB-500 10mg', category: 'Recovery', price: 95, currency: 'AUD', stock: 10, stripePriceId: 'price_1Tn7uDGuF9J8lg77268J4sVn', image: 'images/products/tb-500.jpg', desc: 'Thymosin Beta-4 fragment. Supports cellular repair, flexibility, and wound healing research.', specs: { 'Purity': '98%+', 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },
  { id: 8, name: 'KPV 10mg', category: 'Recovery', price: 70, currency: 'AUD', stock: 5, stripePriceId: 'price_1Tn7u2GuF9J8lg77a7E1EDpG', image: 'images/products/kpv.jpg', desc: 'Anti-inflammatory tripeptide derived from alpha-MSH. Supports gut health and inflammation research.', specs: { 'Purity': '98%+', 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 24, name: 'CJC-1295 (no DAC) + Ipamorelin 10mg', category: 'Recovery', price: 0, currency: 'AUD', stock: 0, badge: 'Coming Soon', image: '', desc: 'Synergistic growth hormone secretagogue blend. CJC-1295 without DAC 5mg + Ipamorelin 5mg for GH release research.', specs: { 'Amount': '10mg (5mg + 5mg)', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },

  // ========== ANTI-AGING ==========
  { id: 9, name: 'GHK-Cu 50mg', category: 'Anti-Aging', price: 50, currency: 'AUD', stock: 8, stripePriceId: 'price_1ThQ2eGuF9J8lg77LWY8bq1a', image: 'images/products/ghk-cu-50mg.jpg', desc: 'Copper peptide complex. Supports skin remodeling, collagen synthesis, and wound healing research.', specs: { 'Purity': '98%+', 'Amount': '50mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 19, name: 'GHK-Cu 100mg', category: 'Anti-Aging', price: 0, currency: 'AUD', stock: 0, badge: 'Coming Soon', image: 'images/products/ghk-cu-100mg.jpg', desc: 'High-dose copper peptide complex. Double concentration for extended skin remodeling and collagen synthesis research.', specs: { 'Amount': '100mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 22, name: 'SS-31 10mg', category: 'Anti-Aging', price: 0, currency: 'AUD', stock: 0, badge: 'Coming Soon', image: 'images/products/ss-31-10mg.jpg', desc: 'Mitochondria-targeted peptide (Elamipretide). Supports mitochondrial membrane stabilization and cellular energy research.', specs: { 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },
  { id: 10, name: 'Glutathione 600mg', category: 'Anti-Aging', price: 70, currency: 'AUD', stock: 4, stripePriceId: 'price_1ThQ2YGuF9J8lg77rXKhmvEX', image: 'images/products/glutathione.jpg', desc: 'Master antioxidant. Supports detoxification, immune function, and cellular protection research.', specs: { 'Purity': '99%+', 'Amount': '600mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 11, name: 'NAD+ 500mg', category: 'Anti-Aging', price: 70, currency: 'AUD', stock: 4, stripePriceId: 'price_1ThQFVGuF9J8lg77B7VqW59P', image: 'images/products/nad-plus.jpg', desc: 'Nicotinamide adenine dinucleotide. Essential coenzyme for cellular energy and longevity research.', specs: { 'Purity': '99%+', 'Amount': '500mg', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },
  { id: 12, name: 'MOTS-c 10mg', category: 'Anti-Aging', price: 70, currency: 'AUD', stock: 5, stripePriceId: 'price_1Tn7u1GuF9J8lg77rhcA3sJ9', image: 'images/products/mots-c.jpg', desc: 'Mitochondrial-derived peptide. Supports metabolic homeostasis and exercise mimetic research.', specs: { 'Purity': '98%+', 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },

  // ========== TANNING ==========
  { id: 13, name: 'Melanotan I 10mg', category: 'Tanning', price: 60, currency: 'AUD', stock: 4, stripePriceId: 'price_1Tn7u1GuF9J8lg777sbmZ41P', image: 'images/products/melanotan-1.jpg', desc: 'Alpha-melanocyte stimulating hormone analog. Supports melanogenesis and skin pigmentation research.', specs: { 'Purity': '99%+', 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 14, name: 'Melanotan II 10mg', category: 'Tanning', price: 60, currency: 'AUD', stock: 1, stripePriceId: 'price_1Tn7u1GuF9J8lg77AlAj8ddX', image: 'images/products/melanotan-2.jpg', desc: 'Melanocortin receptor agonist. Supports tanning response and melanin production research.', specs: { 'Purity': '99%+', 'Amount': '10mg', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },

  // ========== COGNITIVE ==========
  { id: 15, name: 'Selank', category: 'Cognitive', price: 60, currency: 'AUD', stock: 10, stripePriceId: 'price_1ThQ2bGuF9J8lg77YjPbZ3kp', image: 'images/products/selank.jpg', desc: 'Synthetic tuftsin analog. Supports anxiolytic, nootropic, and immune modulation research.', specs: { 'Purity': '98%+', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 16, name: 'Semax', category: 'Cognitive', price: 60, currency: 'AUD', stock: 10, stripePriceId: 'price_1ThQ2hGuF9J8lg77RxgnUU0u', image: 'images/products/semax.jpg', desc: 'Synthetic ACTH analog. Supports cognitive enhancement, neuroprotection, and focus research.', specs: { 'Purity': '98%+', 'Form': 'Lyophilized Powder', 'Storage': '2-8°C', 'Research Use': 'In Vitro' } },
  { id: 25, name: 'DSIP 5mg', category: 'Cognitive', price: 0, currency: 'AUD', stock: 0, badge: 'Coming Soon', image: '', desc: 'Delta Sleep-Inducing Peptide. Supports sleep regulation, stress response, and neuromodulation research.', specs: { 'Amount': '5mg', 'Form': 'Lyophilized Powder', 'Storage': '-20°C', 'Research Use': 'In Vitro' } },

  // ========== SUPPLIES ==========
  { id: 17, name: 'Bac Water 3ml', category: 'Supplies', price: 10, currency: 'AUD', stock: 5, stripePriceId: 'price_1ThQ2fGuF9J8lg77UgU13BZW', image: 'images/products/bac-water-3ml.jpg', desc: 'Bacteriostatic water for reconstitution. Contains 0.9% benzyl alcohol preservative.', specs: { 'Volume': '3ml', 'Preservative': '0.9% Benzyl Alcohol', 'Storage': 'Room Temperature', 'Sterile': 'Yes' } },
  { id: 18, name: 'Bac Water 10ml', category: 'Supplies', price: 15, currency: 'AUD', stock: 10, stripePriceId: 'price_1ThQ2cGuF9J8lg77H2EUKglQ', image: 'images/products/bac-water-10ml.jpg', desc: 'Bacteriostatic water for reconstitution. Larger volume for multiple uses.', specs: { 'Volume': '10ml', 'Preservative': '0.9% Benzyl Alcohol', 'Storage': 'Room Temperature', 'Sterile': 'Yes' } },
  { id: 20, name: 'Starter Pack', category: 'Supplies', price: 15, currency: 'AUD', stock: 20, stripePriceId: 'price_1Tn7u2GuF9J8lg77QV6k4n5T', image: 'images/products/prep-pack.jpg', desc: '3ml BAC Water + 10x insulin syringes + 10x prep pads. Everything you need to get started.', specs: { 'Contents': '3ml BAC Water + 10 Syringes + 10 Prep Pads', 'Syringes': 'Insulin Type', 'Sterile': 'Yes' } },
  { id: 27, name: 'AA Water 3mg', category: 'Supplies', price: 0, currency: 'AUD', stock: 0, badge: 'Coming Soon', image: '', desc: 'Acetic acid water for reconstitution of specific peptides.', specs: { 'Volume': '3ml', 'Storage': 'Room Temperature', 'Sterile': 'Yes' } },
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
        ${p.badge === 'Coming Soon' ? `<span class="product-badge badge-soon">${p.badge}</span>` : p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
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

const STOCK_API = 'https://app.factukey.com/blkline-stripe/stock';

function applyLiveStock(stockData) {
  PRODUCTS.forEach(p => {
    if (stockData[p.name] !== undefined) p.stock = stockData[p.name];
  });
}

function renderAllProducts() {
  const featuredContainer = document.getElementById('featuredProducts');
  if (featuredContainer) {
    renderProducts('featuredProducts', PRODUCTS.filter(p => p.stock > 0).slice(0, 4));
  }
  const allContainer = document.getElementById('allProducts');
  if (allContainer) {
    renderProducts('allProducts', PRODUCTS);
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  observeFadeUp();
  renderAllProducts();

  fetch(STOCK_API)
    .then(r => r.json())
    .then(stockData => {
      applyLiveStock(stockData);
      renderAllProducts();
    })
    .catch(() => {});
});
