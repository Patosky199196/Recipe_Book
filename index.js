const API_KEY = "e84519c4d713416da44f2031e60a1466";
const recipeListEl = document.getElementById("recipe-list")


function displayRecipes(recipes){
    recipeListEl.innerHTML = ""
    recipes.forEach((recipe)=>{
        const recipeItemsEl = document.createElement("li"); 
        recipeItemsEl.classList.add("recipe-item");
        recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";

        recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;

        recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML =`
        <strong>Ingredeints:</strong>${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}
        `;

        recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe"

        recipeItemsEl.appendChild(recipeImageEl);
        recipeItemsEl.appendChild(recipeTitleEl);
        recipeItemsEl.appendChild(recipeIngredientsEl);
        recipeItemsEl.appendChild(recipeLinkEl);
        recipeListEl.appendChild(recipeItemsEl);
    });
}

async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`)

    const data = await response.json()

    return data.recipes
}



async function init(){
    const recipes = await getRecipes();
    // console.log(recipes);
    displayRecipes(recipes)
}


init()