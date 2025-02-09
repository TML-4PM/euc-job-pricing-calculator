document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    setupFormHandlers();
});

function loadProducts() {
    fetch('./data/04_productList.json')
        .then(response => response.json())
        .then(data => {
            const productListDiv = document.getElementById('product-list');
            Object.keys(data.products).forEach(category => {
                const categoryTitle = document.createElement("h3");
                categoryTitle.textContent = category;
                productListDiv.appendChild(categoryTitle);

                data.products[category].forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.innerHTML = `
                        <label>
                            <input type="checkbox" name="products" value="${product.sku}">
                            ${product.name} - $${product.price}
                        </label>
                        <input type="number" name="quantity-${product.sku}" min="1" placeholder="Quantity">
                    `;
                    productListDiv.appendChild(productItem);
                });
            });
        })
        .catch(error => console.error('Error loading product list:', error));
}
