document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");
    const totalPriceEl = document.getElementById("total-price");
    
    fetch("../data/productList.json")
        .then(response => response.json())
        .then(products => {
            Object.keys(products).forEach(category => {
                let categoryHeader = document.createElement("h3");
                categoryHeader.textContent = category;
                productList.appendChild(categoryHeader);

                products[category].forEach(product => {
                    let itemDiv = document.createElement("div");
                    itemDiv.innerHTML = `
                        <label>${product.name} - $${product.price}</label>
                        <input type="number" id="${product.sku}" min="0" value="0">
                    `;
                    productList.appendChild(itemDiv);
                });
            });
        });

    document.getElementById("calculate-quote").addEventListener("click", function() {
        let totalPrice = 0;
        document.querySelectorAll("#product-list input").forEach(input => {
            let quantity = parseInt(input.value);
            let productPrice = parseFloat(input.previousElementSibling.textContent.split("$")[1]);
            totalPrice += quantity * productPrice;
        });
        totalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
    });

    document.getElementById("confirm-order").addEventListener("click", function() {
        fetch("../functions/api.js", { method: "POST" })
            .then(response => response.json())
            .then(data => alert("Quote sent successfully!"));
    });
});
