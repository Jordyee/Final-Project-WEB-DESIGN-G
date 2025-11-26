// Animasi Scroll-Triggered (produk muncul saat scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s'; // Trigger animasi
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Luxury Navbar Glassmorphism Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Luxury Animations on Scroll
const luxuryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply luxury animations to sections
document.querySelectorAll('.features .col-md-4, .testimonials .col-md-4').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    luxuryObserver.observe(el);
});

// Enhanced Button Click Animation
document.querySelectorAll('.btn-custom').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Button scale animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = 'scale(1)', 150);
    });
});

// Smooth Hover untuk Nav
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color = '#4CAF50';
    });
    link.addEventListener('mouseleave', () => {
        link.style.color = 'white';
    });
});

// Preloader Functionality - Optimized for speed and responsiveness
// (diubah: sembunyikan preloader saat DOMContentLoaded/first paint, lebih cepat)
function hidePreloaderSoon() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    // tunggu first/second paint agar tidak memotong rendering
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            preloader.classList.add('hide');
            // buang elemen setelah animasi singkat
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
                // Trigger initial load animations after preloader
                triggerInitialLoadAnimations();
            }, 150);
        });
    });
}

// Jika dokumen sudah siap, jalankan cepat; jika belum, pasang listener
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(hidePreloaderSoon, 50);
} else {
    document.addEventListener('DOMContentLoaded', hidePreloaderSoon);
    // fallback: jangan biarkan preloader menggantung lebih dari 1s
    setTimeout(hidePreloaderSoon, 1000);
}

// Function to trigger initial load animations
function triggerInitialLoadAnimations() {
    // Add initial-load class to main content
    const mainContent = document.querySelector('main') || document.body;
    if (mainContent) {
        mainContent.classList.add('initial-load');
        // Trigger animation after a very small delay
        setTimeout(() => {
            mainContent.classList.add('loaded');
        }, 50); // dipercepat dari 100ms
    }

    // Trigger section fade-in animations
    const sections = document.querySelectorAll('.features, .testimonials, .stats-section, .newsletter-section');
    sections.forEach((section, index) => {
        section.classList.add('section-fade-in');
        setTimeout(() => {
            section.classList.add('animate');
        }, 100 + (index * 100)); // dipercepat dan stagger dikurangi
    });
}

// Modal Product Details
const productData = {
    kaos: {
        title: 'Kaos UNKLAB',
        description: 'Kaos nyaman dengan desain unik dan bahan berkualitas tinggi. Cocok untuk sehari-hari.',
        price: 'Rp 150.000',
        image: 'https://via.placeholder.com/300x200?text=Kaos+UNKLAB'
    },
    gadget: {
        title: 'Gadget UNKLAB',
        description: 'Aksesori gadget stylish dan fungsional untuk kehidupan sehari-hari. Mudah digunakan.',
        price: 'Rp 200.000',
        image: 'https://via.placeholder.com/300x200?text=Gadget+UNKLAB'
    },
    tas: {
        title: 'Tas UNKLAB',
        description: 'Tas multifungsi dengan desain elegan dan tahan lama. Kapasitas besar.',
        price: 'Rp 250.000',
        image: 'https://via.placeholder.com/300x200?text=Tas+UNKLAB'
    },
    sepatu: {
        title: 'Sepatu UNKLAB',
        description: 'Sepatu casual nyaman dengan sol empuk dan desain modern. Cocok untuk aktivitas outdoor.',
        price: 'Rp 300.000',
        image: 'https://via.placeholder.com/300x200?text=Sepatu+UNKLAB'
    },
    topi: {
        title: 'Topi UNKLAB',
        description: 'Topi stylish untuk melindungi dari sinar matahari dan menambah gaya. Ringan dan nyaman.',
        price: 'Rp 100.000',
        image: 'https://via.placeholder.com/300x200?text=Topi+UNKLAB'
    },
    jaket: {
        title: 'Jaket UNKLAB',
        description: 'Jaket hangat dan trendy untuk cuaca dingin atau gaya kasual. Bahan premium.',
        price: 'Rp 350.000',
        image: 'https://via.placeholder.com/300x200?text=Jaket+UNKLAB'
    }
};

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') { // Avoid triggering on button clicks
            const product = card.getAttribute('data-product');
            const data = productData[product];
            if (data) {
                document.getElementById('modalImage').src = data.image;
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalDescription').textContent = data.description;
                document.getElementById('modalPrice').textContent = data.price;
            }
        }
    });
});

