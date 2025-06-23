
let cart = [];

function addToCart() {
  const type = document.getElementById('type').value;
  const size = document.getElementById('size').value;
  let price = 12000;

  if (type === 'niño') price = 10000;
  if (size === '2XL') price = 30000;

  const product = { name: 'Camiseta Blanca', type, size, price, qty: 1 };
  const existing = cart.find(item => item.name === product.name && item.type === product.type && item.size === product.size);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = '';
  let total = 0;
  let qtyTotal = 0;

  cart.forEach((item, index) => {
    qtyTotal += item.qty;
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} - ${item.type} (${item.size})</span>
      <div class="cart-controls">
        <button onclick="changeQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">🗑️</button>
      </div>
    `;
    cartDiv.appendChild(div);
  });

  if (qtyTotal >= 3) {
    total *= 0.9;
  }

  document.getElementById('total').innerText = 'Total: $' + total.toLocaleString();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.product-card img');
  imgs.forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '9999';

      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.style.maxWidth = '90%';
      fullImg.style.maxHeight = '90%';
      fullImg.style.borderRadius = '8px';

      overlay.appendChild(fullImg);
      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });

      document.body.appendChild(overlay);
    });
  });
});


function toggleCart() {
  const cartEl = document.getElementById('cart');
  cartEl.classList.toggle('hidden');
}

function checkout() {
  let total = 0;
  let qty = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    qty += item.qty;
  });

  if (qty >= 3) {
    total *= 0.9;
  }

  if (total === 0) {
    alert('El carrito está vacío. Agrega productos antes de pagar.');
    return;
  }

  const wompiURL = "https://checkout.wompi.co/l/test_VPOS_YN7WCK?amount=" + Math.round(total);
  window.location.href = wompiURL;
}
