document.getElementById('calculate').addEventListener('click', function() {
    let totalPrice = 0;

    // Get product prices (example prices)
    const prices = {
        product1: 1999, // MacBook Pro
        product2: 1299, // Dell XPS
        product3: 49, // Wireless Mouse
        product4: 79  // Keyboard
    };

    // Calculate total based on user input
    for (let id in prices) {
        let quantity = document.getElementById(id).value;
        totalPrice += quantity * prices[id];
    }

    // Update total price
    document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
});
