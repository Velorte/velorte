// ==========================================
// VELÔRTE - WORKING SCRIPT
// ==========================================

// ===== MODAL FUNCTIONS =====
function openModal() {
  document.getElementById('signin-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('signin-modal').classList.remove('active');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  localStorage.setItem('velorte_user', email);
  closeModal();
  showNotification('Welcome to Velôrte!');
  
  // Change sign in button to "My Account"
  const signinBtn = document.getElementById('signin-btn');
  if (signinBtn) signinBtn.textContent = 'My Account';
}

// Setup modal on load
document.addEventListener('DOMContentLoaded', function() {
  const signinBtn = document.getElementById('signin-btn');
  if (signinBtn) {
    signinBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  }
  
  // Check if already logged in
  if (localStorage.getItem('velorte_user')) {
    if (signinBtn) signinBtn.textContent = 'My Account';
  }
  
  updateCartUI();
});

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById('signin-modal');
  if (event.target === modal) {
    closeModal();
  }
}

// ===== SHOPPING CART =====
let cart = JSON.parse(localStorage.getItem('velorte_cart')) || [];

function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  if (cartSidebar) {
    cartSidebar.classList.toggle('active');
    updateCartUI();
  }
}

function addToCart(id, name, price, size, image) {
  const existingItem = cart.find(item => item.id === id && item.size === size);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      size: size,
      image: image,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartUI();
  showNotification(name + ' added to cart!');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('velorte_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  
  if (!cartItems) return;
  
  // Update count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;
  
  // Update items display
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Size: ${item.size}</p>
          <p class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</p>
          <div class="quantity-controls">
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
      </div>
    `).join('');
  }
  
  // Update total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartTotal) cartTotal.textContent = '₹' + total.toLocaleString();
}

// ===== PAYMENT (STRIPE) =====
let stripe = null;
let cardElement = null;

function initializeStripe() {
  if (!stripe && window.Stripe) {
    // Replace with your actual Stripe publishable key
    stripe = Stripe('pk_test_YOUR_STRIPE_KEY_HERE');
    const elements = stripe.elements();
    
    cardElement = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#ffffff',
          '::placeholder': { color: '#666666' }
        }
      }
    });
  }
}

function openPayment() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const paymentModal = document.getElementById('payment-modal');
  if (paymentModal) {
    paymentModal.classList.add('active');
    
    // Update totals
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotalEl = document.getElementById('payment-subtotal');
    const totalEl = document.getElementById('payment-total');
    if (subtotalEl) subtotalEl.textContent = '₹' + total.toLocaleString();
    if (totalEl) totalEl.textContent = '₹' + total.toLocaleString();
    
    // Initialize Stripe card element
    initializeStripe();
    if (cardElement && !document.getElementById('card-element').hasChildNodes()) {
      cardElement.mount('#card-element');
    }
  }
}

function closePayment() {
  const paymentModal = document.getElementById('payment-modal');
  if (paymentModal) paymentModal.classList.remove('active');
}

async function processPayment() {
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.textContent = 'Processing...';
  }
  
  // Simulate payment (replace with actual Stripe integration)
  setTimeout(() => {
    alert('Payment successful! Order will be fulfilled by Printify.');
    
    // Send to Printify (simulated)
    console.log('Sending order to Printify:', cart);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    closePayment();
    
    if (payBtn) {
      payBtn.disabled = false;
      payBtn.textContent = 'Pay Now';
    }
  }, 2000);
}

// ===== PRINTIFY INTEGRATION =====
function sendToPrintify(orderData) {
  // Replace with your actual Printify API credentials
  const PRINTIFY_API_KEY = 'YOUR_PRINTIFY_API_KEY';
  const SHOP_ID = 'YOUR_PRINTIFY_SHOP_ID';
  
  const payload = {
    external_id: 'velorte_' + Date.now(),
    label: 'Velorte Order',
    line_items: orderData.items.map(item => ({
      product_id: item.printifyId || 'PLACEHOLDER_ID',
      variant_id: 1, // You'll need to map sizes to variant IDs
      quantity: item.quantity
    })),
    shipping_method: 1,
    send_shipping_notification: true,
    address_to: orderData.shippingAddress
  };
  
  // Actual API call (commented out until you have credentials)
  /*
  fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/orders.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PRINTIFY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => console.log('Printify order created:', data))
  .catch(error => console.error('Printify error:', error));
  */
}

// ===== UTILITY =====
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartBtn = e.target.closest('a[onclick*="toggleCart"]');
  
  if (cartSidebar && cartSidebar.classList.contains('active')) {
    if (!cartSidebar.contains(e.target) && !cartBtn) {
      cartSidebar.classList.remove('active');
    }
  }
});