// Enhanced Carousel Auto-Play
const carousel = document.getElementById('produkCarousel');
if (carousel) {
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000, // Auto-slide every 5 seconds
        wrap: true
    });
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- Robust updateCartDisplay (guard jika elemen tidak ada) ---
function updateCartDisplay() {
    const cartBtn = document.getElementById('cartBtn');
    if (!cartBtn) return; // guard
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBtn.textContent = `Keranjang (${totalItems})`;
}

// --- Ensure product images exist / set data-src for lazy load ---
function ensureProductImagesFromData() {
    document.querySelectorAll('.product-card').forEach(card => {
        const key = card.getAttribute('data-product');
        if (!key) return;
        const data = productData[key];
        if (!data) return;

        let img = card.querySelector('.card-img-top');
        if (!img) {
            // create image element so lazy loader or CSS fallback can show it
            img = document.createElement('img');
            img.className = 'card-img-top';
            img.alt = data.title || key;
            img.loading = 'lazy';
            // place at top of card
            const body = card.querySelector('.card-body');
            if (body) card.insertBefore(img, body);
            else card.insertBefore(img, card.firstChild);
        }

        // set data-src for lazy loader (do not override if already set to same)
        if (img.dataset.src !== data.image) {
            img.dataset.src = data.image;
            // if browser supports native lazy-loading, set src now
            if ('loading' in HTMLImageElement.prototype) {
                img.src = data.image;
            }
        }
    });
}

// --- Safe init: try to initialize optional modules if present ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        // ensure images exist for product cards
        ensureProductImagesFromData();

        // wishlist disabled - no initialization needed

        // trigger welcome notification quickly if notification system available
        if (typeof notificationSystem !== 'undefined' && notificationSystem && typeof notificationSystem.showWelcomeNotification === 'function') {
            // show faster, non-blocking
            setTimeout(() => notificationSystem.showWelcomeNotification(), 400);
        }

        // update cart display (guarded)
        updateCartDisplay();

        // call lazy-load helper if present in same file
        if (typeof lazyLoadImages === 'function') {
            lazyLoadImages();
        }
    } catch (err) {
        // fail silently but log for debugging
        console.warn('Init helpers error:', err);
    }
});

const cartSound = new Audio('data:audio/mp3;base64,//uQxAAADhAAABcQCAQQAAAEAAQAgJ/4AGcA=');

function addToCart(productKey) {
    const product = productData[productKey];
    const existingItem = cart.find(item => item.key === productKey);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            key: productKey,
            title: product.title,
            price: parseInt(product.price.replace(/[^\d]/g, '')),
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    animateAddToCart(productKey);
    cartSound.play().catch((error) => {
        console.warn('Cart sound playback failed:', error);
    });
    showToast('Produk ditambahkan ke keranjang!', 'success');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    renderCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Keranjang kosong.</p>';
        cartTotal.textContent = 'Total: Rp 0';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h6>${item.title}</h6>
                    <p>Rp ${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <span class="cart-item-remove" onclick="removeFromCart(${index})">&times;</span>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `Total: Rp ${total.toLocaleString()}`;
}

// Toast Notification Function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 400);
    }, 3000);
}

// Animate Add to Cart Function
function animateAddToCart(productKey) {
    const productCard = document.querySelector(`.product-card[data-product="${productKey}"]`);
    if (!productCard) return;

    const cartBtn = document.getElementById('cartBtn');
    if (!cartBtn) return;

    // Create flying image
    const flyingImage = document.createElement('img');
    flyingImage.src = productData[productKey].image;
    flyingImage.className = 'flying-image';
    flyingImage.style.position = 'absolute';
    flyingImage.style.width = '50px';
    flyingImage.style.height = '50px';
    flyingImage.style.objectFit = 'cover';
    flyingImage.style.borderRadius = '50%';
    flyingImage.style.zIndex = '1000';
    flyingImage.style.pointerEvents = 'none';

    const rect = productCard.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    flyingImage.style.left = `${rect.left + rect.width / 2 - 25}px`;
    flyingImage.style.top = `${rect.top + rect.height / 2 - 25}px`;

    document.body.appendChild(flyingImage);

    // Animate to cart
    setTimeout(() => {
        flyingImage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
        flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
        flyingImage.style.transform = 'scale(0.1)';
        flyingImage.style.opacity = '0.7';
    }, 10);

    // Remove after animation
    setTimeout(() => {
        flyingImage.remove();
        // Animate cart button
        cartBtn.style.transform = 'scale(1.2)';
        cartBtn.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 300);
    }, 800);
}

