import { addToCart } from "./addToCart.js";
import { homeQuantityToggle } from "./homeQuantityToggle.js";

const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

export const showProductContainer = (products) => {
  try {
    console.log("showProductContainer called with:", products);
    
    if (!productContainer) {
      console.error("Product container not found");
      return false;
    }
    
    if (!productTemplate) {
      console.error("Product template not found");
      return false;
    }
    
    if (!products || !Array.isArray(products)) {
      console.error("Products data is invalid:", products);
      return false;
    }

    // Clear existing products
    productContainer.innerHTML = "";

    products.forEach((curProd) => {
      try {
        const { brand, category, description, id, image, name, price, stock } = curProd;
        
        console.log(`Processing product ${id}:`, curProd);

        const productClone = document.importNode(productTemplate.content, true);

        // Set unique card ID
        const cardElement = productClone.querySelector("#cardValue");
        if (cardElement) {
          cardElement.setAttribute("id", `card${id}`);
        }

        // Set product data
        const categoryElem = productClone.querySelector(".category");
        if (categoryElem) categoryElem.textContent = category || "Unknown";
        
        const nameElem = productClone.querySelector(".productName");
        if (nameElem) nameElem.textContent = name || "Product Name";
        
        const imageElem = productClone.querySelector(".productImage");
        if (imageElem) {
          imageElem.src = image || "https://via.placeholder.com/400x300?text=No+Image";
          imageElem.alt = name || "Product Image";
          imageElem.onerror = () => {
            imageElem.src = "https://via.placeholder.com/400x300?text=Image+Error";
          };
        }
        
        const stockElem = productClone.querySelector(".productStock");
        if (stockElem) stockElem.textContent = stock || "0";
        
        const descElem = productClone.querySelector(".productDescription");
        if (descElem) descElem.textContent = description || "No description available";
        
        const priceElem = productClone.querySelector(".productPrice");
        if (priceElem) priceElem.textContent = `$${price || 0}`;
        
        const actualPriceElem = productClone.querySelector(".productActualPrice");
        if (actualPriceElem) actualPriceElem.textContent = `$${((price || 0) * 1.3).toFixed(2)}`;

        // Set initial quantity
        const quantityElem = productClone.querySelector(".productQuantity");
        if (quantityElem) {
          quantityElem.textContent = "1";
          quantityElem.setAttribute("data-quantity", "1");
        }

        // Add event listeners
        const stockElement = productClone.querySelector(".stockElement");
        if (stockElement) {
          stockElement.addEventListener("click", (event) => {
            homeQuantityToggle(event, id, stock);
          });
        }

        const addToCartBtn = productClone.querySelector(".add-to-cart-button");
        if (addToCartBtn) {
          addToCartBtn.addEventListener("click", (event) => {
            addToCart(event, id, stock);
          });
        }

        productContainer.append(productClone);
        console.log(`Product ${id} added to container successfully`);
        
      } catch (productError) {
        console.error(`Error processing product ${curProd?.id}:`, productError);
      }
    });
    
    console.log(`Successfully loaded ${products.length} products`);
    return true;
    
  } catch (error) {
    console.error("Error in showProductContainer:", error);
    
    // Show error message to user
    if (productContainer) {
      productContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem; color: var(--error);">
          <h3>Unable to load products</h3>
          <p>Please refresh the page or try again later.</p>
        </div>
      `;
    }
    return false;
  }
};