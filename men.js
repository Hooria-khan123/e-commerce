let mens = [
  {
    id: 301,
    name: "Cotton Tee",
    description: "Soft cotton t-shirt perfect for daily wear",
    price: "$300",
    image: "./assets/n1.jpg",
  },
  {
    id: 302,
    name: "Slim Jeans",
    description: "Modern slim-fit jeans for versatile styling",
    price: "$250",
    image: "./assets/f1.jpg",
  },
  {
    id: 303,
    name: "Hoodie Warm",
    description: "Cozy hoodie perfect for chilly weather",
    price: "$29.65",
    image: "./assets/n2.jpg",
  },
  {
    id: 304,
    name: "Graphic Tee",
    description: "Stylish t-shirt featuring trendy prints",
    price: "$100",
    image: "./assets/f2.jpg",
  },
  {
    id: 305,
    name: "Blazer Jacket",
    description: "Sleek blazer for semi-formal or formal occasions",
    price: "$150",
    image: "./assets/f3.jpg",
  },
  {
    id: 306,
    name: "Leather Belt",
    description: "Durable belt to complement casual or formal wear",
    price: "$120",
    image: "./assets/dfsdf.jpg",
  },
  {
    id: 307,
    name: "Linen Shirt",
    description: "Breathable linen shirt for summer comfort",
    price: "$180",
    image: "./assets/f6.jpg",
  },
  {
    id: 308,
    name: "Cargo Shorts",
    description: "Functional cargo shorts with multiple pockets",
    price: "$245",
    image: "./assets/f7.jpg",
  },
];

let menClothsContainer = document.querySelector(".men-cloths");

let mencloth = "";

mens.forEach((men) => {
  mencloth += `
    <div class="product-item men-cloth">
      <div class="cloth-img">
        <img src="${men.image}" alt="${men.name}" />
      </div>
      <div class="description">
        <h3>${men.name}</h3>
        <p>${men.description}</p>
        <div class="price-cart">
          <span class="price">${men.price}</span>
<button class="add-to-cart-btn" onclick="addToCartSimple(1)">
  Add to Cart
</button>
        </div>
      </div>
    </div>`;
});
menClothsContainer.innerHTML = mencloth;