// Checkout Functions
function renderCheckoutSummary() {
    const checkoutSummary = document.getElementById('checkoutSummary');
    if (!checkoutSummary) return;

    let total = 0;
    const summaryHTML = `
        <h6>Ringkasan Pesanan</h6>
        <div class="checkout-items">
            ${cart.map(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                return `
                    <div class="checkout-item">
                        <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;">
                        <div style="flex-grow: 1;">
                            <small>${item.title} (x${item.quantity})</small>
                        </div>
                        <small>Rp ${itemTotal.toLocaleString()}</small>
                    </div>
                `;
            }).join('')}
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>Rp ${total.toLocaleString()}</strong>
        </div>
    `;
    checkoutSummary.innerHTML = summaryHTML;
}

function validateCheckoutForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    // Clear previous error states
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid');
    });

    let isValid = true;
    let firstInvalidField = null;

    if (!name) {
        showFieldError('name', 'Nama lengkap harus diisi.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = 'name';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showFieldError('email', 'Email yang valid harus diisi.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = 'email';
    }
    if (!phone || !/^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\s/g, ''))) {
        showFieldError('phone', 'Nomor telepon yang valid harus diisi (minimal 10 digit).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = 'phone';
    }
    if (!address || address.length < 10) {
        showFieldError('address', 'Alamat lengkap harus diisi (minimal 10 karakter).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = 'address';
    }

    if (firstInvalidField) {
        document.getElementById(firstInvalidField).focus();
    }

    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');

    // Add error message if not exists
    let errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;

    showToast(message, 'warning');
}

function buyProduct(productKey) {
    const product = productData[productKey];
    if (!product) {
        showToast('Produk tidak ditemukan.', 'error');
        return;
    }

    // Cari tombol buy terkait productKey (fallback bila dipanggil tanpa event)
    const buyBtn = document.querySelector(`.buy-btn[data-product="${productKey}"]`) || document.querySelector('.buy-btn');
    if (buyBtn) {
        buyBtn.disabled = true;
        buyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    }

    // Create a temporary cart with just this product
    const tempCart = [{
        key: productKey,
        title: product.title,
        price: parseInt(product.price.replace(/[^\d]/g, '')),
        image: product.image,
        quantity: 1
    }];

    // Store the temp cart temporarily
    localStorage.setItem('tempCart', JSON.stringify(tempCart));

    // Add small delay for better UX
    setTimeout(() => {
        // Redirect to checkout or open checkout modal directly
        renderCheckoutSummaryForBuy(tempCart);
        const modal = new bootstrap.Modal(document.getElementById('checkoutModal'), {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();

        // Reset button state
        if (buyBtn) {
            buyBtn.disabled = false;
            buyBtn.innerHTML = 'Beli';
        }

        showToast('Checkout dimulai untuk produk ini!', 'info');
    }, 500);
}

function renderCheckoutSummaryForBuy(tempCart) {
    const checkoutSummary = document.getElementById('checkoutSummary');
    if (!checkoutSummary) return;

    let total = 0;
    const summaryHTML = `
        <h6>Ringkasan Pesanan</h6>
        <div class="checkout-items">
            ${tempCart.map(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                return `
                    <div class="checkout-item">
                        <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;">
                        <div style="flex-grow: 1;">
                            <small>${item.title} (x${item.quantity})</small>
                        </div>
                        <small>Rp ${itemTotal.toLocaleString()}</small>
                    </div>
                `;
            }).join('')}
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>Rp ${total.toLocaleString()}</strong>
        </div>
    `;
    checkoutSummary.innerHTML = summaryHTML;
}

function processCheckout() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        showToast('Pilih metode pembayaran terlebih dahulu.', 'warning');
        return;
    }

    const confirmBtn = document.getElementById('confirmCheckoutBtn');
    const originalText = confirmBtn.textContent;

    // Check if this is a direct buy or from cart
    const tempCart = JSON.parse(localStorage.getItem('tempCart')) || null;
    const isDirectBuy = tempCart !== null;

    // Show confirmation dialog
    const cartToProcess = isDirectBuy ? tempCart : cart;
    const totalAmount = cartToProcess.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!confirm(`Konfirmasi pembelian:\n\nTotal: Rp ${totalAmount.toLocaleString()}\nMetode: ${paymentMethod.value === 'transfer' ? 'Transfer Bank' : 'COD'}\n\nLanjutkan pembelian?`)) {
        return;
    }

    // Disable button and show processing with spinner
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';

    // Add loading overlay to modal
    const modalContent = document.querySelector('#checkoutModal .modal-content');
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Memproses pembayaran...</p>
        </div>
    `;
    loadingOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1050;
        border-radius: 15px;
    `;
    modalContent.style.position = 'relative';
    modalContent.appendChild(loadingOverlay);

    // Show progress notification
    showToast('Memproses pembayaran...', 'info');

    // Simulate payment processing with progress updates
    setTimeout(() => {
        showToast('Memverifikasi pembayaran...', 'info');
        loadingOverlay.querySelector('p').textContent = 'Memverifikasi pembayaran...';
    }, 500);

    setTimeout(() => {
        showToast('Mengirim konfirmasi...', 'info');
        loadingOverlay.querySelector('p').textContent = 'Mengirim konfirmasi...';
    }, 1000);

    setTimeout(() => {
        // Remove loading overlay
        loadingOverlay.remove();

        if (paymentMethod.value === 'transfer') {
            showToast('Pesanan berhasil! Silakan transfer ke rekening yang tertera. Konfirmasi akan dikirim via email.', 'success');
            setTimeout(() => {
                showToast('Email konfirmasi telah dikirim! Periksa inbox Anda.', 'success');
            }, 1000);
        } else {
            showToast('Pesanan berhasil! Kurir akan menghubungi Anda untuk pengiriman.', 'success');
            setTimeout(() => {
                showToast('SMS konfirmasi telah dikirim! Kurir akan segera menghubungi.', 'success');
            }, 1000);
        } // <-- tambahkan penutup else di sini

        // Clear cart or temp cart
        if (isDirectBuy) {
            localStorage.removeItem('tempCart');
        } else {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }

        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('checkoutModal'))?.hide();
        document.getElementById('checkoutForm')?.reset?.();

        // Reset button
        confirmBtn.disabled = false;
        confirmBtn.textContent = originalText;
    }, 2000); // 2 second delay for simulation
}

