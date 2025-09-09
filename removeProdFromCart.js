import { getCartProductFromLS } from "./getCartProducts.js";
import { showToast } from "./showToast.js";
import { updateCartValue } from "./updateCartValue.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

export const removeProdFromCart = (id) => {
  try {
    console.log(`Removing product with id: ${id}`);
    
    // Get current cart products
    let cartProducts = getCartProductFromLS();
    
    if (!Array.isArray(cartProducts)) {
      console.error("Cart products is not an array");
      return false;
    }
    
    // Check if product exists in cart
    const productExists = cartProducts.some((curProd) => curProd.id === id);
    if (!productExists) {
      console.warn(`Product with id ${id} not found in cart`);
      showToast("error", "Product not found in cart");
      return false;
    }
    
    // Filter out the product to remove
    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);
    
    // Update localStorage
    localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));
    
    // Remove product element from DOM
    let removeDiv = document.getElementById(`card${id}`);
    if (removeDiv) {
      removeDiv.remove();
      showToast("delete", id);
    } else {
      console.warn(`Product element with id card${id} not found in DOM`);
    }
    
    // Update cart value in navbar
    updateCartValue(cartProducts);
    
    // Update cart totals if we're on the cart page
    const productSubTotal = document.querySelector(".productSubTotal");
    if (productSubTotal) {
      updateCartProductTotal();
    }
    
    console.log(`Product ${id} successfully removed from cart`);
    return true;
    
  } catch (error) {
    console.error("Error removing product from cart:", error);
    showToast("error", "Failed to remove product from cart");
    return false;
  }
}