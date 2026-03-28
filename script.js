// Complete product database - 12 products across 6 collections
const productsData = {
  1: {
    name: "Signature Hoodie",
    price: "$149.00",
    category: "streetwear",
    collections: ["latest", "streetwear"],
    description: "Premium heavyweight cotton hoodie with embroidered Velôrte logo. Features oversized fit, kangaroo pocket, and ribbed cuffs. 450gsm French terry cotton.",
    image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Signature+Hoodie",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  2: {
    name: "Street Essential Tee",
    price: "$89.00",
    category: "streetwear",
    collections: ["streetwear"],
    description: "Essential streetwear tee crafted from 100% organic cotton. Minimal branding, maximum comfort. Pre-shrunk with reinforced shoulder seams.",
    image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Street+Essential+Tee",
    sizes: ["S", "M", "L", "XL"]
  },
  3: {
    name: "Luxury Varsity Jacket",
    price: "$299.00",
    category: "oldmoney",
    collections: ["latest", "oldmoney"],
    description: "Wool-blend varsity jacket with genuine leather sleeves. Gold-tone hardware and custom Velôrte chenille patches. Limited edition release.",
    image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Luxury+Varsity+Jacket",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  4: {
    name: "Old Money Trousers",
    price: "$179.00",
    category: "oldmoney",
    collections: ["oldmoney"],
    description: "Tailored wide-leg trousers in premium wool blend. Pleated front with signature Velôrte hardware. Perfect for elevated casual wear.",
    image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Old+Money+Trousers",
    sizes: ["28", "30", "32", "34", "36"]
  },
  5: {
    name: "Velorte Cap",
    price: "$59.00",
    category: "accessories",
    collections: ["accessories"],
    description: "Structured 6-panel cap with embroidered logo. Adjustable leather strap closure. Premium cotton twill construction.",
    image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Velorte+Cap",
    sizes: ["One Size"]
  },
  6: {
    name: "Essential Sweatpants",
    price: "$129.00",
    category: "gym",
    collections: ["gym", "streetwear"],
    description: "Relaxed fit sweatpants with tapered leg. Elastic waistband with drawcord. Side pockets and back zip pocket. 400gsm cotton fleece.",
    image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Essential+Sweatpants",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  7: {
    name: "Premium Beanie",
    price: "$49.00",
    category: "accessories",
    collections: ["accessories", "latest"],
    description: "Ribbed knit beanie in premium merino wool blend. Leather patch logo. One size fits all with stretch recovery.",
    image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Premium+Beanie",
    sizes: ["One Size"]
  },
  8: {
    name: "Oversized Tee",
    price: "$79.00",
    category: "streetwear",
    collections: ["streetwear", "new"],
    description: "Boxy oversized t-shirt with dropped shoulders. Heavyweight 280gsm cotton. Garment dyed for unique color depth.",
    image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Oversized+Tee",
    sizes: ["S", "M", "L", "XL"]
  },
  9: {
    name: "Performance Tank",
    price: "$69.00",
    category: "gym",
    collections: ["gym", "latest"],
    description: "Moisture-wicking performance tank with mesh panels. Ergonomic seams for full range of motion. Antimicrobial finish.",
    image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Performance+Tank",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  10: {
    name: "Wool Overcoat",
    price: "$399.00",
    category: "oldmoney",
    collections: ["oldmoney", "new"],
    description: "Double-breasted wool overcoat in Italian cashmere blend. Peak lapels and welt pockets. Fully lined interior.",
    image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Wool+Overcoat",
    sizes: ["S", "M", "L", "XL"]
  },
  11: {
    name: "Leather Belt",
    price: "$89.00",
    category: "accessories",
    collections: ["accessories", "oldmoney"],
    description: "Full-grain Italian leather belt with brushed silver buckle. Hand-stitched edges. 35mm width.",
    image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Leather+Belt",
    sizes: ["S", "M", "L", "XL"]
  },
  12: {
    name: "Compression Leggings",
    price: "$99.00",
    category: "gym",
    collections: ["gym"],
    description: "High-waist compression leggings with phone pocket. Four-way stretch fabric with sweat-wicking technology.",
    image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Compression+Leggings",
    sizes: ["XS", "S", "M", "L", "XL"]
  }
};

// Helper function to get product data
function getProductData(id) {
  return productsData[id] || null;
}

// SIGN IN MODAL
const signinBtn = document.getElementById('signin-btn');
const modal = document.getElementById('signin-modal');
const closeBtn = document.getElementById('close-modal');
const loginForm = document.getElementById('login-form');

if (signinBtn) {
  signinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Welcome back to Velôrte! Signed in as ${email}`);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (signinBtn) signinBtn.textContent = 'My Account';
  });
}

// PRODUCT DETAIL PAGE
if (window.location.pathname.includes('product-detail.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const product = productsData[productId];
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
        btn.addEventListener('click', () => {
          document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
        sizeContainer.appendChild(btn);
      });
    }
  } else {
    const nameEl = document.getElementById('product-name');
    if (nameEl) nameEl.textContent = 'Product Not Found';
  }
}
