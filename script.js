/* =====================================================
   SIDDHIVINAYAK FOODS
   MAIN JAVASCRIPT
===================================================== */


/* =========================
   PRODUCTS
========================= */

const defaultProducts = [

  {
    id: 1,
    name: "Special Farsan",
    category: "Farsan",
    price: 180,
    image: "images/farsan.jpg",
    description: "ताजे आणि कुरकुरीत खास फरसाण"
  },

  {
    id: 2,
    name: "Makai Chevdo",
    category: "Chevdo",
    price: 160,
    image: "images/chevdo.jpg",
    description: "चविष्ट आणि कुरकुरीत मकाई चिवडा"
  },

  {
    id: 3,
    name: "Gathiya",
    category: "Namkeen",
    price: 150,
    image: "images/gathiya.jpg",
    description: "पारंपरिक चवीचे crispy गाठिया"
  },

  {
    id: 4,
    name: "Sev Mamra",
    category: "Namkeen",
    price: 140,
    image: "images/sev-mamra.jpg",
    description: "चहासोबत खाण्यासाठी perfect snack"
  }

];


/* =========================
   GET PRODUCTS
========================= */

function getProducts() {

  const savedProducts =
    JSON.parse(localStorage.getItem("products"));

  if (savedProducts && savedProducts.length) {
    return savedProducts;
  }

  return defaultProducts;
}


/* =========================
   CART
========================= */

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();
}


function updateCartCount() {

  const count =
    document.getElementById("cart-count");

  if (!count) return;

  const total =
    cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

  count.textContent = total;
}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

  const product =
    getProducts().find(
      item => item.id == id
    );

  if (!product) return;


  const existing =
    cart.find(
      item => item.id == id
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });

  }


  saveCart();


  alert(
    `${product.name} cart मध्ये add झाले! 🛒`
  );
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(id, amount) {

  const item =
    cart.find(
      product => product.id == id
    );

  if (!item) return;


  item.quantity += amount;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product => product.id != id
      );

  }


  saveCart();

  renderCart();
}


/* =========================
   REMOVE
========================= */

function removeFromCart(id) {

  cart =
    cart.filter(
      product => product.id != id
    );

  saveCart();

  renderCart();
}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {

  const container =
    document.getElementById(
      "featured-products"
    );


  if (!container) return;


  const products =
    getProducts().slice(0, 4);


  container.innerHTML =
    products.map(product => `

      <div class="product-card">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            onerror="showPlaceholder(this,'${product.name}')"
          >

        </div>


        <div class="product-info">

          <span class="category">
            ${product.category}
          </span>

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.description}
          </p>


          <div class="product-bottom">

            <span class="price">
              ₹${product.price}
            </span>

            <button
              class="add-btn"
              onclick="addToCart(${product.id})"
            >
              ADD +
            </button>

          </div>

        </div>

      </div>

    `).join("");
}


/* =========================
   SHOP PAGE
========================= */

function renderShop(
  category = "All"
) {

  const container =
    document.getElementById(
      "shop-products"
    );

  if (!container) return;


  let products =
    getProducts();


  if (category !== "All") {

    products =
      products.filter(
        product =>
          product.category === category
      );

  }


  container.innerHTML =
    products.map(product => `

      <div class="product-card">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            onerror="showPlaceholder(this,'${product.name}')"
          >

        </div>


        <div class="product-info">

          <span class="category">
            ${product.category}
          </span>

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.description}
          </p>


          <div class="product-bottom">

            <span class="price">
              ₹${product.price}
            </span>

            <button
              class="add-btn"
              onclick="addToCart(${product.id})"
            >
              ADD +
            </button>

          </div>

        </div>

      </div>

    `).join("");
}


/* =========================
   CART PAGE
========================= */

function renderCart() {

  const container =
    document.getElementById(
      "cart-items"
    );

  const totalElement =
    document.getElementById(
      "cart-total"
    );


  if (!container) return;


  if (cart.length === 0) {

    container.innerHTML = `

      <div style="
        padding:50px;
        text-align:center;
        color:#777;
      ">

        <div style="
          font-size:50px;
          margin-bottom:15px;
        ">
          🛒
        </div>

        <h2>Your cart is empty</h2>

        <p>
          तुमच्या आवडीचे पदार्थ add करा.
        </p>

        <br>

        <a
          href="shop.html"
          class="btn btn-red"
        >
          Shop Now
        </a>

      </div>

    `;


    if (totalElement) {
      totalElement.textContent = "0";
    }

    return;
  }


  let total = 0;


  container.innerHTML =
    cart.map(item => {

      const itemTotal =
        item.price * item.quantity;

      total += itemTotal;


      return `

        <div class="cart-item">

          <div class="cart-item-info">

            <h3>
              ${item.name}
            </h3>

            <p>
              ₹${item.price} each
            </p>

          </div>


          <div class="cart-controls">

            <button
              class="qty-btn"
              onclick="changeQuantity(${item.id},-1)"
            >
              −
            </button>

            <strong>
              ${item.quantity}
            </strong>

            <button
              class="qty-btn"
              onclick="changeQuantity(${item.id},1)"
            >
              +
            </button>

            <strong>
              ₹${itemTotal}
            </strong>

            <button
              class="remove-btn"
              onclick="removeFromCart(${item.id})"
            >
              Remove
            </button>

          </div>

        </div>

      `;

    }).join("");


  if (totalElement) {

    totalElement.textContent =
      total;

  }

}


/* =========================
   CHECKOUT
========================= */

function checkout() {

  if (!cart.length) {

    alert("Cart रिकामी आहे.");

    return;

  }


  let message =
    "नमस्कार, मला खालील products order करायचे आहेत:%0A%0A";


  cart.forEach(item => {

    message +=
      `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}%0A`;

  });


  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );


  message +=
    `%0ATotal: ₹${total}`;


  window.open(
    `https://wa.me/919881013475?text=${message}`,
    "_blank"
  );

}


/* =========================
   IMAGE PLACEHOLDER
========================= */

function showPlaceholder(
  img,
  text = "SIDDHIVINAYAK"
) {

  const canvas =
    document.createElement("canvas");

  canvas.width = 800;
  canvas.height = 500;


  const ctx =
    canvas.getContext("2d");


  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      800,
      500
    );


  gradient.addColorStop(
    0,
    "#a90810"
  );

  gradient.addColorStop(
    1,
    "#e83238"
  );


  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    0,
    800,
    500
  );


  ctx.fillStyle = "#f5b335";

  ctx.font =
    "bold 55px Arial";

  ctx.textAlign =
    "center";


  ctx.fillText(
    "सिद्धिविनायक",
    400,
    220
  );


  ctx.fillStyle = "#fff";

  ctx.font =
    "bold 35px Arial";


  ctx.fillText(
    text,
    400,
    290
  );


  img.src =
    canvas.toDataURL(
      "image/jpeg"
    );
}


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateCartCount();

    renderProducts();

    renderCart();

  }
);