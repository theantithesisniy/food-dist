window.addEventListener('DOMContentLoaded', () => {

    const tabsParent = document.querySelector('.tabheader__items');
    const tabs   = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();   // Hide all tabs except the first one
    showTabContent();   // Show the first tab

    tabsParent.addEventListener('click', event => {
        const {target} = event;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, index) => {
                if (target === tab) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

});

