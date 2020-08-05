import axios from 'axios';
import {
    key,
    proxy
} from '../config'
var numQty = require("numeric-quantity");
import swal from 'sweetalert';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${key}`);
            this.title = res.data.title;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.extendedIngredients = res.data.extendedIngredients;
            this.servings = res.data.servings;
            this.readyInMinutes = res.data.readyInMinutes;
            //console.log(res);
        } catch (error) {
            swal({
                title: "Error!",
                text: "Sth went wrong :(",
                icon: "error",
            });
        }
    }
    giveIngredientsName() {
        let newIngredients = this.extendedIngredients.map(el => el.original);
        this.extendedIngredients = newIngredients;
        return this.extendedIngredients;
    }

    parseIngredients() {
        let newIngredients = this.giveIngredientsName();
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        newIngredients = this.extendedIngredients.map(el => {
            //1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            //     //2) Remove paranthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            //     //3) parse ingredients to count, unit and ingredients;
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            let objIng;
            if (unitIndex > -1) {
                //There is a unit
                const arrCount = arrIng.slice(0, unitIndex); //Examples: 4 1/2 cups => arrCount = [4 ,1/2] and 4 cups => arrCount = [4]
                let count;
                if (arrCount.length === 1) {
                    count = arrIng[0].replace('-', '+');
                } else {
                    count = isNaN(count) ? arrIng.slice(0, unitIndex).join('+') : eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrIng[0], 10)) {
                //There is no unit but first element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                //There is no unit and no number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            return objIng;
        });
        this.extendedIngredients = newIngredients;
    }
    updateServings(type) {
        //Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        //Ingredients
        this.extendedIngredients.forEach(ing => {
            ing.count = numQty(ing.count)*(newServings / this.servings);
        });
        this.servings = newServings;

    }
}