// Search Functionality
function performSearch() {
    const searchTerm = document.querySelector('.luxury-search').value.toLowerCase().trim();

    // If we're on the homepage and have a search term, redirect to products page with search
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        if (searchTerm !== '') {
            // Redirect to products page with search parameter
            window.location.href = `produk.html?search=${encodeURIComponent(searchTerm)}`;
            return;
        }
    }

    // If we're on products page, perform local search
    const productCards = document.querySelectorAll('.product-card');
    let foundResults = false;

    if (searchTerm === '') {
        // Show all products if search is empty
        productCards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        });
        showToast('Menampilkan semua produk', 'info');
        return;
    }

    productCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
            foundResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (foundResults) {
        showToast(`Ditemukan produk yang cocok dengan "${searchTerm}"`, 'success');
        // Scroll to products section smoothly
        const productsSection = document.querySelector('#produk-unggulan') || document.querySelector('.py-5');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        showToast(`Tidak ada produk yang cocok dengan "${searchTerm}"`, 'error');
    }
}



// Handle URL search parameter on products page
function handleUrlSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    if (searchTerm && window.location.pathname.includes('produk.html')) {
        // Set the search input value
        const searchInput = document.querySelector('.luxury-search');
        if (searchInput) {
            searchInput.value = searchTerm;
        }

        // Perform the search
        setTimeout(() => {
            performSearch();
        }, 500); // Small delay to ensure DOM is ready
    }
}

