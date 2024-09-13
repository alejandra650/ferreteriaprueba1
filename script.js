let cart = [];

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCartButton(); // Actualizar el número de productos en el botón
    alert(`${productName} ha sido añadido al carrito.`);
}

// Función para abrir el carrito
function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
    updateCart();
}

// Función para cerrar el carrito
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Función para actualizar el contenido del carrito
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar el contenido previo
    
    let total = 0;
    
    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
            <span>Subtotal: $${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        
        cartItemsContainer.appendChild(productDiv);
        total += item.price * item.quantity;
    });
    
    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
    updateCartButton();
}

// Función para obtener el número total de productos en el carrito
function getCartTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Función para actualizar el botón del carrito
function updateCartButton() {
    document.getElementById('cart-button').innerText = `Carrito (${getCartTotalItems()})`;
}

