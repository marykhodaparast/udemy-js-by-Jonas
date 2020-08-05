import {
    elements
} from './base';
import uniqid from 'uniquid'

import swal from 'sweetalert';

var numQty = require("numeric-quantity");

export const renderItem = item => {
    const markup = `
   <li class="shopping__item" data-itemid = ${item.id}>
                    <div class="shopping__count">
                        <input type="number" value="${numQty(item.count)}" step="${numQty(item.count)}" class="shopping__count-value">
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
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid = "${id}"]`);
    if (item) item.parentElement.removeChild(item);
};
export const addForm = () => {
    const markup = `<div class="mt-5">
   <input type="number" placeholder="count" class="shopping__count count"/>
   <input type="text" placeholder="unit" class="shopping__count unit"/>
   <input type="text" placeholder="ingredient" class="shopping__count ingredient"/>
   <button type="button" class="inline" onClick="${saveItem()}">Save</button>
   </div>`;
    elements.buttons.insertAdjacentHTML('afterend', markup);
};
export const saveItem = () => {
    let count = elements.count.value;
    let unit = elements.unit.value;
    let ingredient = elements.ingredient.value;
    if (count === "" || unit === '' || ingredient === '') {
        console.log('%c nnnnnnooooo', 'color:red');
        swal({
            title: "empty input",
            text: "please fill all inputs!!!",
            icon: "error"
        });
    } else {
        console.log('%c hhhhorra', 'color: #bada55');
        //17o1fh3x00xs
        const markup = `
   <li class="shopping__item" data-itemid = ${uniqid()}>
                    <div class="shopping__count">
                        <input type="number" value="${count}" step="${numQty(count)}" class="shopping__count-value">
                        <p>${unit}</p>
                    </div>
                    <p class="shopping__description">${ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
   `;
        elements.shopping.insertAdjacentHTML('beforeend', markup); //beforeend means one is added after the other

    }
};