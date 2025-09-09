import { getCartProductFromLS } from "./getCartProducts.js";

export const fetchQuantityFromCartLS = (id, price) => {
  try {
    let cartProducts = getCartProductFromLS();
    
    if (!Array.isArray(cartProducts)) {
      return { quantity: 1, price: price || 0 };
    }

    let existingProduct = cartProducts.find((curProd) => curProd.id === id);
    let quantity = 1;
    let finalPrice = price || 0;

    if (existingProduct) {
      quantity = Number(existingProduct.quantity) || 1;
      finalPrice = Number(existingProduct.unitPrice) || Number(existingProduct.price) || price || 0;
    }

    return { 
      quantity: Math.max(1, quantity), 
      price: Math.max(0, finalPrice) 
    };
  } catch (error) {
    console.error("Error fetching quantity from cart:", error);
    return { quantity: 1, price: price || 0 };
  }
};
