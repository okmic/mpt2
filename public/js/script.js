document.getElementById('mobile-menu').addEventListener('click', function () {
    const nav = document.getElementById('nav')

    nav.classList.toggle('active')

    this.classList.toggle('active')
})
//CLICK TO NAV 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        targetElement.scrollIntoView({
            behavior: 'smooth'
        })
    })
})

//FORM -------------------------->

document.getElementById('dataCollector').addEventListener('submit', function (event) {
    event.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value

    const submitButton = document.getElementById('submitButton')
    submitButton.disabled = true

    const loader = document.getElementById('loader')

    loader.classList.remove('hidden')

    const buttonText = document.getElementById('buttonText')
    buttonText.innerText = ''

    fetch('/api/telegram/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: name,
            userEmail: email,
            userPhone: phone
        }),
    })
        .then(response => response.json())
        .then(r => {
            document.getElementById('response').innerText = `Спасибо, ${name}! Мы с вами свяжемся!`
            document.getElementById('dataCollector').reset()
            loader.classList.add('hidden')
            buttonText.innerText = 'Отправить'
            submitButton.disabled = false
        })
        .catch((e) => {
            document.getElementById('response').innerText = `Ошибка при отправке сообщения.`
            document.getElementById('dataCollector').reset()
            loader.classList.add('hidden')
            buttonText.innerText = 'Отправить'
            submitButton.disabled = false
        })
})

//scroll to top

const scrollToTopBtn = document.getElementById('scrollToTopBtn')

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.classList.remove('hidden')
        scrollToTopBtn.classList.add('visible')
    } else {
        scrollToTopBtn.classList.remove('visible')
        scrollToTopBtn.classList.add('hidden')
    }
})

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

fetch('/api/visit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({json: `Visite at ${new Date()}`}),
})
