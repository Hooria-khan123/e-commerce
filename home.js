// ==================== rendering best prodct =============
let items = [
  {
    id: 1,
    name: "Denim Shirt",
    description:
      "Minimalist denim shirt designed for everyday comfort and style.",
    price: "$300",
    image: "./assets/p1.png",
  },
  {
    id: 2,
    name: "Sport Flex",
    description: "Breathable shorts ideal for workouts and running",
    price: "$250",
    image: "./assets/sl3.png",
  },
  {
    id: 3,
    name: "Leather Belt",
    description: "Durable belt to complement casual or formal wear",
    price: "$120",
    image: "./assets/dfsdf.jpg",
  },
  {
    id: 4,
    name: "Classic Sneakers",
    description: "Timeless sneakers for versatile outfits",
    price: "$150",
    image: "./assets/shoes5.png",
  },
  {
    id: 5,
    name: "Tennis Shoes",
    description: "Shoes for indoor and outdoor sports",
    price: "$545",
    image: "./assets/shoes8.png",
  },
  {
    id: 6,
    name: "Cutoff Classic",
    description: "Classic denim cut-off shorts for daily styling",
    price: "$120",
    image: "./assets/p6.png",
  },
  {
    id: 7,
    name: "Linen Shirt",
    description: "Breathable linen shirt for summer comfort",
    price: "$180",
    image: "./assets/f6.jpg",
  },
  {
    id: 8,
    name: "Lounge Soft",
    description: "Soft shorts perfect for home and casual wear",
    price: "$245",
    image: "./assets/p8.png",
  },
];

let itemsContainer = document.querySelector(".items-container");

let innerHTML = "";
items.forEach((item) => {
  innerHTML += `
    <div class="product-item item-container">
      <div class="item-container-img">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="description">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price-cart">
          <span class="price">${item.price}</span>
<button class="add-to-cart-btn">
  Add to Cart
</button>
        </div>
      </div>
    </div>
    `;
});
itemsContainer.innerHTML = innerHTML;
