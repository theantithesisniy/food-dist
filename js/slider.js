window.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
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

    function updateCurrentSlideIndex(current, slides, currentSlideIndex) {
        if (slides.length < 10) {
            current.textContent = `0${currentSlideIndex}`;
        } else {
            current.textContent = currentSlideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlideIndex - 1].style.opacity = `${1}`;
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

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

        updateCurrentSlideIndex(current, slides, currentSlideIndex);
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

        updateCurrentSlideIndex(current, slides, currentSlideIndex);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    // dots on slider

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', `${i + 1}`);
        indicators.append(dot);
        if (i === 0) {
            dot.style.opacity = `${1}`;
        }
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            currentSlideIndex = slideTo;
            offset = +width.slice(0, 3) * (slideTo - 1);
            updateCurrentSlideIndex(current, slides, currentSlideIndex);
        })
    })
})
