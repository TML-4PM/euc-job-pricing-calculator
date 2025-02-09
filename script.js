// Global Variables
let productList = [];
let allQuotes = [];
let currentQuote = null;
let specialOrders = [];
let extraOffer = null;

// Load product list from external JSON file
fetch('productList.json')
  .then(response => {
    if (!response.ok) throw new Error("Product list failed to load.");
    return response.json();
  })
  .then(data => {
    productList = data;
    generateProductCategories();
  })
  .catch(err => showError("Error loading product list. Please refresh and try again."));

// Function to show errors in UI
function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  document.body.prepend(errorDiv);
}

// Function to generate product categories and items
function generateProductCategories() {
  const categories = [...new Set(productList.map(product => product.category))];
  const productContainer = document.getElementById("product-categories");

  categories.forEach(category => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";

    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    const productListDiv = document.createElement("div");
    productListDiv.className = "product-list";

    productList
      .filter(product => product.category === category)
      .forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        const productLabel = document.createElement("label");
        productLabel.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productDiv.appendChild(productLabel);

        const productInput = document.createElement("input");
        productInput.type = "number";
        productInput.min = "0";
        productInput.value = "0";
        productInput.dataset.productId = product.id;
        productDiv.appendChild(productInput);

        productListDiv.appendChild(productDiv);
      });

    categoryDiv.appendChild(productListDiv);
    productContainer.appendChild(categoryDiv);
  });
}

// Function to parse email and auto-fill form
function parseEmailAndFillForm() {
 
::contentReference[oaicite:0]{index=0}
