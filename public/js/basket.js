function addToCart(id, title, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingProductIndex = cart.findIndex(item => item.id === id)
    
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1
    } else {
        cart.push({ id, title, price, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
}

function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []
    const cartItemsContainer = document.getElementById('cart-items')
    cartItemsContainer.innerHTML = ''
    
    let totalPrice = 0
    const itemCounts = {} 

    cartItems.forEach(item => {
        const li = document.createElement('li')
        li.textContent = `${item.title} - ₽${item.price} x ${item.quantity}`
        cartItemsContainer.appendChild(li)
        
        totalPrice += item.price * item.quantity 
        itemCounts[item.id] = { title: item.title, quantity: item.quantity }
    })

    const totalPriceElement = document.getElementById('total-price')
    totalPriceElement.textContent = `₽${totalPrice.toFixed(2)}`

    const cartModal = document.getElementById('cart-modal')
    cartModal.style.display = cartItems.length > 0 ? 'flex' : 'none' 

    const cartCountElement = document.getElementById('cart-count')
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    cartCountElement.textContent = totalItems > 0 ? totalItems : ''

    updateProductDisplay(itemCounts)
}

function updateProductDisplay(itemCounts) {
    const productElements = document.querySelectorAll('.bg-white') 
    productElements.forEach(productElement => {
        const productId = productElement.querySelector('button').getAttribute('onclick').match(/'(\d+)'/)[1] 
        const quantity = itemCounts[productId] ? itemCounts[productId].quantity : 0

        const quantityDisplay = productElement.querySelector('.quantity-display')
        const quantitySpan = quantityDisplay.querySelector('.quantity')
        if (quantity > 0) {
            quantityDisplay.style.display = 'block'
            quantitySpan.textContent = quantity
        } else {
            quantityDisplay.style.display = 'none'
        }
    })
}

document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cart')
    updateCart()
})

document.getElementById('checkout').addEventListener('click', () => {
    alert('Переход к оформлению заказа!')
})

document.getElementById('open-cart').addEventListener('click', () => {
    updateCart()
})

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none'
})

document.addEventListener('DOMContentLoaded', updateCart)