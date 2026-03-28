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
    signinBtn.textContent = 'My Account';
  });
}

// PRODUCT DETAIL PAGE
if (window.location.pathname.includes('product-detail.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const products = {
    1: {
      name: "Signature Hoodie",
      price: "$149.00",
      description: "Premium heavyweight cotton hoodie with embroidered Velôrte logo. Features oversized fit, kangaroo pocket, and ribbed cuffs. 450gsm French terry cotton.",
      image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Signature+Hoodie",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    2: {
      name: "Street Essential Tee",
      price: "$89.00",
      description: "Essential streetwear tee crafted from 100% organic cotton. Minimal branding, maximum comfort. Pre-shrunk with reinforced shoulder seams.",
      image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Street+Essential+Tee",
      sizes: ["S", "M", "L", "XL"]
    },
    3: {
      name: "Luxury Varsity Jacket",
      price: "$299.00",
      description: "Wool-blend varsity jacket with genuine leather sleeves. Gold-tone hardware and custom Velôrte chenille patches. Limited edition release.",
      image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Luxury+Varsity+Jacket",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    4: {
      name: "Old Money Trousers",
      price: "$179.00",
      description: "Tailored wide-leg trousers in premium wool blend. Pleated front with signature Velôrte hardware. Perfect for elevated casual wear.",
      image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Old+Money+Trousers",
      sizes: ["28", "30", "32", "34", "36"]
    },
    5: {
      name: "Velorte Cap",
      price: "$59.00",
      description: "Structured 6-panel cap with embroidered logo. Adjustable leather strap closure. Premium cotton twill construction.",
      image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Velorte+Cap",
      sizes: ["One Size"]
    },
    6: {
      name: "Essential Sweatpants",
      price: "$129.00",
      description: "Relaxed fit sweatpants with tapered leg. Elastic waistband with drawcord. Side pockets and back zip pocket. 400gsm cotton fleece.",
      image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Essential+Sweatpants",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    7: {
      name: "Premium Beanie",
      price: "$49.00",
      description: "Ribbed knit beanie in premium merino wool blend. Leather patch logo. One size fits all with stretch recovery.",
      image: "https://via.placeholder.com/600x800/1a1a1a/ffffff?text=Premium+Beanie",
      sizes: ["One Size"]
    },
    8: {
      name: "Oversized Tee",
      price: "$79.00",
      description: "Boxy oversized t-shirt with dropped shoulders. Heavyweight 280gsm cotton. Garment dyed for unique color depth.",
      image: "https://via.placeholder.com/600x800/2d2d2d/ffffff?text=Oversized+Tee",
      sizes: ["S", "M", "L", "XL"]
    }
  };

  const product = products[productId];
  if (product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;

    const sizeContainer = document.getElementById('size-options');
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
}
