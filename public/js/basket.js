function addToCart(id, title, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === id);
    
    if (existingProductIndex > -1) {
        // Если продукт уже в корзине, увеличиваем количество
        cart[existingProductIndex].quantity += 1;
    } else {
        // Если продукт не в корзине, добавляем его
        cart.push({ id, title, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Функция для обновления отображения корзины и количества товаров
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    let totalPrice = 0;
    const itemCounts = {}; // Объект для хранения количества товаров

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - ₽${item.price} x ${item.quantity}`;
        cartItemsContainer.appendChild(li);
        
        totalPrice += item.price * item.quantity; // Считаем общую стоимость
        itemCounts[item.id] = { title: item.title, quantity: item.quantity }; // Сохраняем количество товаров
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `₽${totalPrice.toFixed(2)}`; // Обновляем общую стоимость

    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartItems.length > 0 ? 'flex' : 'none'; // Показываем или скрываем корзину

    // Обновляем отображение количества товаров в корзине на иконке
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalItems > 0 ? totalItems : '';

    // Обновление отображения количества товаров в продуктах
    updateProductDisplay(itemCounts);
}

// Функция для обновления отображения количества товаров в продуктах
function updateProductDisplay(itemCounts) {
    const productElements = document.querySelectorAll('.bg-white'); // Выбор всех карточек продуктов
    productElements.forEach(productElement => {
        const productId = productElement.querySelector('button').getAttribute('onclick').match(/'(\d+)'/)[1]; // Извлечение ID продукта
        const quantity = itemCounts[productId] ? itemCounts[productId].quantity : 0;

        // Если товар в корзине, отображаем его количество
        const quantityDisplay = productElement.querySelector('.quantity-display');
        const quantitySpan = quantityDisplay.querySelector('.quantity');
        if (quantity > 0) {
            quantityDisplay.style.display = 'block';
            quantitySpan.textContent = quantity;
        } else {
            quantityDisplay.style.display = 'none';
        }
    });
}

// Функция для очистки корзины
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cart');
    updateCart();
});

// Функция для перехода к оформлению
document.getElementById('checkout').addEventListener('click', () => {
    alert('Переход к оформлению заказа!');
    // Здесь можно добавить логику для перехода к странице оформления заказа
});

// Функция для открытия модального окна
document.getElementById('open-cart').addEventListener('click', () => {
    updateCart();
});

// Функция для закрытия модального окна
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', updateCart);