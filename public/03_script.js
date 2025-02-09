document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/04_productList.json")
        .then(response => response.json())
        .then(data => populateProducts(data.products))
        .catch(error => console.error("Error loading product list:", error));
    
    document.getElementById("calculate-quote").addEventListener("click", calculateTotal);
});

function populateProducts(products) {
    const productContainer = document.getElementById("product-list");
    
    products.forEach(category => {
        let categoryHeader = document.createElement("h3");
        categoryHeader.innerText = category.category;
        productContainer.appendChild(categoryHeader);

        category.items.forEach(product => {
            let productEntry = document.createElement("div");
            productEntry.innerHTML = `
                <label>${product.name} ($${product.price}):</label>
                <input type="number" id="${product.sku}" min="0" value="0">
            `;
            productContainer.appendChild(productEntry);
        });
    });
}

function calculateTotal() {
    let total = 0;
    
    document.querySelectorAll("#product-list input").forEach(input => {
        let quantity = parseInt(input.value);
        let price = parseFloat(input.getAttribute("data-price"));
        total += quantity * price;
    });

    document.getElementById("total-price").innerText = `$${total.toFixed(2)}`;
}
