window.addEventListener('DOMContentLoaded', () => {
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    function closeModalOutsideClick(event) {
        if (event.target === modal || event.target.getAttribute('data-close') === '') {
            hideModal();
        }
    }

    function closeModalOnEsc(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    }

    function checkBottomScroll() {
        const scrollHeight = document.documentElement.scrollHeight; // вся прокрутка
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // сколько прокрутили-pageYOffset
        const clientHeight = document.documentElement.clientHeight; // какое окно открыто

        if (scrollTop + clientHeight >= scrollHeight) {
            showModal();
        }
    }

    function showModalAfterDelay(delay = 50000) {
        setTimeout(showModal, delay);
    }


    modalTrigger.forEach(trigger => {
        trigger.addEventListener('click', showModal);
    });
    modal.addEventListener('click', closeModalOutsideClick);
    document.addEventListener('keydown', closeModalOnEsc);
    window.addEventListener('scroll', checkBottomScroll);
    showModalAfterDelay();


    // FORMS
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        postData(item)
    });

    function postData(form) {
        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const formDataJSON = {};
            formData.forEach((value, key) => {
                formDataJSON[key] = value;
            })
            request.send(JSON.stringify(formDataJSON));

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    statusMessage.remove();
                    form.reset();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">   
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            thanksModal.classList.add('hide');
            thanksModal.classList.remove('show');
            hideModal();
        }, 4000)
    }

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
});

