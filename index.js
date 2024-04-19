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
      card.appendChild(readMoreBtn);

      var modal = document.createElement("div");
      modal.id = "myModal";
      modal.className = "modal";
      modal.style.display = "none";

      var modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      var closeBtn = document.createElement("span");
      closeBtn.className = "close";
      closeBtn.innerHTML = "&times;";

      var modalContentDiv = document.createElement("div");
      modalContentDiv.id = "modal-content";

      modalContent.appendChild(closeBtn);
      modalContent.appendChild(modalContentDiv);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      function openModal() {
          modal.style.display = "block";
      }

      function closeModal() {
          modal.style.display = "none";
      }

      closeBtn.addEventListener("click", closeModal);

      window.addEventListener("click", function(event) {
          if (event.target == modal) {
              closeModal();
          }
      });
      
      // const modal = document.getElementById('myModal');

      // const modalContent = document.getElementById('modal-content');

      // modalContent.style.backgroundColor = '#fefefe';
      // modalContent.style.margin = '15% auto';
      // modalContent.style.padding = '20px';
      // modalContent.style.border = '1px solid #888';
      // modalContent.style.width = '80%';
      // modalContent.style.padding = '20px';

      // const closeBtn = document.getElementsByClassName('close')[0];
      

      // readMoreBtn.addEventListener('click', () => {
      //   showMoreDetails(recipe);
      //   modal.style.display = 'block'; 
      // });
      
      // closeBtn.addEventListener('click', () => {
      //   modal.style.display = 'none';
      // });
      
      // window.addEventListener('click', (event) => {
      //   if (event.target === modal) {
      //     modal.style.display = 'none';
      //   }
      // });

      showMoreDetails(recipe, modalContent);

       recipesContainer.appendChild(card);   
})};

function showMoreDetails(recipe, modalContent) {
  modalContent.innerHTML = `Details for <strong>${recipe.name}</strong><br>
    <strong>Ingredients:</strong> ${recipe.ingredients}<br>
    <strong>Instructions:</strong> ${recipe.instructions}<br>
    <strong>Serving:</strong> ${recipe.servings}<br>
    <strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}`;
}

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



// Fetch data from the API
