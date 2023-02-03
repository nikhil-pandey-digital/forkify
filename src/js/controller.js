import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// this code is for parcel in order to execute the hot module replacement.
if (module.hot) {
  module.hot.accept();
}

const controlShowRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0) update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    bookmarksView.update(model.state.bookmarks);

    //step 1:- loading recipe
    await model.loadRecipe(id);

    //step 2 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage(new Error(err));
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // get query
    const querry = searchView.getQuerry();
    if (!querry) return;
    // load search results according to querry
    await model.loadSearchResults(querry);

    //  resultsView.render(model.state.search.result);
    resultsView.render(model.getSearchResultPage(1));
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = async function (pageNo) {
  resultsView.render(model.getSearchResultPage(pageNo));
  paginationView.render(model.state.search);
};

const ControlServings = function (newServings) {
  //updating the servings in the stored recipe object
  model.updateServings(newServings);
  //rendering the recipe to the recipeView
  recipeView.update(model.state.recipe);
};

const ControlAddBookmark = function () {
  //Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe);

  //update the recipeView
  recipeView.update(model.state.recipe);

  //update the bookmarkView
  bookmarksView.render(model.state.bookmarks);

  console.log(model.state);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

//implementing publisher-subscriber pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlShowRecipe);
  recipeView.addHandlerUpdateServings(ControlServings);
  recipeView.addHandlerAddBookmark(ControlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
