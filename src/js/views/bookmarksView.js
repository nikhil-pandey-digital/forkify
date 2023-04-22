import icons from '../../img/icons.svg';
import view from './view';
import preview from './previewView';

class bookmark extends view {
  
   _parentElement=document.querySelector('.bookmarks__list');
   _errorMessage=' No bookmarks yet. Find a nice recipe and bookmark it :)';
   _successMessage='';

   addHandlerRender(handler){
    window.addEventListener('load',handler);
   }

   _generateMarkup(){

     return this._data.map(preview._generateMarkupPreview).join('');
   };
   
};

export default new bookmark();