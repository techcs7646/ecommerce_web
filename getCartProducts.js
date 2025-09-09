import { updateCartValue } from "./updateCartValue.js";

export const getCartProductFromLS = () => {
  try {
    let cartProducts = localStorage.getItem("cartProductLS");
    
    if (!cartProducts) {
      return [];
    }
    
    cartProducts = JSON.parse(cartProducts);
    
    // Validate that cartProducts is an array
    if (!Array.isArray(cartProducts)) {
      console.warn("Cart data is not an array, resetting cart");
      localStorage.removeItem("cartProductLS");
      return [];
    }
    
    // Validate each cart item
    cartProducts = cartProducts.filter(product => {
      return product && 
             typeof product.id !== 'undefined' && 
             typeof product.quantity === 'number' && 
             product.quantity > 0 &&
             typeof product.price === 'number' && 
             product.price >= 0;
    });
    
    // Update localStorage with cleaned data
    if (cartProducts.length !== JSON.parse(localStorage.getItem("cartProductLS") || "[]").length) {
      localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));
    }
    
    updateCartValue(cartProducts);
    return cartProducts;
    
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    localStorage.removeItem("cartProductLS");
    return [];
  }
};
