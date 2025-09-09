import { getCartProductFromLS } from "./getCartProducts.js";

export const updateCartProductTotal = () => {
  try {
    console.log("Updating cart product totals...");
    
    const productSubTotal = document.querySelector(".productSubTotal");
    const productFinalTotal = document.querySelector(".productFinalTotal");
    
    // Check if cart total elements exist (only on cart page)
    if (!productSubTotal || !productFinalTotal) {
      console.log("Cart total elements not found - not on cart page");
      return false;
    }
    
    // Get cart products with validation
    let localCartProducts = getCartProductFromLS();
    
    if (!Array.isArray(localCartProducts)) {
      console.error("Cart products is not an array");
      localCartProducts = [];
    }
    
    // Calculate total with proper decimal handling
    const totalProductPrice = localCartProducts.reduce((accum, curElem) => {
      try {
        // Handle both number and string prices with proper decimal parsing
        let productPrice = parseFloat(curElem.price) || 0;
        
        if (isNaN(productPrice) || productPrice < 0) {
          console.warn(`Invalid price for product:`, curElem);
          productPrice = 0;
        }
        
        return accum + productPrice;
      } catch (error) {
        console.error("Error processing product price:", error, curElem);
        return accum;
      }
    }, 0);
    
    // Tax calculation (you can adjust this as needed)
    const taxAmount = 50; // Fixed tax amount
    const finalTotal = totalProductPrice + taxAmount;
    
    // Update DOM elements with proper currency formatting
    productSubTotal.textContent = `$${totalProductPrice.toFixed(2)}`;
    productFinalTotal.textContent = `$${finalTotal.toFixed(2)}`;
    
    console.log(`Cart totals updated - Subtotal: $${totalProductPrice.toFixed(2)}, Final: $${finalTotal.toFixed(2)}`);
    return true;
    
  } catch (error) {
    console.error("Error updating cart product total:", error);
    
    // Fallback: set totals to 0 if there's an error
    const productSubTotal = document.querySelector(".productSubTotal");
    const productFinalTotal = document.querySelector(".productFinalTotal");
    
    if (productSubTotal) productSubTotal.textContent = "$0.00";
    if (productFinalTotal) productFinalTotal.textContent = "$50.00";
    
    return false;
  }
}