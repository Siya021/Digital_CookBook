    const recipesUrl = 'https://dummyjson.com/recipes';
    const youtubeUrl = 'vidz.json';
    let allRecipes = [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
 
    fetch(recipesUrl)
    .then(response => response.json())
    .then(data => {
        allRecipes = data.recipes;
        displayRecipes(allRecipes);
    }),
    fetch(youtubeUrl)
    .then(response => response.json())
    .then(youtubeData => {
            allRecipes = youtubeData.recipes.map((recipe, index) => {
                recipe.youtubeLink = youtubeData.recipes[index].link;
                return recipe;
            });
            displayRecipes(allRecipes);
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
  
        const readMoreBtn = document.createElement('a');
        readMoreBtn.innerHTML = '<i class="fas fa-arrow-right-to-bracket fa-1xl" id="modal-icon"></i>'; 
        readMoreBtn.addEventListener('click', () => {
            showMoreDetails(recipe);
        });
        card.appendChild(readMoreBtn);
  
    if (!favorites.includes(recipe)) {
        const favoriteBtn = document.createElement('a');
        favoriteBtn.innerHTML = '<i class="fas fa-heart fa-1xl" id="modal-icon"></i>';
        favoriteBtn.addEventListener('click', () => {
            addToFavorites(recipe);
        });
        card.appendChild(favoriteBtn);
    }else {
        const deleteBtn = document.createElement('a');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.addEventListener('click', () => {
            removeFromFavorites(recipe.name);
        });
        card.appendChild(deleteBtn);
    }
        const youtubeLink = document.createElement('a');
        youtubeLink.innerHTML = '<i class="fa-regular fa-circle-play fa-1xl" id="modal-icon"></i>';
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
            <div class="modal-dialog modal-fullscreen-xxl-down">
                <div class="modal-content">
                    <div class="modal-header">
                        <img src="${recipe.image}" class="modal-image">
                        <div class="time-info">
                            <h1 class="modal-title"><strong>${recipe.name}</strong> (${recipe.mealType}) </h1>
                            <p><i class="fa-regular fa-clock"></i> Prep Time: ${recipe.prepTimeMinutes} min</p>   
                            <p><i class="fa-solid fa-clock"></i> Cook Time: ${recipe.cookTimeMinutes} min</p>
                            <p><strong><i class="fa-solid fa-people-group"></i></strong> ${recipe.servings} people/person</p>
                            <div class="modal-btns">
                                <a href="${recipe.youtubeLink}" target="_blank"><i class="fa-regular fa-circle-play fa-2xl"></i></a>
                                <a class="favoriteBtn"><i class="fas fa-heart fa-2xl"></i></a>
                                <a id="textToSpeechBtn"><i class="fa-solid fa-volume-high fa-2xl"></i></a>
                            </div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Tags: ${recipe.tags}</p>
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                        <p><strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}</p>
                    </div>
                </div>
            </div>
        `;
        const myModal = new bootstrap.Modal(modal);
        myModal.show();
    
        const textToSpeechBtn = document.getElementById('textToSpeechBtn');
        textToSpeechBtn.addEventListener('click', () => {
            // Call the mRead function passing ingredients and instructions
            mRead(recipe.ingredients, recipe.instructions);
        });
    
        const favoriteBtn = modalContent.querySelector('.favoriteBtn');
        favoriteBtn.addEventListener('click', () => {
            addToFavorites(recipe);
            updateFavoritesNav();
        });
    }
  
    function mRead(ingredients,instructions){
  
      let utterance = new SpeechSynthesisUtterance(`Before we get you started 
      lets make sure you have the following ingredients... ${ingredients}`);
      utterance.rate = 0.9
        
      const synth = speechSynthesis;
       
       let voices = synth.getVoices()
       
           utterance.voice = voices[0];
          
          utterance.addEventListener("end", (event) => {
      
            setTimeout(() => {
              
              let utterance2 = new SpeechSynthesisUtterance(`Shall we begin?`);
              utterance2.voice = voices[0];
              utterance2.rate = 0.8
              speechSynthesis.speak(utterance2);
      
              const user = confirm("Shall we begin?");
      
              if(user)
              {
                  let utterance3 = new SpeechSynthesisUtterance(`Great let's begin.${instructions}`);
                  utterance3.voice = voices[0];
                  utterance3.rate = 0.8
                  speechSynthesis.speak(utterance3);
      
                  const ins = instructions.split(".,");
                  let nextStep = true;
      
                  let counter = 0;
      
                  let inter = setInterval(() => {
      
                    if(nextStep)
                    {
                      utterance3.text = `Step ${counter+1}, ${ins[counter]}`
                      speechSynthesis.speak(utterance3);
      
                      nextStep = false
                      counter++;
      
                      utterance3.addEventListener("end", (event) => {
                        nextStep = true
                      });
                    }
      
                    if(counter == ins.length){
      
                      setTimeout(() => {
                        utterance3.text = `Cooking complete, Well done!`
                        speechSynthesis.speak(utterance3);
                      }, 3000)
                      
                      clearInterval(inter);
                    }
                  }, 1500)
                }
            }, 1000)
          });
          
          speechSynthesis.speak(utterance);
      
      }

    function getStars(rating) {
        const roundedRating = Math.round(rating);
        const stars = '🔥'.repeat(roundedRating);
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
        favoritesNav.textContent = `FAVORITES (${favorites.length})`;
    }
  
    function saveFavoritesToLocalStorage() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  
    const favoritesNav = document.getElementById('favorites');
    favoritesNav.addEventListener('click', () => {
        displayRecipes(favorites);
    });

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRecipes = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
        displayRecipes(filteredRecipes);
    });


