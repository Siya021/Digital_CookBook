const url = 'https://dummyjson.com/recipes' ;
let allRecipes = [];
fetch(url)
  .then(response => response.json())
  .then(data => {
    allRecipes = data.recipes;
    displayRecipes(allRecipes);
  });

  function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        const image = document.createElement('img');
        image.src = recipe.image;
        card.appendChild(image);

        const name = document.createElement('h2');
        name.textContent = recipe.name;
        card.appendChild(name);

        const difficulty = document.createElement('p');
        difficulty.textContent = `Difficulty: ${recipe.difficulty}`;
        card.appendChild(difficulty);

        const ratingStars = document.createElement('p');
        ratingStars.textContent = `Rating: ${getStars(recipe.rating)}`;
        card.appendChild(ratingStars);

        const readMoreBtn = document.createElement('button');
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.addEventListener('click', () => {
            openModal(recipe);
        });
        card.appendChild(readMoreBtn);

        recipesContainer.appendChild(card);
    });
}

function openModal(recipe) {
    const modal = document.createElement("div");
    modal.id = "myModal";
    modal.className = "modal";
    modal.style.display = "block";

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    modalContainer.appendChild(closeBtn);

    const modalContentDiv = document.createElement("div");
    modalContentDiv.id = "modal-content";
    modalContentDiv.innerHTML = `Details for <strong>${recipe.name}</strong><br>
    <strong>Ingredients:</strong> ${recipe.ingredients}<br>
    <strong>Instructions:</strong> ${recipe.instructions}<br>
    <strong>Serving:</strong> ${recipe.servings}<br>
    <strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}`;
    modalContainer.appendChild(modalContentDiv);

    modal.appendChild(modalContainer);
    document.body.appendChild(modal);
}

// function showMoreDetails(recipe, modalContent) {
//   modalContent.innerHTML = `Details for <strong>${recipe.name}</strong><br>
//     <strong>Ingredients:</strong> ${recipe.ingredients}<br>
//     <strong>Instructions:</strong> ${recipe.instructions}<br>
//     <strong>Serving:</strong> ${recipe.servings}<br>
//     <strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}`;
// }

function getStars(rating) {
  const roundedRating = Math.round(rating); 
  const stars =  '⭐'.repeat(roundedRating);
  return stars;
}

const searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm)
  );
  displayRecipes(filteredRecipes);
});

// function filterRecipes({ cuisine }) {
//   return recipes.filter(recipe => {
//       return recipe.cuisine.toLowerCase() === cuisine.toLowerCase();
//   });
// }

// const filteredRecipes = filterRecipes({ cuisine: "italian" }); // Change "italian" to the desired cuisine
// console.log(filteredRecipes);

