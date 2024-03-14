'use strict';

class Cards {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
    }

    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach( className => element.classList.add(className));
        }

        element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">${this.price}</div>
                    <div class="menu__item-total"><span>229</span> грн/день</div>
                </div>
        `;
        this.parent.append(element);
    }
}

const getResources = async (url) => {
    const result = await fetch(url, {
        method:  'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });

    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    } else {
        return await result.json();
    }
}

getResources('http://localhost:3000/menu\n')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
           new Cards(img, altimg, title, descr, price, ".menu .container").render();
        });
    })

