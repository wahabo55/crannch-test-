const itemsDiv = document.getElementById('items');
const cartList = document.getElementById('cart-list');
const totalPrice = document.getElementById('total-price');

let cart = [];
let total = 0;
let currentItemQty = {}; // Track the selected quantity for each item by name

// Menu data
const menu = {
    food: [
        { name: "Classic Cheese", price: 2.25 },
        { name: "Classic Hotdog", price: 2.25 },
        { name: "Classic Mix", price: 2.5 },
        { name: "Spicy Cheese", price: 2.25 },
        { name: "Spicy Hotdog", price: 2.25 },
        { name: "Spicy Mix", price: 2.5 },
        { name: "Buffalo Chicken Wings", price: 3 },
        { name: "BBQ Chicken Wings", price: 3 }
    ],
    addOns: [
        { name: "Takis", price: 0.35 },
        { name: "Cheddar Cheese", price: 0.2 },
        { name: "Mayo", price: 0.2 },
        { name: "Ranch", price: 0.2 },
        { name: "Potatoes", price: 0.25 }
    ],
    drinks: [
        { name: "Pepsi", price: 0.5 },
        { name: "7Up", price: 0.5 },
        { name: "Shani", price: 0.5 },
        { name: "Mirinda", price: 0.5 },
        { name: "Water", price: 0.3 }
    ]
};

// Render items (food or drinks)
function renderItems(category) {
    itemsDiv.innerHTML = '';
    menu[category].forEach((item) => {
        const div = document.createElement('div');
        div.className = 'item';

        // Add the image above the item text
        let itemImage = '';
        if (category === 'food') {
            // Add food item images
            if (item.name === "Classic Cheese") {
                itemImage = '<div class="item-image" style="background-image: url(\'corndog.jpeg\');"></div>';
            } else if (item.name === "Classic Hotdog") {
                itemImage = '<div class="item-image" style="background-image: url(\'corndog.jpeg\');"></div>';
            } else if (item.name === "Classic Mix") {
                itemImage = '<div class="item-image" style="background-image: url(\'corndog.jpeg\');"></div>';
            } else if (item.name === "Spicy Cheese") {
                itemImage = '<div class="item-image" style="background-image: url(\'corndog.jpeg\');"></div>';
            } else if (item.name === "Spicy Hotdog") {
                itemImage = '<div class="item-image" style="background-image: url(\'corndog.jpeg\');"></div>';
            } else if (item.name === "Spicy Mix") {
                itemImage = '<div class="item-image" style="background-image: url(\'corndog.jpeg\');"></div>';
            } else if (item.name === "Buffalo Chicken Wings") {
                itemImage = '<div class="item-image" style="background-image: url(\'buffalo_chicken_wings.webp\');"></div>';
            } else if (item.name === "BBQ Chicken Wings") {
                itemImage = '<div class="item-image" style="background-image: url(\'bbq_chicken_wings.png\');"></div>';
            }
        } else if (category === 'drinks') {
            // Add drinks item images
            if (item.name === "Pepsi") {
                itemImage = '<div class="item-image" style="background-image: url(\'pepsi.png\');"></div>';
            } else if (item.name === "7Up") {
                itemImage = '<div class="item-image" style="background-image: url(\'7up.jpg\');"></div>';
            } else if (item.name === "Shani") {
                itemImage = '<div class="item-image" style="background-image: url(\'shani.png\');"></div>';
            } else if (item.name === "Mirinda") {
                itemImage = '<div class="item-image" style="background-image: url(\'mirinda.png\');"></div>';
            } else if (item.name === "Water") {
                itemImage = '<div class="item-image" style="background-image: url(\'water.png\');"></div>';
            }
        }

        // Render the item
        div.innerHTML = `
            ${itemImage}
            <h3>${item.name}</h3>
            <p>${item.price.toFixed(3)} KD</p>
            ${
                category === 'food'
                    ? ` 
                    <div class="quantity-controls">
                        <button onclick="decrementQty('${item.name}')">-</button>
                        <span id="${item.name}-qty">${currentItemQty[item.name] || 1}</span>
                        <button onclick="incrementQty('${item.name}')">+</button>
                    </div>
                    <button onclick="renderAddOns('${item.name}', ${item.price})">Select Add-ons</button>`
                    : `<button onclick="addToCart('${item.name}', ${item.price}, [])">Add to Cart</button>`
            }
        `;
        itemsDiv.appendChild(div);
    });
}



// Increment quantity
function incrementQty(name) {
    const qtySpan = document.getElementById(`${name}-qty`);
    let qty = parseInt(qtySpan.textContent) + 1;
    qtySpan.textContent = qty;
    currentItemQty[name] = qty; // Save the quantity for this item
}

// Decrement quantity
function decrementQty(name) {
    const qtySpan = document.getElementById(`${name}-qty`);
    let qty = parseInt(qtySpan.textContent);
    if (qty > 1) {
        qty -= 1;
        qtySpan.textContent = qty;
        currentItemQty[name] = qty; // Save the quantity for this item
    }
}

