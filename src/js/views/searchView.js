
class searchView { 
  #parent=document.querySelector('.search');

  getQuerry(){
    const querry=this.#parent.querySelector('.search__field').value;
    this.#clearInput();
    return querry;
  }
  #clearInput(){
    this.#parent.querySelector('.search__field').value='';
  }
  addHandlerSearch(handler){
    this.#parent.addEventListener('submit',(e)=>{
        e.preventDefault();
        handler();
    })
  }
};

export default new searchView();