function mysort(dlevel){

    console.log(dlevel)

    const difficultyOrder = ["none","easy","medium","hard"]

    const selectedDifficultyIndex = difficultyOrder.indexOf(dlevel.toLowerCase());

    console.log(allRecipes)
    
    let res = allRecipes.sort((a,b)=>{
        const difficultyA = difficultyOrder.indexOf(a.difficulty.toLowerCase());
        const difficultyB = difficultyOrder.indexOf(b.difficulty.toLowerCase());

        if(difficultyA === 0 || difficultyA === selectedDifficultyIndex){
            return -1;
        }else if (difficultyB === 0 || difficultyB === selectedDifficultyIndex){
            return 1;
        }else {
        return difficultyA - difficultyB;
    }
    })
    console.log(res)
    displayRecipes(res);
}

const sortDropdown = document.getElementById('difficulty');
sortDropdown.addEventListener('change',function(){
    const selectedDifficulty = sortDropdown.ariaValueMax;
    let dvalue  = sortDropdown.value
    
    

    const sortedRecipes = allRecipes.filter(recipe => recipe.difficulty === selectedDifficulty)
    mysort(dvalue);
    console.log("All sorted",sortedRecipes)
})

function filterRecipesByMealType(recipes, mealType){
    const validMealTypes = ["Breakfast","Lunch","Dinner"];
    
    if (!validMealTypes.includes(mealType)){
        console.error("Invalid meal type. Please provide 'Breakfast','Lunch' or 'Dinner'.");
        return[];
    }
    const filtered =  recipes.filter(recipe => recipe.mealType.includes(mealType));

    return filtered
}

document.addEventListener("DOMContentLoaded", function(){
    const radioInputs = document.querySelectorAll('input[name= "mealType"]');
    radioInputs.forEach(input => {
        input.addEventListener("change", function(){
            const selectedMealType = this.value;
            console.log(allRecipes)
            const filteredRecipes = filterRecipesByMealType(allRecipes, selectedMealType);
    
            displayRecipes(filteredRecipes)
        })
    })
    
})
