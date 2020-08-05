// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import swal from 'sweetalert';

import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.state = state;
/**
 * Search Controller
 */
const controlSearch = async () => {
    //1) Get query from view
    const query = searchView.getInput();
    //TESTING
    //const query = 'pizza';
    if (query) {
        //2) New search object and add it to state
        state.search = new Search(query);
        //3) prepate UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            //4) Search for recipes
            await state.search.getResults();
            //5) Render results for UI
            clearLoader();
            if (state.search.result.length) {
                searchView.renderResults(state.search.result);
            } else {
                searchView.nothingFoundForSearch();
            }
        } catch (error) {
            clearLoader();
            swal({
                title: "Error!",
                text: "Sth went wrong with the search...",
                icon: "error",
            });
        }
    }


}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
//TESTING
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
//     // and change the const query to in control search to be pizza and add window.r = state.recipe in recipeController
// });

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); //closest is used because we dont want to click on arrow or button and different results happens
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});
/***
 * Recipe Controller
 */
const controlRecipe = async () => {
    //Get ID from url
    const id = window.location.hash.replace('#', '');
    if (id) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search) searchView.highlightSelected(id);
        //Create new recipe object
        state.recipe = new Recipe(id);
        //TESTING
        // window.r = state.recipe;

        try {
            //Get recipe data and parse Ingredients
            await state.recipe.getRecipe();
            //Parse ingredients
            state.recipe.parseIngredients();
            //render the recipe
            clearLoader();
            //console.log(state.recipe);
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch (error) {
            swal({
                title: "Error!",
                text: "Error processing recipe...",
                icon: "error",
            });
        }

    }
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load',controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
/**
 * LIST CONTROLLER
 */
const controlList = () => {
    //Create a new List IF there is none yet
    if (!state.list) {
        state.list = new List();
    }
    //Add each ingredient to the list and UI
    state.recipe.extendedIngredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
    elements.buttons.style.display = 'block';
};
//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state 
        state.list.deleteItem(id);
        //Delete from UI
        listView.deleteItem(id);
        //Handle the count update    
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }

});
/***
 * LIKE CONTROLLER
 */
const controlLike = () => {
    if (!state.likes) {
        state.likes = new Likes();
    }
    const currentID = state.recipe.id;
    //User has NOT yet like current recipe
    if (!state.likes.isLiked(currentID)) {
        //ADD like to the state 
        const newLike = state.likes.addLike(currentID, state.recipe.title, 'The Pioneer Woman', state.recipe.img);
        //Toggle the like button
        likesView.toggleLikeButton(true);
        //ADD like to the UI list
        likesView.renderLike(newLike);

        //User HAS liked current recipe
    } else {
        //REMOVE like from the state 
        state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeButton(false);
        //REMOVE like from the UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};
//Restore like recipes on page load
window.addEventListener('load', () => {

    state.likes = new Likes();
    state.list = new List();
    //Restore likes
    state.likes.readStorage();
    state.list.readStorage();
    //Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    //Render the existing likes
    state.likes.likes.forEach(like => {
        likesView.renderLike(like);
    });
    //Render the existing items in shopping list
    state.list.items.forEach(item => {
        listView.renderItem(item);
    })
});

//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease,.btn-decrease *')) { //btn-decrease * means childs of btn-decrease
        //Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase,.btn-increase *')) {
        //Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add,.recipe__btn--add *')) {
        //Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love,.recipe__love *')) {
        //LIKE controller
        controlLike();
    }
});
elements.clearAll.addEventListener('click', e => {
    state.list.items = [];
    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                elements.clearAll.style.display = 'none';
                elements.shopping.innerHTML = '';
                swal("Poof! ingredients has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("The ingredients are safe!");
            }
        });

});
elements.addItem.addEventListener('click', () => {
    elements.itemForm.style.display = "block";
});

elements.save.addEventListener('click', () => {
    let item;
    const arr = listView.saveItem();
    if (arr[0]) {
        elements.count.value = "";
        elements.unit.value = "";
        elements.ingredient.value = "";
        item = state.list.addItem(arr[1], arr[2], arr[3]);
        elements.clearAll.style.display = "block";
        const markup = `
   <li class="shopping__item" data-itemid = ${item.id}>
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
   `;
        elements.shopping.insertAdjacentHTML('beforeend', markup); //beforeend means one is added after the other
        elements.itemForm.style.display = 'none';
    }
});