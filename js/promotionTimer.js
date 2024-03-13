window.addEventListener('DOMContentLoaded', () => {
    const deadline = '2024-02-29';

    function getTimeRemaining(endTime) {
        const totalTimeInMilliseconds = Date.parse(endTime) - new Date(),
            days = Math.floor(totalTimeInMilliseconds / (1000 * 60 * 60 * 24)),
            hours = Math.floor( (totalTimeInMilliseconds/(1000*60*60) % 24) ),
            minutes = Math.floor(totalTimeInMilliseconds / (1000 * 60) % 60),
            seconds = Math.floor((totalTimeInMilliseconds / 1000) % 60);

        return {
            'total':   totalTimeInMilliseconds,
            'days':    days,
            'hours':   hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            daysElem = timer.querySelector('#days'),
            hoursElem = timer.querySelector('#hours'),
            minutesElem = timer.querySelector('#minutes'),
            secondsElem = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const timeRemaining  = getTimeRemaining(endTime);

            daysElem.innerHTML = getZero(timeRemaining.days);
            hoursElem.innerHTML = getZero(timeRemaining.hours);
            minutesElem.innerHTML = getZero(timeRemaining.minutes);
            secondsElem.innerHTML = getZero(timeRemaining.seconds);

            if (timeRemaining.total <= 0) {
                clearInterval(timeInterval);
                timer.innerHTML = '<div class="expired-message">Акция завершена</div>';
            }
        }
    }

    setClock('.timer', deadline)
});