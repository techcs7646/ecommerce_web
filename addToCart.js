import { getCartProductFromLS } from "./getCartProducts.js";
import { showToast } from "./showToast.js";
import { updateCartValue } from "./updateCartValue.js";

export const addToCart = (event, id, stock) => {
  try {
    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    if (!currentProdElem) {
      console.error(`Product element with id card${id} not found`);
      return false;
    }

    const quantityElem = currentProdElem.querySelector(".productQuantity");
    const priceElem = currentProdElem.querySelector(".productPrice");
    
    if (!quantityElem || !priceElem) {
      console.error("Quantity or price element not found");
      return false;
    }

    let quantity = Number(quantityElem.innerText) || 1;
    let price = priceElem.innerText;
    
    // Remove currency symbols and clean price
    price = price.replace(/[$€£¥₹,]/g, "").trim();
    let unitPrice = Number(price);
    
    if (isNaN(unitPrice) || unitPrice <= 0) {
      console.error("Invalid price value");
      return false;
    }

    if (quantity <= 0 || quantity > stock) {
      showToast("error", `Invalid quantity. Stock available: ${stock}`);
      return false;
    }

    let existingProd = arrLocalStorageProduct.find(
      (curProd) => curProd.id === id
    );

    if (existingProd) {
      // Update existing product quantity
      const newQuantity = Number(existingProd.quantity) + quantity;
      
      if (newQuantity > stock) {
        showToast("error", `Cannot add more items. Stock limit: ${stock}`);
        return false;
      }
      
      existingProd.quantity = newQuantity;
      existingProd.price = unitPrice * newQuantity;
      
      localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
      updateCartValue(arrLocalStorageProduct);
      showToast("add", id);
      return true;
    }

    // Add new product to cart
    const totalPrice = unitPrice * quantity;
    arrLocalStorageProduct.push({ 
      id: id, 
      quantity: quantity, 
      price: totalPrice,
      unitPrice: unitPrice
    });
    
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
    updateCartValue(arrLocalStorageProduct);
    showToast("add", id);
    
    return true;
    
  } catch (error) {
    console.error("Error adding product to cart:", error);
    showToast("error", "Failed to add product to cart");
    return false;
  }
};