let allRecipes = [];
fetch('https://dummyjson.com/recipes')
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
      card.appendChild(readMoreBtn);
      
      const modal = document.getElementById('myModal');
      const modalContent = document.getElementById('modal-content');
      modalContent.style.backgroundColor = '#fefefe';
      modalContent.style.margin = '15% auto';
      modalContent.style.padding = '20px';
      modalContent.style.border = '1px solid #888';
      modalContent.style.width = '80%';
      modalContent.style.padding = '20px';
      const closeBtn = document.getElementsByClassName('close')[0];
      
      readMoreBtn.addEventListener('click', () => {
        showMoreDetails(recipe);
        modal.style.display = 'block'; 
      });
      
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
      
      function showMoreDetails(recipe) {
        modalContent.innerHTML = `Details for <strong>${recipe.name}</strong><br>
          <strong>Ingredients:</strong> ${recipe.ingredients}<br>
          <strong>Instructions:</strong> ${recipe.instructions}<br>
          <strong>Serving:</strong> ${recipe.servings}<br>
          <strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}`;
      }
      
       recipesContainer.appendChild(card);
})};




function getStars(rating) {
  const roundedRating = Math.round(rating); 
  const stars =  '⭐'.repeat(roundedRating);
  return stars;
}