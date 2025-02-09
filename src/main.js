document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/products.json")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            let category = "";

            products.forEach(product => {
                if (category !== product.category) {
                    category = product.category;
                    productList.innerHTML += `<h3>Category: ${category}</h3>`;
                }
                productList.innerHTML += `
                    <label>${product.name} ($${product.price}): 
                        <input type="number" min="0" id="${product.sku}" value="0">
                    </label>
                    <br>
                `;
            });
        });

    document.getElementById("calculate-quote").addEventListener("click", () => {
        let total = 0;
        let specialOrders = document.getElementById("special-requests").value.trim();
        document.querySelectorAll("#product-list input").forEach(input => {
            let quantity = parseInt(input.value);
            if (quantity > 0) {
                let price = parseFloat(input.parentElement.innerText.match(/\$(\d+\.\d+)/)[1]);
                total += quantity * price;
            }
        });

        let output = `Total Price: $${total.toFixed(2)}`;
        if (specialOrders.length > 0) {
            output += "\n\nSpecial Order Items:\n" + specialOrders + " - POA";
        }

        document.getElementById("total-price").innerText = output;
    });
});
