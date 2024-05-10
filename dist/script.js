var _a;
import axios from '../node_modules/axios/index';
const searchBarElement = document.querySelector('.search-bar');
const amazonScrapping = () => {
    const key = searchBarElement === null || searchBarElement === void 0 ? void 0 : searchBarElement.value;
    const resultsWrapper = document.querySelector('.results-wrapper');
    const userHelper = document.querySelector('.user-helper');
    if (userHelper) {
        userHelper.innerHTML = `
        <h1>Loading...</h1>
      `;
    }
    axios.get(`https://amazon-web-scrapping.onrender.com/api/scrape?key=${key}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
        const items = res.data;
        if (userHelper) {
            userHelper.innerHTML = '';
        }
        if (resultsWrapper) {
            resultsWrapper.innerHTML = '';
        }
        items.forEach((product) => {
            const titleCut = product.title.slice(0, 74) + '...';
            const card = document.createElement('article');
            card.classList.add('result-item');
            card.innerHTML = `
          <div class="product-image-container">
            <img class="product-image" src="${product.imageURL}" alt="">
          </div>
          <div class="product-title">
            <h4>${titleCut}</h4>
          </div>
          <div class="product-rating">
            <p>${product.rating['stars'] ? product.rating['stars'] : ''}</p>
            <p>${product.rating['reviews'] ? product.rating['reviews'] : ''}</p>
          </div>
        `;
            resultsWrapper === null || resultsWrapper === void 0 ? void 0 : resultsWrapper.appendChild(card);
        });
    })
        .catch((err) => {
        console.log(err);
        if (userHelper) {
            userHelper.innerHTML = `
        <h1>Something went wrong. Please, try later.</h1>
      `;
        }
    });
};
const button = (_a = document.querySelector('.search-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (event) => {
    event.preventDefault();
    amazonScrapping();
});
const keyDownListener = (event) => {
    if (event.key === 'Enter') {
        amazonScrapping();
    }
};
searchBarElement.addEventListener('focus', () => {
    window.addEventListener('keydown', keyDownListener);
});
searchBarElement.addEventListener('blur', () => {
    window.removeEventListener('keydown', keyDownListener);
});
