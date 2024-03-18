window.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    let offset = 0;
    let currentSlideIndex = 1;

    if (slides.length < 10) {
        current.textContent = `0${currentSlideIndex}`;
        total.textContent = `0${slides.length}`;
    } else {
        current.textContent = `${currentSlideIndex}`;
        total.textContent = `${slides.length}`;
    }

    slidesField.style.display = 'flex';
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.width = width;
    })

    function nextSlide() {
        if (offset === +width.slice(0, 3) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, 3)
        }

        if (slides.length === currentSlideIndex) {
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${currentSlideIndex}`;
        } else {
            current.textContent = currentSlideIndex;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function prevSlide() {
        if (offset === 0) {
            offset = +width.slice(0, 3) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, 3)
        }

        if (currentSlideIndex === 1) {
            currentSlideIndex = slides.length;
        } else {
            currentSlideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${currentSlideIndex}`;
        } else {
            current.textContent = currentSlideIndex;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
})


/* showSlide(currentSlideIndex);

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = slides.total;
}

function showSlide(n) {
    if (n > slides.length) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = slides.length;

    slides.forEach((slide) => slide.style.display = 'none');
    slides[currentSlideIndex - 1].style.display = 'block';

    if (slides.length < 10) {
        current.textContent = `0${currentSlideIndex}`;
    } else {
        current.textContent = currentSlideIndex;
    }
}

function plusSlide(n) {
    showSlide(currentSlideIndex += n)
}

sliderBtnPrev.addEventListener('click', function () {
    plusSlide(-1)
});
sliderBtnNext.addEventListener('click', function () {
    plusSlide(1)
}); */
