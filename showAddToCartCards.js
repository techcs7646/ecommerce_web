import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js";
import { getCartProductFromLS } from "./getCartProducts.js";
import { incrementDecrement } from "./incrementDecrement.js";
import { removeProdFromCart } from "./removeProdFromCart.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

// Products data - inline to avoid import issues
const products = [
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



let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);


const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    const lSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent =
      lSActualData.quantity;
    productClone.querySelector(".productPrice").textContent =
      lSActualData.price;

      productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);
      });
      
      productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => removeProdFromCart(id));
   

    cartElement.appendChild(productClone);
  });
};


showCartProduct();
updateCartProductTotal();

