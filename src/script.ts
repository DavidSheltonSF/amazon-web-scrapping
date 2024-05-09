import axios from 'axios';
import scrapeHandling from './scrapeHandling';

const searchBarElement = <HTMLInputElement> document.querySelector('.search-bar');

const  amazonScrapping = async () => {
  
  const key = searchBarElement?.value;

  const resultsWrapper = document.querySelector('.results-wrapper')

  const userHelper = document.querySelector('.user-helper')

  if (userHelper){
    userHelper.innerHTML = `
      <h1>Loading...</h1>
    `
  }

  const data = await scrapeHandling(key);

  if (data){
    const items = data;

    if(userHelper){
      userHelper.innerHTML = '';
    }
    
    if (resultsWrapper){
      resultsWrapper.innerHTML = '';
    }
    
    items.forEach((product: Record<string, any>)=> {
      const titleCut = product.title.slice(0, 74) + '...';
      const card = document.createElement('article');
      card.classList.add('result-item')
      card.innerHTML = `
        <div class="product-image-container">
          <img class="product-image" src="${product.imageURL}" alt="">
        </div>
        <div class="product-title">
          <h4>${titleCut}</h4>
        </div>
        <div class="product-rating">
          <p>${product.rating['stars'] ? product.rating['stars'] : '' }</p>
          <p>${product.rating['reviews'] ? product.rating['reviews'] : ''}</p>
        </div>
      `
      resultsWrapper?.appendChild(card);
    })
  } else {
    if (userHelper){
      userHelper.innerHTML = `
        <h1>Something went wrong. Please, try later.</h1>
      `
    }
  }
}

const button = document.querySelector('.search-button')
  ?.addEventListener('click', (event: Event) => {
    event.preventDefault();
    amazonScrapping();
});

const keyDownListener = (event: any) => {
  if (event.key === 'Enter') {
      amazonScrapping();
  }
}

searchBarElement.addEventListener('focus', () => {
  window.addEventListener('keydown', keyDownListener);
});
searchBarElement.addEventListener('blur', () => {
  window.removeEventListener('keydown', keyDownListener);
});


