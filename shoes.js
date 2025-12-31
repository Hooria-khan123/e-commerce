        // Shoes Data
        let shoes = [
            {
                id: 401,
                name: "Running Shoes",
                description: "Comfortable shoes for fitness and training",
                price: "$300",
                image: "./assets/shoes7.png",
            },
            {
                id: 402,
                name: "Slip Sneakers",
                description: "Easy to wear casual sneakers",
                price: "$250",
                image: "./assets/shoes8.png",
            },
            {
                id: 403,
                name: "Leather Oxford",
                description: "Elegant shoes for formal or office occasions",
                price: "$295",
                image: "./assets/shoes6.png",
            },
            {
                id: 404,
                name: "Sports Trainers",
                description: "Breathable shoes designed for athletic activities",
                price: "$100",
                image: "./assets/shoes5.png",
            },
            {
                id: 405,
                name: "Classic Sneakers",
                description: "Timeless sneakers for versatile outfits",
                price: "$150",
                image: "./assets/shoes4.png",
            },
            {
                id: 406,
                name: "Leather Boots",
                description: "Durable boots for outdoor and casual wear",
                price: "$160",
                image: "./assets/shoes3.png",
            },
            {
                id: 407,
                name: "Running Sneakers",
                description: "Lightweight shoes for jogging and workouts",
                price: "$180",
                image: "./assets/shoes2.png",
            },
            {
                id: 408,
                name: "Tennis Shoes",
                description: "Shoes for indoor and outdoor sports",
                price: "$545",
                image: "./assets/shoes1.png",
            },
        ];

        // Render Shoes
        let shoesContainer = document.querySelector(".shoes-collections");
        let shoeCon = "";

        shoes.forEach((shoe) => {
            shoeCon += `
                <div class="product-item shoes-collection">
                    <div class="shoe-img">
                        <img src="${shoe.image}" alt="${shoe.name}" />
                    </div>
                    <div class="description">
                        <h3>${shoe.name}</h3>
                        <p>${shoe.description}</p>
                        <div class="price-cart">
                            <span class="price">${shoe.price}</span>
<button class="add-to-cart-btn" onclick="addToCartSimple(1)">
  Add to Cart
</button>


                        </div>
                    </div>
                </div>
            `;
        });

        shoesContainer.innerHTML = shoeCon;