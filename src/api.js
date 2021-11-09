const API_KEY = '24236724-a89ab3fbc60694d0f9dea8e28';
export default class Name {
  constructor() {
    this.search = '';
    this.page = 1;
  }
  

  fetch() {

    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=12&key=${API_KEY}`,
    ).then(r => r.json());
  }
  get query() {
    return this.search;
  }
  set query(searh){
    this.search = searh;
  }
  get pages(){
    return this.page
  }
 
  set pages(event){
   
    this.page = event;
  }
 startPage(){
   this.page = 1
 }
 curentPage(){
   this.page += 1
 }
}
