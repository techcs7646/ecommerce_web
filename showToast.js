export function showToast(operation, id) {
  try {
    const toast = document.createElement("div");
    toast.classList.add("toast");
  
    // Set the text content of the toast based on the operation
    if (operation === "add") {
      toast.textContent = `Product added to cart successfully! 🛒`;
      toast.style.background = "linear-gradient(135deg, #10b981, #059669)";
    } else if (operation === "remove" || operation === "delete") {
      toast.textContent = `Product removed from cart! 🗑️`;
      toast.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
    } else if (operation === "error") {
      toast.textContent = typeof id === 'string' ? id : `Error: ${id}`;
      toast.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
    } else {
      toast.textContent = `Cart updated! ✅`;
      toast.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
    }
  
    document.body.appendChild(toast);
  
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3000);
    
    // Allow manual removal by clicking
    toast.addEventListener('click', () => {
      if (toast.parentNode) {
        toast.remove();
      }
    });
    
  } catch (error) {
    console.error("Error showing toast:", error);
  }
}