// Luxury Page Transition System
class PageTransition {
    constructor() {
        this.overlay = null;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.createOverlay();
        this.bindNavigationEvents();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-spinner">
                    <div class="transition-ring"></div>
                    <div class="transition-ring"></div>
                    <div class="transition-ring"></div>
                </div>
                <h2 class="transition-text">UNKLAB Store</h2>
                <p class="transition-subtitle">Memuat pengalaman mewah...</p>
            </div>
        `;
        document.body.appendChild(overlay);
        this.overlay = overlay;
    }

    bindNavigationEvents() {
        // Bind click events to navigation links
        document.querySelectorAll('.luxury-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    this.navigateTo(href);
                }
            });
        });

        // Bind click events to back-to-home buttons
        document.querySelectorAll('.luxury-back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const href = btn.getAttribute('href');
                if (href) {
                    this.navigateTo(href);
                }
            });
        });
    }

    navigateTo(url) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Add exit animation to current page
        document.body.classList.add('page-exit');

        // Show transition overlay
        setTimeout(() => {
            this.overlay.classList.add('active');
        }, 250);

        // Navigate after transition
        setTimeout(() => {
            window.location.href = url;
        }, 1000);
    }

    showEnterAnimation() {
        // Add enter animation when page loads
        document.body.classList.add('page-enter');

        // Remove animation class after completion
        setTimeout(() => {
            document.body.classList.remove('page-enter');
        }, 500);
    }
}



// Initialize page transition system
const pageTransition = new PageTransition();

// Show enter animation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        pageTransition.showEnterAnimation();
    }, 100);

    updateCartDisplay();

    // Handle URL search parameter on page load
    handleUrlSearch();

    // Search functionality
    const searchInput = document.querySelector('.luxury-search');
    const searchBtn = document.querySelector('.luxury-btn-outline');

    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });

        // Search on Enter key press
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Real-time search with debounce
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (searchInput.value.length >= 2) {
                    performSearch();
                }
            }, 300);
        });
    }

    // Add to cart from product cards
    document.querySelectorAll('.product-card .btn-custom').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const productKey = card.getAttribute('data-product');
            addToCart(productKey);
        });
    });

    // Add to cart from modal
    document.getElementById('addToCartFromModal')?.addEventListener('click', () => {
        const productKey = document.querySelector('.product-card[data-bs-toggle="modal"]:not([style*="display: none"])')?.getAttribute('data-product');
        if (productKey) {
            addToCart(productKey);
            bootstrap.Modal.getInstance(document.getElementById('productModal'))?.hide();
        }
    });

    // Buy button functionality
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productKey = btn.getAttribute('data-product');
            buyProduct(productKey);
        });
    });

    // Buy from modal
    document.getElementById('buyFromModal')?.addEventListener('click', () => {
        const productKey = document.querySelector('.product-card[data-bs-toggle="modal"]:not([style*="display: none"])')?.getAttribute('data-product');
        if (productKey) {
            buyProduct(productKey);
            bootstrap.Modal.getInstance(document.getElementById('productModal'))?.hide();
        }
    });

    // Cart button
    document.getElementById('cartBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        renderCart();
        new bootstrap.Modal(document.getElementById('cartModal')).show();
    });

    // Checkout button
    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Keranjang kosong. Tambahkan produk terlebih dahulu.', 'warning');
        } else {
            renderCheckoutSummary();
            bootstrap.Modal.getInstance(document.getElementById('cartModal'))?.hide();
            new bootstrap.Modal(document.getElementById('checkoutModal')).show();
            showToast('Checkout dimulai! Lengkapi informasi pengiriman.', 'info');
        }
    });

    // Payment method change
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const bankDetails = document.getElementById('bankDetails');
            if (e.target.value === 'transfer') {
                bankDetails.style.display = 'block';
            } else {
                bankDetails.style.display = 'none';
            }
        });
    });

    // Confirm checkout button
    document.getElementById('confirmCheckoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateCheckoutForm()) {
            processCheckout();
        }
    });

    // Newsletter subscription functionality with improved validation and UX
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            // Enhanced email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showToast('Email harus diisi!', 'error');
                emailInput.focus();
                return;
            }
            if (!emailRegex.test(email)) {
                showToast('Format email tidak valid!', 'error');
                emailInput.focus();
                return;
            }

            // Check if email is already subscribed
            let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];
            if (subscribers.includes(email)) {
                showToast('Email sudah terdaftar!', 'warning');
                return;
            }

            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftarkan...';

            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Store email in localStorage
                subscribers.push(email);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

                // Show success notification using notification system
                notificationSystem.addNotification({
                    type: 'success',
                    title: 'Selamat anda telah berlangganan',
                    message: 'Terima kasih telah bergabung! Anda akan menerima update terbaru dari UNKLAB.',
                    shown: false,
                    autoShow: false
                });

                // Clear form
                this.reset();

                // Show additional success toast
                showToast('Selamat anda telah berlangganan newsletter UNKLAB!', 'success');

            } catch (error) {
                showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // --- Tambahan: Lazy-load images, product filters & keyboard shortcuts ---
    (function(){
        // Lazy-load images using data-src fallback
        function lazyLoadImages() {
            const imgs = document.querySelectorAll('img[data-src]');
            if ('loading' in HTMLImageElement.prototype) {
                imgs.forEach(img => img.src = img.dataset.src);
            } else {
                const io = new IntersectionObserver((entries, obs) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) {
                            const img = e.target;
                            img.src = img.dataset.src;
                            obs.unobserve(img);
                        }
                    });
                }, { rootMargin: '200px' });
                imgs.forEach(img => io.observe(img));
            }
        }

        // Product filter / sort
        function applyProductFilters() {
            const q = (document.getElementById('productSearch')?.value || '').toLowerCase().trim();
            const cat = document.getElementById('filterCategory')?.value || '';
            const sort = document.getElementById('sortBy')?.value || '';
            const cards = Array.from(document.querySelectorAll('.product-card'));
            let results = cards.filter(card => {
                const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
                const desc = (card.querySelector('.card-text')?.textContent || '').toLowerCase();
                const key = card.getAttribute('data-product') || '';
                if (cat && key !== cat) return false;
                if (q && !(title.includes(q) || desc.includes(q))) return false;
                return true;
            });

            // show/hide
            cards.forEach(c => c.style.display = results.includes(c) ? 'block' : 'none');

            // sort by price if needed
            if (sort && results.length) {
                results.sort((a,b)=>{
                    const pa = parseInt((a.querySelector('.card-text')?.textContent || '').replace(/[^\d]/g,'')) || 0;
                    const pb = parseInt((b.querySelector('.card-text')?.textContent || '').replace(/[^\d]/g,'')) || 0;
                    return sort === 'price-asc' ? pa - pb : pb - pa;
                });
                // reflow into parent row
                const parent = results[0]?.closest('.row');
                if (parent) {
                    results.forEach(r => parent.appendChild(r.closest('.col-md-4') || r));
                }
            }

            showToast(results.length ? `Menampilkan ${results.length} produk` : 'Tidak ada produk', results.length ? 'success' : 'warning');
        }

        // Keyboard shortcuts
        function bindShortcuts() {
            document.addEventListener('keydown', (e) => {
                if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
                if (e.key === '/') {
                    const s = document.querySelector('.luxury-search') || document.getElementById('productSearch');
                    if (s) { e.preventDefault(); s.focus(); s.select(); }
                } else if (e.key.toLowerCase() === 'c') {
                    // open cart
                    const cartBtn = document.getElementById('cartBtn');
                    if (cartBtn) cartBtn.click();
                } else if (e.key.toLowerCase() === 'n') {
                    const notif = document.getElementById('notificationBtn');
                    if (notif) notif.click();
                } else if (e.key.toLowerCase() === 'w') {
                    window.location.href = 'wishlist.html';
                } else if (e.key === '?') {
                    alert('Shortcut:\n/ → fokus cari\nc → buka keranjang\nn → notifikasi\nw → wishlist');
                }
            });
        }

document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    bindShortcuts();

    // bind filter UI if present
    document.getElementById('productSearchBtn')?.addEventListener('click', applyProductFilters);
    ['productSearch','filterCategory','sortBy'].forEach(id=>{
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', applyProductFilters);
    });

    // Remove old category filter if exists in page content section because we moved it to header
    const oldCategorySection = document.querySelector('section#kategori');
    if (oldCategorySection) {
        oldCategorySection.remove();
    }

    // New: category filter change listener for homepage (in header navbar)
    const filterCategory = document.getElementById('filterCategory');
    if (filterCategory) {
        filterCategory.addEventListener('change', () => {
            applyProductFilters();
        });
    }
});

    })();
});
