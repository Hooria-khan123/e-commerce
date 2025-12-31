// ==================== DARK MODE ====================
const darkModeToggle = document.getElementById("darkModeToggle");
const icon = darkModeToggle.querySelector("i");

function setTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
  icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || "light");

darkModeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  setTheme(newTheme);
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

if (hamburger && navbar) {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    hamburger.classList.toggle("active");

    const icon = hamburger.querySelector("i");
    if (icon) {
      if (navbar.classList.contains("active")) {
        icon.classList.add("fa-xmark");
        icon.classList.remove("fa-bars");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    }
  });
}

// ==================== SEARCH FUNCTION ====================
function search() {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const products = document.querySelectorAll(".product-item");
  const noProduct = document.getElementById("noProduct");
  const magnify = document.querySelector(".search-container .fa-magnifying-glass");
  const clearIcon = document.getElementById("clearIcon");

  let found = false;

  // Toggle icons
  if (filter) {
    magnify.style.display = "none";
    clearIcon.style.display = "block";
  } else {
    magnify.style.display = "block";
    clearIcon.style.display = "none";
  }

  // Search and highlight
  products.forEach((product) => {
    const title = product.querySelector("h3");
    const text = title.textContent.toUpperCase();

    if (text.includes(filter)) {
      product.style.display = "";
      found = true;

      // Highlight matched text
      title.innerHTML = title.textContent.replace(
        new RegExp(filter, "gi"),
        (match) => `<span class="highlight">${match}</span>`
      );
    } else {
      product.style.display = "none";
      title.textContent = title.textContent;
    }
  });

  // Show "No product found"
  if (noProduct) {
    noProduct.style.display = found ? "none" : "block";
  }
}

// ==================== CLEAR SEARCH ====================
function clearSearch() {
  const input = document.getElementById("search");
  input.value = "";

  const magnify = document.querySelector(".search-container .fa-magnifying-glass");
  const clearIcon = document.getElementById("clearIcon");
  
  magnify.style.display = "block";
  clearIcon.style.display = "none";

  search();
}

// ==================== ENTER KEY SUPPORT ====================
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      search();
    }
  });
}

// ==================== CART SYSTEM ====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Page load pe bag count update karo
updateBagCount();

// ==================== ADD TO CART ====================
function addToCart(productName, productPrice, productImage, productDescription) {
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
    showToast('✓ Quantity Updated!', productName);
  } else {
    const newItem = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription,
      quantity: 1
    };
    cart.push(newItem);
    showToast('✓ Added to Cart!', productName);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateBagCount();
}

// ==================== BAG COUNT UPDATE ====================
function updateBagCount() {
  const bagCountElement = document.querySelector('.bag-item-count');
  if (bagCountElement) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    bagCountElement.textContent = totalItems;
  }
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, productName) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <div class="toast-content">
      <strong>${message}</strong>
      <span>${productName}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ==================== RENDER CART ITEMS ====================
function renderCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const emptyCart = document.querySelector('.empty-cart');
  
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.style.display = 'none';
    emptyCart.style.display = 'block';
    updateCartSummary();
    return;
  }
  
  cartItemsContainer.style.display = 'block';
  emptyCart.style.display = 'none';
  
  let cartHTML = '';
  cart.forEach(item => {
    const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
    
    cartHTML += `
      <div class="cart-item" data-id="${item.id}">
        <div class="item-details">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        </div>
        <div class="item-price">${item.price}</div>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${item.id})">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="item-total">$${itemTotal.toFixed(2)}</div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartHTML;
  updateCartSummary();
}

// ==================== INCREASE QUANTITY ====================
function increaseQuantity(itemId) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    item.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateBagCount();
    showToast('✓ Quantity Increased', item.name);
  }
}

// ==================== DECREASE QUANTITY ====================
function decreaseQuantity(itemId) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
      updateBagCount();
      showToast('✓ Quantity Decreased', item.name);
    } else {
      removeFromCart(itemId);
    }
  }
}

// ==================== REMOVE FROM CART ====================
function removeFromCart(itemId) {
  const item = cart.find(item => item.id === itemId);
  const itemName = item ? item.name : '';
  
  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
  updateBagCount();
  showToast('✓ Removed', itemName);
}

// ==================== CLEAR CART ====================
function clearCart() {
  if (cart.length === 0) {
    showToast('⚠ Cart Already Empty', '');
    return;
  }
  
  if (confirm('Clear all items from cart?')) {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateBagCount();
    showToast('✓ Cart Cleared', 'All items removed');
  }
}

// ==================== UPDATE CART SUMMARY ====================
function updateCartSummary() {
  const subtotalElement = document.querySelector('.subtotal');
  const taxElement = document.querySelector('.tax');
  const totalElement = document.querySelector('.total');
  
  if (!subtotalElement) return;
  
  let subtotal = 0;
  cart.forEach(item => {
    const price = parseFloat(item.price.replace('$', ''));
    subtotal += price * item.quantity;
  });
  
  const tax = subtotal * 0.10;
  const total = subtotal + tax;
  
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  taxElement.textContent = `$${tax.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// ==================== BAG ICON CLICK ====================
document.addEventListener('DOMContentLoaded', function() {
  const bagIcon = document.querySelector('.fa-bag-shopping');
  if (bagIcon) {
    bagIcon.style.cursor = 'pointer';
    bagIcon.addEventListener('click', function() {
      window.location.href = './cart.html';
    });
  }
});

// ==================== CHECKOUT BUTTON ====================
document.addEventListener('DOMContentLoaded', function() {
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        showToast('⚠ Cart is Empty', 'Add items first');
        return;
      }
      
      const total = document.querySelector('.total').textContent;
      showToast('✓ Proceeding...', `Total: ${total}`);
      setTimeout(() => {
        alert(`Checkout coming soon!\nTotal: ${total}`);
      }, 1000);
    });
  }
});

// ==================== PROMO CODE ====================
document.addEventListener('DOMContentLoaded', function() {
  const promoButton = document.querySelector('.promo-code button');
  if (promoButton) {
    promoButton.addEventListener('click', function() {
      const promoInput = document.querySelector('.promo-code input');
      const code = promoInput.value.trim().toUpperCase();
      
      if (!code) {
        showToast('⚠ Enter Code', '');
        return;
      }
      
      const validCodes = {
        'SAVE10': 10,
        'SAVE20': 20,
        'WELCOME': 15
      };
      
      if (validCodes[code]) {
        showToast('✓ Code Applied!', `${validCodes[code]}% OFF`);
        promoInput.value = '';
      } else {
        showToast('✗ Invalid Code', 'Try again');
      }
    });
  }
});

// ==================== PAGE LOAD - ADD TO CART BUTTONS ====================
document.addEventListener('DOMContentLoaded', function() {
  
  // Agar cart page hai to render karo
  if (document.querySelector('.cart-section')) {
    renderCartItems();
  }
  
  // Sabhi Add to Cart buttons ko event listener do
  const addButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Product details nikalo
      const product = this.closest('.product-item');
      const name = product.querySelector('h3').textContent;
      const price = product.querySelector('.price').textContent;
      const imgElement = product.querySelector('img');
      const image = imgElement.getAttribute('src'); // ✅ FIX - getAttribute use karo
      const description = product.querySelector('p').textContent;
      
      // Cart mein add karo
      addToCart(name, price, image, description);
      
      // Button animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => this.style.transform = 'scale(1)', 100);
    });
  });
});

// ==================== GLOBAL FUNCTIONS ====================
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;