let womens = [
  {
    id: 201,
    name: "Denim Shirt",
    description: "Minimalist denim shirt designed for everyday comfort and style.",
    price: "$300",
    image: "./assets/p1.png",
  },
  {
    id: 202,
    name: "Sport Flex",
    description: "Breathable shorts ideal for workouts and running",
    price: "$250",
    image: "./assets/sl3.png",
  },
  {
    id: 203,
    name: "Linen Relax",
    description: "Comfortable linen shorts for hot sunny days",
    price: "$29.65",
    image: "./assets/p3.png",
  },
  {
    id: 204,
    name: "Jersey Comfy",
    description: "Comfy jersey shorts for lounging or workouts",
    price: "$100",
    image: "./assets/p4.png",
  },
  {
    id: 205,
    name: "Stretch High",
    description: "Stretchable high-rise shorts for freedom of movement",
    price: "$150",
    image: "./assets/p5.png",
  },
  {
    id: 206,
    name: "Cutoff Classic",
    description: "Classic denim cut-off shorts for daily styling",
    price: "$120",
    image: "./assets/p6.png",
  },
  {
    id: 207,
    name: "Cargo Style",
    description: "Trendy cargo shorts with functional pockets",
    price: "$180",
    image: "./assets/bg.png",
  },
  {
    id: 208,
    name: "Lounge Soft",
    description: "Soft shorts perfect for home and casual wear",
    price: "$245",
    image: "./assets/p8.png",
  },
];

let womenClothsContainer = document.querySelector(".women-cloths");
let clothHtml = "";
womens.forEach((women) => {
  clothHtml += `
    <div class="product-item women-cloth">
      <div class="cloth-img">
        <img src="${women.image}" alt="${women.name}" />
      </div>
      <div class="description">
        <h3>${women.name}</h3>
        <p>${women.description}</p>
        <div class="price-cart">
          <span class="price">${women.price}</span>
        <button class="add-to-cart-btn">
           Add to Cart
        </button>
        </div>
      </div>
    </div>`;
});
womenClothsContainer.innerHTML = clothHtml;