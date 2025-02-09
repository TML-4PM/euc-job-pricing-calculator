document.addEventListener("DOMContentLoaded", async function () {
    const productList = document.getElementById("product-list");
    const calculateButton = document.getElementById("calculateQuote");
    const quoteResult = document.getElementById("quoteResult");
    
    // Load products from JSON
    let products = await fetch('/data/products.json').then(res => res.json());
    products.forEach(product => {
        let div = document.createElement("div");
        div.innerHTML = `<label>${product.name} - $${product.price}</label>
                         <input type="number" id="qty-${product.id}" min="0" value="0">`;
        productList.appendChild(div);
    });

    // Calculate Quote
    calculateButton.addEventListener("click", () => {
        let total = 0;
        products.forEach(product => {
            let quantity = parseInt(document.getElementById(`qty-${product.id}`).value);
            total += product.price * quantity;
        });
        quoteResult.innerHTML = `Total Quote: $${total.toFixed(2)}`;
    });

    // Confirm Order
    document.getElementById("confirmOrder").addEventListener("click", () => {
        alert("Order Confirmed! A copy of your quote will be sent via email.");
    });
});
