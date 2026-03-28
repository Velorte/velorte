// SIGN IN MODAL
const signinBtn = document.getElementById('signin-btn');
const modal = document.getElementById('signin-modal');
const closeBtn = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');

if (signinBtn) {
  signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal) modal.classList.remove('active');
});

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Welcome to Velôrte!');
    modal.classList.remove('active');
    if (signinBtn) signinBtn.textContent = 'My Account';
  });
}

// PRODUCT DETAIL PAGE DATA
const productDetails = {
  1: { name: "Signature Hoodie", price: "$149", description: "Premium heavyweight cotton hoodie with embroidered Velôrte logo. 450gsm French terry cotton.", sizes: ["S", "M", "L", "XL", "XXL"], image: "https://via.placeholder.com/600x800/1a1a1a/fff?text=Hoodie" },
  2: { name: "Varsity Jacket", price: "$299", description: "Wool-blend varsity jacket with genuine leather sleeves. Limited edition.", sizes: ["S", "M", "L", "XL", "XXL"], image: "https://via.placeholder.com/600x800/2d2d2d/fff?text=Jacket" },
  3: { name: "Essential Tee", price: "$89", description: "100% organic cotton tee. Minimal branding, maximum comfort.", sizes: ["S", "M", "L", "XL"], image: "https://via.placeholder.com/600x800/1a1a1a/fff?text=Tee" },
  4: { name: "Old Money Trousers", price: "$179", description: "Tailored wide-leg trousers in premium wool blend.", sizes: ["28", "30", "32", "34", "36"], image: "https://via.placeholder.com/600x800/2d2d2d/fff?text=Trousers" },
  5: { name: "Velorte Cap", price: "$59", description: "Structured 6-panel cap with embroidered logo.", sizes: ["One Size"], image: "https://via.placeholder.com/600x800/1a1a1a/fff?text=Cap" },
  6: { name: "Sweatpants", price: "$129", description: "Relaxed fit sweatpants with tapered leg. 400gsm cotton fleece.", sizes: ["S", "M", "L", "XL", "XXL"], image: "https://via.placeholder.com/600x800/2d2d2d/fff?text=Sweatpants" },
  7: { name: "Beanie", price: "$49", description: "Ribbed knit beanie in premium merino wool blend.", sizes: ["One Size"], image: "https://via.placeholder.com/600x800/1a1a1a/fff?text=Beanie" },
  8: { name: "Oversized Tee", price: "$79", description: "Boxy oversized t-shirt with dropped shoulders. 280gsm cotton.", sizes: ["S", "M", "L", "XL"], image: "https://via.placeholder.com/600x800/2d2d2d/fff?text=Oversized" },
  9: { name: "Gym Tank", price: "$69", description: "Moisture-wicking performance tank with mesh panels.", sizes: ["S", "M", "L", "XL", "XXL"], image: "https://via.placeholder.com/600x800/1a1a1a/fff?text=Tank" },
  10: { name: "Wool Coat", price: "$399", description: "Double-breasted wool overcoat in Italian cashmere blend.", sizes: ["S", "M", "L", "XL"], image: "https://via.placeholder.com/600x800/2d2d2d/fff?text=Coat" },
  11: { name: "Leather Belt", price: "$89", description: "Full-grain Italian leather belt with brushed silver buckle.", sizes: ["S", "M", "L", "XL"], image: "https://via.placeholder.com/600x800/1a1a1a/fff?text=Belt" },
  12: { name: "Leggings", price: "$99", description: "High-waist compression leggings with phone pocket.", sizes: ["XS", "S", "M", "L", "XL"], image: "https://via.placeholder.com/600x800/2d2d2d/fff?text=Leggings" }
};

// Load product detail
if (window.location.pathname.includes('product-detail.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = productDetails[productId];

  if (product) {
    const nameEl = document.getElementById('product-name');
    const priceEl = document.getElementById('product-price');
    const descEl = document.getElementById('product-description');
    const imgEl = document.getElementById('product-image');
    const sizeContainer = document.getElementById('size-options');

    if (nameEl) nameEl.textContent = product.name;
    if (priceEl) priceEl.textContent = product.price;
    if (descEl) descEl.textContent = product.description;
    if (imgEl) {
      imgEl.src = product.image;
      imgEl.alt = product.name;
    }

    if (sizeContainer) {
      product.sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';
        btn.textContent = size;
        btn.onclick = function() {
          document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
          this.classList.add('selected');
        };
        sizeContainer.appendChild(btn);
      });
    }
  }
}
