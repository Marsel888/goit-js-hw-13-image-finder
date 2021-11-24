import li_image from './templates/list-image.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const ul = document.querySelector('.ul');
const search = document.querySelector('input');
const button = document.querySelector('button');
import Name from './api.js';
const debounce = require('lodash.debounce');
const senteniel = document.querySelector('.js-senteniel');
const name = new Name();

search.addEventListener('input', debounce(searchImg, 1000));
button.addEventListener('click', function () {
  name.curentPage();
  render();
});

ul.addEventListener('click', modal);

function modal(event) {
  console.log(event.target.dataset.source);
  if (!event.target.dataset.source) {
    return;
  }
  const instance = basicLightbox.create(`<img src=${event.target.dataset.source} />`);

  instance.show();
}

function searchImg(event) {
  ul.innerHTML = '';
  const target = event.target.value;
  name.query = target;

  if (target == '') {
    ul.innerHTML = '';
    return;
  }

  numbersPage();
  //  obs();
  render();
  
}

function numbersPage() {
  if (name.pages >= 2) {
    name.startPage();
  }
}
function render() {
  observer.unobserve(senteniel)

  name.fetch().then(data => {
    ul.insertAdjacentHTML('beforeend', li_image(data.hits));
    observer.observe(senteniel);
    

  });
 
}


const options = {
root: null,
rootMargin: '300px',
threshold: 1


}


const observer = new IntersectionObserver(updateList, options )

function updateList (entries) {
entries.forEach(entry => {
  if(entry.isIntersecting){
    name.curentPage()
    name.fetch().then(data => {
      ul.insertAdjacentHTML('beforeend', li_image(data.hits));
      
      
  
    });
  }

  
});




}

