import icons from '../../img/icons.svg';

export default class view {
  _data;

  render(data) {
    //handling error for when data is invalid 
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    //handling error for when data is invalid 
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();

    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements= Array.from(newDom.querySelectorAll('*'));
    const currElements= Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl,i)=>{
         const curEl=currElements[i];

        // updating the changed text 
       if(!newEl.isEqualNode(curEl)&& newEl.firstChild?.nodeValue.trim() !==''){
           curEl.textContent=newEl.textContent;
          //  console.log(curEl);
       }

       // updating the changed attributes
       if(!newEl.isEqualNode(curEl)){

        // console.log(Array.from(newEl.attributes)) ;

        Array.from(newEl.attributes).forEach((att)=>{
              curEl.setAttribute(att.name,att.value);
        });
        
       }
    });

  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {

    const loadingicon = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", loadingicon);
  };

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
          <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSuccessMessage(message = this._successMessage) {

    const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }


}