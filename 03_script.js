document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("productList");

    // Pre-fill email if available
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (email) document.getElementById("email").value = email;

    try {
        const response = await fetch('/data/productList.json');
        const products = await response.json();

        products.forEach(product => {
            const div = document.createElement("div");
            div.innerHTML = `
                <label>
                    <input type="checkbox" class="product-checkbox" data-price="${product.price}" data-name="${product.name}">
                    ${product.name} - $${product.price}
                </label>
                <input type="number" class="product-quantity" min="1" value="1">
            `;
            productList.appendChild(div);
        });
    } catch (error) {
        productList.innerHTML = "<p>Error loading products.</p>";
    }
});

document.getElementById("quoteForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let total = 0;
    const selectedProducts = [];
    document.querySelectorAll(".product-checkbox:checked").forEach((checkbox, index) => {
        const price = parseFloat(checkbox.dataset.price);
        const name = checkbox.dataset.name;
        const quantity = document.querySelectorAll(".product-quantity")[index].value;

        total += price * quantity;
        selectedProducts.push({ name, quantity, price });
    });

    // SmartAssist Add-ons
    if (document.getElementById("smartAssist19").checked) total += 19.99;
    if (document.getElementById("smartAssist29").checked) total += 29.99;

    // Display the quote
    document.getElementById("quoteResult").textContent = `Total Quote: $${total.toFixed(2)}`;

    // TODO: Send data to backend for PDF generation and tracking
});
