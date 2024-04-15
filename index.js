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
      readMoreBtn.addEventListener('click', () => {
        showMoreDetails(recipe);
      });
      card.appendChild(readMoreBtn);
    
    // function showMoreDetails(recipe) {
    // const card = document.getElementById(`recipe-${recipe.id}`);
    // const detailsSection = card.querySelector('.details-section');
    // detailsSection.classList.toggle('expanded');
    
    // const readMoreBtn = card.querySelector('.read-more-btn');
    // if (detailsSection.classList.contains('expanded')) {
    //     readMoreBtn.textContent = 'Read Less';
    // } else {
    //     readMoreBtn.textContent = 'Read More';

      recipesContainer.appendChild(card);
    })};


function showMoreDetails(recipe) {
    alert(`Details for ${recipe.name}:
    Ingredients: ${recipe.ingredients}
    Instructions: ${recipe.instructions}
    Serving: ${recipe.servings}
    Calories per Serving: ${recipe.caloriesPerServing}`);
}

function getStars(rating) {
  const roundedRating = Math.round(rating); 
  const stars = '🔥'.repeat(roundedRating);
  return stars;
}