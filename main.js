import "./style.css";
import { showProductContainer } from "./homeProductCards.js";
import { getCartProductFromLS } from "./getCartProducts.js";

// Fallback products data for offline/error scenarios
const fallbackProducts = [
  {
    "id": 1,
    "name": "MacBook Pro 16\" M3",
    "category": "Laptops",
    "brand": "Apple",
    "price": 2499.99,
    "stock": 25,
    "description": "Supercharged by M3 Pro chip. 16-inch Liquid Retina XDR display, 18GB unified memory, 512GB SSD storage. Perfect for creative professionals.",
    "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&crop=center"
  },
  {
    "id": 2,
    "name": "iPhone 15 Pro Max",
    "category": "Smartphones",
    "brand": "Apple",
    "price": 1199.99,
    "stock": 50,
    "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
    "description": "Titanium design with A17 Pro chip. 6.7-inch Super Retina XDR display, 256GB storage, Pro camera system with 5x telephoto zoom."
  },
  {
    "id": 3,
    "name": "Sony WH-1000XM5",
    "category": "Audio",
    "brand": "Sony",
    "price": 399.99,
    "stock": 35,
    "image": "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=300&fit=crop&crop=center",
    "description": "Industry-leading noise canceling headphones. 30-hour battery life, premium sound quality, comfortable lightweight design."
  },
  {
    "id": 4,
    "name": "Apple Watch Ultra 2",
    "category": "Wearables",
    "brand": "Apple",
    "price": 799.99,
    "stock": 20,
    "image": "https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?w=400&h=300&fit=crop&crop=center",
    "description": "Most rugged and capable Apple Watch. 49mm titanium case, Action Button, precision dual-frequency GPS, up to 36 hours of battery life."
  },
  {
    "id": 5,
    "name": "JBL Charge 5",
    "category": "Speakers",
    "brand": "JBL",
    "price": 179.99,
    "stock": 40,
    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&crop=center",
    "description": "Powerful portable Bluetooth speaker with IP67 waterproof rating. 20 hours of playtime, PartyBoost compatible, built-in powerbank."
  },
  {
    "id": 6,
    "name": "Samsung 65\" OLED 4K TV",
    "category": "Television",
    "brand": "Samsung",
    "price": 1899.99,
    "stock": 15,
    "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&crop=center",
    "description": "65-inch OLED 4K Smart TV with Quantum HDR OLED technology. Tizen OS, gaming hub, voice control, and cinematic viewing experience."
  },
  {
    "id": 7,
    "name": "iPad Pro 12.9\" M2",
    "category": "Tablets",
    "brand": "Apple",
    "price": 1099.99,
    "stock": 30,
    "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop&crop=center",
    "description": "12.9-inch Liquid Retina XDR display powered by M2 chip. 128GB storage, Apple Pencil support, perfect for creative work and productivity."
  },
  {
    "id": 8,
    "name": "AirPods Pro (3rd Gen)",
    "category": "Audio",
    "brand": "Apple",
    "price": 249.99,
    "stock": 60,
    "image": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop&crop=center",
    "description": "Active Noise Cancellation, Transparency mode, Spatial Audio, up to 6 hours of listening time with a single charge."
  }
];

// Global products variable
let products = [];

// Function to fetch products from API with fallback
async function fetchProducts() {
  try {
    console.log("Attempting to fetch products from API...");
    
    // Try to fetch from API first
    const response = await fetch('./api/products.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid or empty products data from API');
    }
    
    console.log("Products fetched successfully from API:", data.length, "items");
    return data;
    
  } catch (error) {
    console.warn("Failed to fetch from API, using fallback data:", error.message);
    return fallbackProducts;
  }
}

// Function to validate product data
function validateProductData(products) {
  try {
    if (!Array.isArray(products)) {
      throw new Error('Products data is not an array');
    }
    
    return products.filter(product => {
      return product && 
             typeof product.id !== 'undefined' && 
             product.name && 
             typeof product.price === 'number' && 
             product.image;
    });
  } catch (error) {
    console.error('Error validating product data:', error);
    return fallbackProducts;
  }
}

// Initialize application
async function initializeApp() {
  try {
    console.log("Initializing ModernMart application...");
    
    // Load existing cart data
    getCartProductFromLS();
    
    // Fetch products
    const fetchedProducts = await fetchProducts();
    products = validateProductData(fetchedProducts);
    
    console.log("Final products data:", products.length, "valid items");
    
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        initializeProducts();
      });
    } else {
      initializeProducts();
    }
    
  } catch (error) {
    console.error("Error initializing application:", error);
    // Use fallback data in case of any error
    products = fallbackProducts;
    initializeProducts();
  }
}

function initializeProducts() {
  try {
    console.log("DOM ready, loading products...");
    
    if (!products || products.length === 0) {
      console.warn("No products available, using fallback");
      products = fallbackProducts;
    }
    
    const result = showProductContainer(products);
    
    if (!result) {
      console.error("Failed to load products");
      showErrorMessage();
    } else {
      console.log("Products loaded successfully!");
    }
  } catch (error) {
    console.error("Error in initializeProducts:", error);
    showErrorMessage();
  }
}

function showErrorMessage() {
  const container = document.querySelector("#productContainer");
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem; background: white; border-radius: var(--radius-lg); margin: 2rem 0; box-shadow: var(--shadow);">
        <h3 style="color: var(--primary-600); margin-bottom: 1rem;">🛒 Products Loading...</h3>
        <p style="color: var(--gray-600); margin-bottom: 2rem;">We're working to load the latest products for you.</p>
        <button onclick="location.reload()" style="padding: 1rem 2rem; background: var(--primary-600); color: white; border: none; border-radius: var(--radius); cursor: pointer; font-weight: 500; transition: all 0.3s ease;" onmouseover="this.style.background='var(--primary-700)'" onmouseout="this.style.background='var(--primary-600)'">
          🔄 Refresh Page
        </button>
      </div>
    `;
  }
}

// Export products for use in other modules
export { products };

// Start the application
initializeApp();