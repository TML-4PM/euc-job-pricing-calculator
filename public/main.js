document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    setupFormHandlers();
});

function loadProducts() {
    fetch('./data/04_productList.json')
        .then(response => response.json())
        .then(data => {
            const productListDiv = document.getElementById('product-list');
            data.products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.innerHTML = `
                    <label>
                        <input type="checkbox" name="products" value="${product.sku}">
                        ${product.name} - $${product.price}
                    </label>
                    <input type="number" name="quantity-${product.sku}" min="0" placeholder="Quantity">
                `;
                productListDiv.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error loading product list:', error));
}

function setupFormHandlers() {
    document.getElementById("quote-form").addEventListener("submit", event => {
        event.preventDefault();
        generateQuote();
    });
}

function generateQuote() {
    const selectedProducts = [];
    document.querySelectorAll('input[name="products"]:checked').forEach(checkbox => {
        const quantityInput = document.querySelector(`input[name="quantity-${checkbox.value}"]`);
        if (quantityInput && quantityInput.value > 0) {
            selectedProducts.push({
                sku: checkbox.value,
                quantity: quantityInput.value
            });
        }
    });

    const email = document.getElementById("email").value;
    const scheduleDate = document.getElementById("schedule-date").value;
    
    const quoteDetails = {
        email,
        scheduleDate,
        products: selectedProducts
    };

    console.log("Generated Quote:", quoteDetails);
}
