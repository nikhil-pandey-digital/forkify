import icons from '../../img/icons.svg';
import view from './view';
import preview from './previewView';


class resultView extends view {
  
   _parentElement=document.querySelector('.results');
   _errorMessage='we could not find any recipe for your querry please try again !';
   _successMessage='';

   _generateMarkup(){

     return this._data.map(preview._generateMarkupPreview).join('');
   };
  
};

export default new resultView();