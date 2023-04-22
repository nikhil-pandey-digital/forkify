import icons from '../../img/icons.svg';
import view from './view.js';

class paginationView extends view {
  
   _parentElement=document.querySelector('.pagination');

   _generateMarkup(){
         const numberOfPages = Math.ceil(this._data.result.length/this._data.resultsPerPage);
  
        // page 1 and there are other pages
         if(this._data.page===1 && numberOfPages>1){
            return `
            <button data-goto="${this._data.page+1}" class="btn--inline pagination__btn--next">
             <span>Page ${this._data.page+1}</span>
             <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
             </svg>
            </button>
          `;
         }
        // last page
        if(this._data.page===numberOfPages && numberOfPages>1){
         return `
         <button data-goto="${this._data.page-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page-1}</span>
          </button>
         `;
        }
        // any other page
        if(this._data.page>1 && numberOfPages>this._data.page){ return `
        <button data-goto="${this._data.page-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page-1}</span>
        </button>
         
        <button data-goto="${this._data.page+1}" class="btn--inline pagination__btn--next">
         <span>Page ${this._data.page+1}</span>
         <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
         </svg>
        </button>

        `;
      }

        // page 1 and there are no other pages
         return '';
        
        
   }

   addHandlerClick(handler){
      this._parentElement.addEventListener('click',function(e){
         const button= e.target.closest('.btn--inline');
         if(!button) return ;
          handler(+button.dataset.goto);
      });
   }
};

export default new paginationView();