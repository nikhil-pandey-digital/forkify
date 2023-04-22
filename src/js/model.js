
import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    querry: '',
    result: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {

  try {

    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id == state.recipe.id))
      state.recipe.bookmarked = true;
    else
      state.recipe.bookmarked = false;

  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (querry) {

  try {
    state.search.querry = querry;

    const data = await getJSON(`${API_URL}?search=${querry}`);

    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    });

    console.log(state);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;//0
  const end = page * state.search.resultsPerPage;//10
  return state.search.result.slice(start, end);
}

export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServing;
  });
  state.recipe.servings = newServing;
}

const persistBookmark=function (){
   localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
   console.log(state.bookmarks);
}

export const addBookmark = function (recipe) {
  //adding recipe to book marks
  state.bookmarks.push(recipe);
  // mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmark();
}

export const deleteBookmark=function(recipe){
   
  const index= state.bookmarks.findIndex(bookmark=>bookmark.id===recipe.id);
  state.bookmarks.splice(index,1);

 // mark current recipe as not bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
}

const init=function(){
 
  const data=localStorage.getItem('bookmarks');

   if(data) state.bookmarks=JSON.parse(data);
   console.log(state.bookmarks);
}
init();

const clearBookmarks=function(){
  localStorage.clear('bookmarks');
}
// clearBookmarks();