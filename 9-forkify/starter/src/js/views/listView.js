import {
    elements
} from './base';
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
export const saveItem = () => {
    let count = elements.count.value;
    //count = numQty(count);
    let unit = elements.unit.value;
    let ingredient = elements.ingredient.value;
    let sw = 0;
    if (count === "" || ingredient === '') {
        swal({
            title: "empty input",
            text: "please fill all inputs!!!",
            icon: "error"
        });
    } else {
        sw = 1;
//         const markup = `
//    <li class="shopping__item" data-itemid = ${item.id}>
//                     <div class="shopping__count">
//                         <input type="number" value="${count}" step="${count}" class="shopping__count-value">
//                         <p>${unit}</p>
//                     </div>
//                     <p class="shopping__description">${ingredient}</p>
//                     <button class="shopping__delete btn-tiny">
//                         <svg>
//                             <use href="img/icons.svg#icon-circle-with-cross"></use>
//                         </svg>
//                     </button>
//                 </li>
//    `;
//         elements.shopping.insertAdjacentHTML('beforeend', markup); //beforeend means one is added after the other
//         elements.itemForm.style.display = 'none';
    }
    return [sw, count, unit, ingredient];
};