document.addEventListener("DOMContentLoaded", function () {
  const recipesUrl = 'https://dummyjson.com/recipes';
  const youtubeUrl = 'vidz.json';
  let allRecipes = [];
  let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Load favorites from localStorage

  Promise.all([
      fetch(recipesUrl).then(response => response.json()),
      fetch(youtubeUrl).then(response => response.json())
  ])
      .then(([recipesData, youtubeData]) => {
          allRecipes = recipesData.recipes.map((recipe, index) => {
              recipe.youtubeLink = youtubeData.recipes[index].link;
              return recipe;
          });
          displayRecipes(allRecipes);
      });

  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredRecipes = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
      displayRecipes(filteredRecipes);
  });

  function displayRecipes(recipes) {
      const recipesContainer = document.getElementById('recipes');
      recipesContainer.innerHTML = '';

      recipes.forEach(recipe => {
          const card = createRecipeCard(recipe);
          recipesContainer.appendChild(card);
      });
  }

  function createRecipeCard(recipe) {
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
          showMoreDetails(recipe);
      });
      card.appendChild(readMoreBtn);

      if (!favorites.includes(recipe)) {
          const favoriteBtn = document.createElement('button');
          favoriteBtn.textContent = 'Favorite';
          favoriteBtn.addEventListener('click', () => {
              addToFavorites(recipe);
          });
          card.appendChild(favoriteBtn);
      } else {
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => {
              removeFromFavorites(recipe.name);
          });
          card.appendChild(deleteBtn);
      }

      const youtubeLink = document.createElement('a');
      youtubeLink.textContent = 'Watch on YouTube';
      youtubeLink.href = recipe.youtubeLink;
      youtubeLink.target = '_blank';
      card.appendChild(youtubeLink);

      return card;
  }


  function showMoreDetails(recipe) {
      const modal = document.getElementById('myModal');
      const modalContent = document.getElementById('modal-content');
      modal.style.display = "block";
      modalContent.innerHTML = `
          <h2>${recipe.name}</h2>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          <p><strong>Serving:</strong> ${recipe.servings}</p>
          <p><strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}</p>
      `;
  }

  const closeModalBtn = document.getElementsByClassName('close')[0];
  const modal = document.getElementById('myModal');

  closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  function getStars(rating) {
      const roundedRating = Math.round(rating);
      const stars = '⭐'.repeat(roundedRating);
      return stars;
  }


  function addToFavorites(recipe) {
      if (!favorites.includes(recipe)){
      favorites.push(recipe);
      updateFavoritesNav();
      saveFavoritesToLocalStorage();
  }}

  function removeFromFavorites(recipeName) {
      favorites = favorites.filter(recipe => recipe.name !== recipeName);
      updateFavoritesNav();
      saveFavoritesToLocalStorage();
      displayRecipes(favorites);
  }

  function updateFavoritesNav() {
      const favoritesNav = document.getElementById('favorites');
      favoritesNav.textContent = `Favorites (${favorites.length})`;
  }

  function saveFavoritesToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  const favoritesNav = document.getElementById('favorites');
  favoritesNav.addEventListener('click', () => {
      displayRecipes(favorites);
  });
});