export const updateCartValue = (cartProducts) => {
  try {
    const cartValue = document.querySelector("#cartValue");
    
    if (!cartValue) {
      console.warn("Cart value element not found");
      return;
    }
    
    if (!Array.isArray(cartProducts)) {
      cartProducts = [];
    }
    
    const totalItems = cartProducts.reduce((total, product) => {
      return total + (Number(product.quantity) || 0);
    }, 0);
    
    cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${totalItems}`;
    
    return totalItems;
  } catch (error) {
    console.error("Error updating cart value:", error);
    return 0;
  }
};