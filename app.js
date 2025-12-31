// Simple client-side app for KS Knives
// Loads products.json and renders product cards; implements modal and contact form handling

async function loadProducts() {
  try {
    const res = await fetch('./products.json');
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error('Failed to load products', err);
    document.getElementById('products-grid').innerHTML = '<p class="note">Failed to load products.</p>';
  }
}

function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${escapeHtml(p.name)}" />
      <h3>${escapeHtml(p.name)}</h3>
      <p class="muted">${escapeHtml(p.short)}</p>
      <div class="card-actions">
        <button class="btn" data-id="${p.id}" data-action="view">View</button>
        <a class="btn secondary" href="mailto:orders@ksknives.example?subject=Order:${encodeURIComponent(p.name)}">Order</a>
      </div>
      <p class="price">${formatPrice(p.price)}</p>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.getAttribute('data-id');
      const p = products.find(x => String(x.id) === String(id));
      openModal(p);
    });
  });
}

function openModal(product) {
  if (!product) return;
  const modal = document.getElementById('product-modal');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('modal-image').src = product.image;
  document.getElementById('modal-image').alt = product.name;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-desc').textContent = product.description;
  document.getElementById('modal-price').textContent = formatPrice(product.price);
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.setAttribute('aria-hidden', 'true');
}

function setupModalHandlers() {
  const modal = document.getElementById('product-modal');
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fm = new FormData(form);
    const name = fm.get('name');
    const email = fm.get('email');
    const message = fm.get('message');
    if (!name || !email || !message) {
      status.textContent = 'Please fill out all fields.';
      return;
    }
    // Since this is a static demo, just show a success message.
    status.textContent = 'Thanks — your message has been recorded locally. We will reply from orders@ksknives.example.';
    form.reset();
    setTimeout(() => status.textContent = '', 6000);
  });
}

function formatPrice(n) {
  return (n % 1 === 0 ? '$' + n.toFixed(0) : '$' + n.toFixed(2));
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c] || c;
  });
}

// bootstrap
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  setupModalHandlers();
  setupContactForm();
});
