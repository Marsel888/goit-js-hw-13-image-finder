import li_image from './templates/list-image.hbs';
const ul = document.querySelector('ul');
const search = document.querySelector('input');
const button = document.querySelector('button');
import Name from './api.js';
const debounce = require('lodash.debounce');

const name = new Name();
let numberPage = 1;


search.addEventListener('input', debounce(searchImg, 1000));
button.addEventListener('click', fullImg);

function searchImg(event) {
  ul.innerHTML = '';
  const target = event.target.value;
  if (target === '') {
    return;
  }
  if (name.pages >= 2) {
    name.pages = 1;
    numberPage = 1;
  }
  name.query = target;
  name.fetch().then(data => {
    console.log(data);
    ul.insertAdjacentHTML('beforeend', li_image(data.hits));
  });
}

function fullImg() {
  numberPage += 1;
  const stringPage = String(numberPage);
  name.pages = stringPage;
  name.fetch().then(data => {
    ul.insertAdjacentHTML('beforeend', li_image(data.hits));
  });
}





