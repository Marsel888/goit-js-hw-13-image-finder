import li_image from './templates/list-image.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const ul = document.querySelector('.ul');
const search = document.querySelector('input');
const button = document.querySelector('button');
import Name from './api.js';
const debounce = require('lodash.debounce');

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
  name.fetch().then(data => {
    ul.insertAdjacentHTML('beforeend', li_image(data.hits));
  });
}

function obs() {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(
      entry => {
        if (entry.isIntersecting) {
          render();

          name.curentPage();

          console.log('ww');
        }
      },
      { threshold: 1 },
    );
  });

  document.querySelectorAll('.test').forEach(p => {
    observer.observe(p);
  });
}

