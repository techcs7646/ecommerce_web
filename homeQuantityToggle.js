export const homeQuantityToggle = (event, id, stock) => {
  try {
    const currentCardElement = document.querySelector(`#card${id}`);
    
    if (!currentCardElement) {
      console.error(`Card element with id card${id} not found`);
      return 1;
    }
  
    const productQuantity = currentCardElement.querySelector(".productQuantity");
    
    if (!productQuantity) {
      console.error("Product quantity element not found");
      return 1;
    }
  
    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 
                   parseInt(productQuantity.innerText) || 1;
    
    const maxStock = Number(stock) || 999;
  
    if (event.target.className === "cartIncrement") {
      if (quantity < maxStock) {
        quantity += 1;
      } else {
        // Show feedback when max stock reached
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.textContent = `Maximum stock available: ${maxStock}`;
        toast.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
        document.body.appendChild(toast);
        setTimeout(() => {
          if (toast.parentNode) {
            toast.remove();
          }
        }, 2000);
      }
    }
  
    if (event.target.className === "cartDecrement") {
      if (quantity > 1) {
        quantity -= 1;
      }
    }
  
    // Update both text content and data attribute
    productQuantity.innerText = quantity;
    productQuantity.setAttribute("data-quantity", quantity.toString());
    
    return quantity;
    
  } catch (error) {
    console.error("Error in homeQuantityToggle:", error);
    return 1;
  }
};