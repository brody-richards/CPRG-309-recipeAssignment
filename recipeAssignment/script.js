fetch('recipes.json')
.then(function(response) {
    return response.json();
})
.then(function(data) {

    for (i = 0; i < data.length; i++) {
        const recipeList = document.getElementById('recipeNav');
        const recipeItem = document.createElement('a');
        recipeItem.href = `?recipe=${i + 1}`;
        recipeItem.innerHTML = data[i].name;

        recipeList.appendChild(recipeItem);
        recipeItem.style.paddingRight = "2rem"
        recipeItem.style.fontSize = "1.4rem"
    }

    const querySearch = window.location.search;
    const urlParms = new URLSearchParams(querySearch);
    const recipeNumber = urlParms.get('recipe');

    const recipe = data[recipeNumber - 1];
    recipeName.innerHTML = recipe.name;

    const description = data[recipeNumber - 1];
    recipeDescription.innerHTML = `Description: ` + recipe.description;

    const cuisine = data[recipeNumber - 1];
    recipeCuisine.innerHTML = `Cuisine: ` + recipe.cuisine;

    const image = data[recipeNumber - 1];
    const recipeImage = document.getElementById('recipeImage')
    recipeImage.setAttribute('src', recipe.image);

    const prepTime = data[recipeNumber - 1];
    recipePrepTime.innerHTML = `Prep Time: ` + recipe.prepTime + ` minutes`;
    
    const cookTime = data[recipeNumber - 1].cookTime;
    let hour = Math.floor(cookTime / 60);
    let minute = cookTime % 60;
    if (cookTime > 59) {
        recipeCookTime.innerHTML = `Cook Time: ` + hour + ` hour and ` + minute + ` minutes` 
    } else {
        recipeCookTime.innerHTML = `Cook Time: ` + recipe.cookTime + ` minutes`
    }


    const servings = data[recipeNumber - 1];
    recipeServings.innerHTML = `Serves: ` + recipe.servings;

    document.getElementById("doubleButton");
    doubleButton.innerHTML = "Double Recipe";

    const difficulty = data[recipeNumber - 1];
    recipeDifficulty.innerHTML = `Difficulty: ` + recipe.difficulty;

    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = document.createElement("li");
        ingredient.innerHTML = recipe.ingredients[i].item + " " + recipe.ingredients[i].amount + " " + recipe.ingredients[i].unit;
        recipeIngredients.appendChild(ingredient);

    }

    for (let i = 0; i < recipe.instructions.length; i++) {
        const instructions = document.createElement("li");
        instructions.innerHTML = recipe.instructions[i].text;
        recipeInstructions.appendChild(instructions);
    }

    const calories = data[recipeNumber - 1];
    recipeCalorie.innerHTML = `Calories: ` + recipe.nutritionalInfo.calories;

    const protein = data[recipeNumber - 1];
    recipeProtein.innerHTML = `Protein: ` + recipe.nutritionalInfo.protein;

    const carbohydrate = data[recipeNumber - 1];
    recipeCarbohydrate.innerHTML = `Carbohydrates ` + recipe.nutritionalInfo.carbohydrates;

    const fat = data[recipeNumber - 1];
    recipeFat.innerHTML = `Fats: ` + recipe.nutritionalInfo.fat;


    for (let i = 0; i < recipe.tags.length; i++) {
        const tags = document.createElement("li")
        tags.innerHTML = recipe.tags[i];
        recipeTags.appendChild(tags);
    }

    // double function
    document.getElementById('doubleButton').addEventListener('click', function() {
        doubleRecipe();    
    });
        function doubleRecipe() {
            recipe.servings = recipe.servings * 2;

            for (let i = 0; i < recipe.ingredients.length; i++) {
                recipe.ingredients[i].amount = recipe.ingredients[i].amount * 2;
            }

            changeRecipe();
        }

        function changeRecipe() {
            let recipeServings = document.getElementById('recipeServings');
            recipeServings.innerHTML = `Serves: ` + recipe.servings;

            let ingredientsArray = document.getElementById('recipeIngredients');
            ingredientsArray.innerHTML = '';

            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = document.createElement("li");
                ingredient.innerHTML = recipe.ingredients[i].item + " " + recipe.ingredients[i].amount + " " + recipe.ingredients[i].unit;
                ingredientsArray.appendChild(ingredient);
            }
        }
})