// Render add-ons for food items
function renderAddOns(itemName, basePrice) {
    itemsDiv.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'addons-container';
    div.innerHTML = `<h2>Add-ons for ${itemName}</h2>`;
    menu.addOns.forEach((addOn) => {
        const addOnDiv = document.createElement('div');
        addOnDiv.className = 'addon';
        addOnDiv.innerHTML = `
            <label>
                <input type="checkbox" value="${addOn.price}" data-name="${addOn.name}">
                ${addOn.name} (${addOn.price.toFixed(3)} KD)
            </label>
        `;
        div.appendChild(addOnDiv);
    });
    div.innerHTML += `
        <button onclick="addToCartWithAddOns('${itemName}', ${basePrice})">Add to Cart</button>
        <button onclick="renderItems('food')">Back to Menu</button>
    `;
    itemsDiv.appendChild(div);
}

// Add item with add-ons to cart
function addToCartWithAddOns(itemName, basePrice) {
    let addOnTotal = 0;
    let selectedAddOns = [];

    // Gather selected add-ons
    document.querySelectorAll('.addons-container input[type="checkbox"]:checked').forEach((checkbox) => {
        addOnTotal += parseFloat(checkbox.value);
        selectedAddOns.push(checkbox.dataset.name);
    });

    const qty = currentItemQty[itemName] || 1; // Get the current quantity for this item
    addToCart(itemName, basePrice, selectedAddOns, addOnTotal, qty);

    // Reset the quantity for this item after adding to the cart
    currentItemQty[itemName] = 1;
}

// Add item to cart
function addToCart(itemName, basePrice, selectedAddOns = [], addOnTotal = 0, qty = 1) {
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(
        (item) =>
            item.name === itemName &&
            JSON.stringify(item.addOns.sort()) === JSON.stringify(selectedAddOns.sort())
    );

    if (existingItemIndex !== -1) {
        // Update the existing item's quantity and total price
        cart[existingItemIndex].qty += qty;
        cart[existingItemIndex].price += (basePrice + addOnTotal) * qty;
    } else {
        // Add a new item to the cart
        const itemTotalPrice = (basePrice + addOnTotal) * qty;
        cart.push({ name: itemName, price: itemTotalPrice, qty, addOns: selectedAddOns });
    }

    // Update the total
    total += (basePrice + addOnTotal) * qty;

    // Update the cart UI
    updateCart();

    // Reset the quantity for this item after adding to the cart
    currentItemQty[itemName] = 1;

    // Keep the user on the current category page (food or drinks)
    if (menu.food.some(item => item.name === itemName)) {
        renderItems('food');
    } else {
        renderItems('drinks');
    }
}

// Update cart UI
function updateCart() {
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.name}</strong> (${item.qty}x) - ${item.price.toFixed(3)} KD
            ${item.addOns.length > 0 ? `<br><small>Add-ons: ${item.addOns.join(', ')}</small>` : ''}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(li);
    });
    totalPrice.innerText = `${total.toFixed(3)} KD`;
}

// Remove item from cart
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

async function printReceipt() {
    const receiptItems = cart.map(
        (item) => `
            ${item.name} (${item.qty}x) - ${item.price.toFixed(3)} KD
            ${item.addOns.length > 0 ? `Add-ons: ${item.addOns.join(', ')}` : ''}
        `
    ).join('\n');

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Prepare receipt text
    const receiptText = `
        Crannch
        Date: ${formattedDate}
        -------------------------
        ${receiptItems}
        -------------------------
        Total: ${total.toFixed(3)} KD
        -------------------------
        Thank you for your purchase!
        Follow us: @crannch_kw
    `;

    try {
        // Request a Bluetooth device
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['00001101-0000-1000-8000-00805f9b34fb'] // Standard Serial Port Service ID
        });

        // Connect to the device's GATT server
        const server = await device.gatt.connect();

        // Get the service
        const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');

        // Get the characteristic
        const characteristic = await service.getCharacteristic('00001101-0000-1000-8000-00805f9b34fb');

        // Convert receipt text to a buffer
        const encoder = new TextEncoder();
        const data = encoder.encode(receiptText + '\n\n\n'); // Add line breaks for spacing

        // Write data to the printer
        await characteristic.writeValue(data);

        alert('Receipt printed successfully!');
    } catch (error) {
        console.error('Error printing receipt:', error);
        alert('Failed to print receipt. Please check your printer and try again.');
    }
}


// Event listeners for navigation
document.getElementById('food-btn').addEventListener('click', () => renderItems('food'));
document.getElementById('drinks-btn').addEventListener('click', () => renderItems('drinks'));
document.getElementById('print-btn').addEventListener('click', printReceipt);


// Handle New Order button click
document.getElementById('new-order-btn').addEventListener('click', function () {
    // Reset all cart-related variables
    cart = [];
    total = 0;
    currentItemQty = {};

    // Update UI elements
    cartList.innerHTML = ''; // Clear the cart list in the UI
    totalPrice.textContent = '0.000 KD'; // Reset the total price display
    itemsDiv.innerHTML = ''; // Clear the items section

    // Provide feedback to the user
    alert('New order started!');

    // Open the food section after starting a new order
    renderItems('food');
});

document.addEventListener('DOMContentLoaded', function () {
    // Automatically render the 'food' items when the page loads
    renderItems('food');
});



// Exit button functionality
document.getElementById('exit-btn').addEventListener('click', function () {
    window.location.href = 'welcome.html'; // Navigate to welcome.html
});