const modal = document.getElementById('modal-feed-back');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');

openModalButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('fade-in'); // Добавляем класс для анимации открытия
});

closeModalButton.addEventListener('click', () => {
    modal.classList.remove('fade-in'); // Убираем класс анимации открытия
    modal.classList.add('fade-out'); // Добавляем класс для анимации закрытия

    // Удаляем модалку после завершения анимации
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('fade-out'); // Убираем класс анимации закрытия
    }, 100); // Время должно совпадать с продолжительностью анимации
});

document.getElementById('modalDataCollector').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Форма отправлена');
    closeModalButton.click(); // Закрываем модалку через кнопку
});


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
