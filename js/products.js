        
        // Products data 

const products = [
    {
        id: 1,
        name: "Premium Peanut Seeds",
        subtitle: "High Quality",
        description: "Premium quality peanut seeds perfect for cultivation. High yield and disease-resistant variety.",
        images: [
            "images/Sir khursheed Yusuf.jpg",
            "images/Sir khursheed Yusuf 2.jpg",
            "images/Sir khursheed Yusuf 3.png"
        ],
        colors: ["#8B4513", "#D2691E", "#CD853F", "#DEB887"],
        originalPrice: "650",
        price: "500"
    },
    {
        id: 2,
        name: "Organic Peanut Seeds",
        subtitle: "Certified Organic",
        description: "100% organic peanut seeds certified for organic farming. Perfect for sustainable agriculture.",
        images: [
            "images/Sir Summair.jpg",
            "images/Muhammad Ramzan.jpg",
            "images/Sir Naveed Ahmad.jpg"
        ],
        colors: ["#8B4513", "#A0522D", "#CD853F"],
        originalPrice: "900",
        price: "750"
    },
    {
        id: 3,
        name: "Hybrid Peanut Seeds",
        subtitle: "Maximum Yield",
        description: "Hybrid variety peanut seeds with maximum yield potential. Suitable for commercial farming.",
        images: [
            "images/Kashif Mahmood.jpg",
            "images/Nabeel Abbass.jpg",
            "images/Ume Habiba.jpg"
        ],
        colors: ["#D2691E", "#F4A460", "#DEB887", "#FFDEAD"],
        originalPrice: "1050",
        price: "900"
    }

];



// Format: country code + number (no + or spaces)
// Example: "923001234567" for Pakistan
const WHATSAPP_NUMBER = "923371733897";



        // State Management


// Track current slide index for each product
const carouselStates = {};

// Track user selections (color, size) for each product
const selections = {};

// Initialize states for all products
products.forEach(product => {
    carouselStates[product.id] = { currentIndex: 0 };
    selections[product.id] = {
        color: product.colors[0]
    };
});



        // Create the Product Card


function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Generate carousel images HTML
    const imagesHTML = product.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${img}" alt="${product.name}" onerror="this.src='images/logo.png'">
        </div>
    `).join('');
    
    // Generate carousel dots HTML
    const dotsHTML = product.images.map((_, index) => `
        <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');
    
    // Generate color options HTML
    const colorsHTML = product.colors.map(color => `
        <div class="color-option" style="background-color: ${color}" data-color="${color}"></div>
    `).join('');
    
    
    // Build complete card HTML
    card.innerHTML = `
        <div class="carousel-container" data-product-id="${product.id}">
            <div class="carousel">
                ${imagesHTML}
            </div>
            <button class="carousel-nav carousel-prev">‹</button>
            <button class="carousel-nav carousel-next">›</button>
            <div class="carousel-dots">
                ${dotsHTML}
            </div>
        </div>
        <div class="product-info">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-subtitle">${product.subtitle}</p>
            <p class="product-description">${product.description}</p>
            
            <div class="color-section">
                <div class="section-title">Colour</div>
                <div class="color-picker-container">
                    ${colorsHTML}
                    <input type="color" class="custom-color-input" title="Choose custom color">
                </div>
            </div>
            
            <div class="buy-section">
                <div class="price">
                    <del>Rs ${product.originalPrice}</del>
                    <span class="final-price">Rs ${product.price}</span>
                </div>
                <button class="buy-btn">Buy Now</button>
            </div>
        </div>
    `;
    
    // Attach event listeners to the card
    setupCardEventListeners(card, product);
    
    return card;
}


        // Event Listeners 

function setupCardEventListeners(card, product) {
    // Get all interactive elements
    const prevBtn = card.querySelector('.carousel-prev');
    const nextBtn = card.querySelector('.carousel-next');
    const dots = card.querySelectorAll('.dot');
    const colorOptions = card.querySelectorAll('.color-option');
    const buyBtn = card.querySelector('.buy-btn');
    const customColorInput = card.querySelector('.custom-color-input');
    
    // Carousel navigation
    prevBtn.addEventListener('click', () => moveCarousel(product.id, -1));
    nextBtn.addEventListener('click', () => moveCarousel(product.id, 1));
    
    // Carousel dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(product.id, index));
    });
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            selectColor(product.id, color, card);
        });
    });
    
    // Custom color picker
    customColorInput.addEventListener('change', (e) => {
        selectCustomColor(product.id, e.target.value, card);
    });
    
    
    // Buy button
    buyBtn.addEventListener('click', () => buyNow(product.id));
    
    // Initialize first color as selected
    if (colorOptions.length > 0) {
        colorOptions[0].classList.add('selected');
    }
}


function getSelectedImage(productId) {
    const state = carouselStates[productId];
    const product = products.find(p => p.id === productId);
    return product.images[state.currentIndex];
}


        // Carousal Function

// Move carousel left or right
function moveCarousel(productId, direction) {
    const container = document.querySelector(`.carousel-container[data-product-id="${productId}"]`);
    if (!container) return;
    
    const items = container.querySelectorAll('.carousel-item');
    const dots = container.querySelectorAll('.dot');
    const state = carouselStates[productId];
    
    // Remove active class from current slide
    items[state.currentIndex].classList.remove('active');
    dots[state.currentIndex].classList.remove('active');
    
    // Calculate new index
    state.currentIndex += direction;
    
    // Loop around if at start/end
    if (state.currentIndex < 0) {
        state.currentIndex = items.length - 1;
    } else if (state.currentIndex >= items.length) {
        state.currentIndex = 0;
    }
    
    // Add active class to new slide
    items[state.currentIndex].classList.add('active');
    dots[state.currentIndex].classList.add('active');
}

// Go to specific slide
function goToSlide(productId, index) {
    const container = document.querySelector(`.carousel-container[data-product-id="${productId}"]`);
    if (!container) return;
    
    const items = container.querySelectorAll('.carousel-item');
    const dots = container.querySelectorAll('.dot');
    const state = carouselStates[productId];
    
    // Remove active from current
    items[state.currentIndex].classList.remove('active');
    dots[state.currentIndex].classList.remove('active');
    
    // Update index
    state.currentIndex = index;
    
    // Add active to new
    items[state.currentIndex].classList.add('active');
    dots[state.currentIndex].classList.add('active');
}



        
        // Color Selection Function 


// Select predefined color
function selectColor(productId, color, card) {
    selections[productId].color = color;
    const colorOptions = card.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        if (option.dataset.color === color) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Select custom color from color picker
function selectCustomColor(productId, color, card) {
    selections[productId].color = color;
    
    // Remove selection from predefined colors
    const colorOptions = card.querySelectorAll('.color-option');
    colorOptions.forEach(option => option.classList.remove('selected'));
}




        // WhatsApp Integration


function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    const selection = selections[productId];
    
    const selectedImage = getSelectedImage(productId);

    // Create WhatsApp message
    const message = `Hi! I'm interested in purchasing:

Product: ${product.name}
Price: ${product.price}
Color: ${selection.color}
Size: ${selection.size}

Product Image:
${window.location.origin}/${selectedImage}

Please let me know about availability and shipping details.`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}



        // Initialize the Products


function initializeProducts() {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) {
        console.error('Error: Product grid element not found!');
        return;
    }
    
    // Create and append all product cards
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
    
    console.log(`Successfully loaded ${products.length} products`);
}


        // Initialize the DOM


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
    initializeProducts();
}