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
