let currentPage = 1
const reviewsPerPage = 3
let reviews = []

async function fetchReviews() {
    try {
        const response = await fetch('/api/reviews')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        reviews = data.reviews || []
        displayReviews()
    } catch (error) {
        console.error('Ошибка при получении данных:', error)
    }
}

function displayReviews() {
    const reviewsContainer = document.getElementById('reviews')
    const emptyMessage = document.getElementById('emptyMessage')
    const prevBtn = document.getElementById('prevBtn')
    const nextBtn = document.getElementById('nextBtn')

    reviewsContainer.innerHTML = ''

    if (reviews.length === 0) {
        emptyMessage.style.display = 'block'
        prevBtn.style.display = 'none'
        nextBtn.style.display = 'none'
        return
    } else {
        emptyMessage.style.display = 'none'
    }

    const startIndex = (currentPage - 1) * reviewsPerPage
    const endIndex = startIndex + reviewsPerPage
    const currentReviews = reviews.slice(startIndex, endIndex)

    currentReviews.forEach(review => {
        const reviewDiv = document.createElement('div')
        reviewDiv.className = 'review'
        reviewDiv.innerHTML = `
            <div class="review-header">
                <div class="review-img" style="background-image: url('${review.imgUrl}')"></div>
                <strong>${review.name}</strong>
                <span>${new Date(review.createAt).toLocaleDateString()}</span>
            </div>
            <p>${review.review}</p>
        `
        reviewsContainer.appendChild(reviewDiv)
        
        setTimeout(() => {
            reviewDiv.style.opacity = '1'
            reviewDiv.style.transform = 'translateY(0)'
        }, (currentReviews.indexOf(review) + 1) * 100)
    })

    updatePagination()
}

function updatePagination() {
    const pageInfo = document.getElementById('pageInfo')
    pageInfo.textContent = `Страница ${currentPage} из ${Math.ceil(reviews.length / reviewsPerPage)}`
    
    const prevBtn = document.getElementById('prevBtn')
    const nextBtn = document.getElementById('nextBtn')

    prevBtn.style.display = currentPage === 1 ? 'none' : 'inline-block'
    nextBtn.style.display = currentPage === Math.ceil(reviews.length / reviewsPerPage) ? 'none' : 'inline-block'
}

document.getElementById('prevBtn').addEventListener('click', () => {
   if (currentPage > 1) currentPage--
   displayReviews()
})

document.getElementById('nextBtn').addEventListener('click', () => {
   if (currentPage < Math.ceil(reviews.length / reviewsPerPage)) currentPage++
   displayReviews()
})

fetchReviews()
