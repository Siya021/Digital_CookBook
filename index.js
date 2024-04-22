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

      

      const modal = document.createElement("div");
      modal.id = "myModal";
      modal.className = "modal";
      modal.style.display = "none";

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      const closeBtn = document.createElement("span");
      closeBtn.className = "close";
      closeBtn.innerHTML = "&times;";

      const modalContentDiv = document.createElement("div");
      modalContentDiv.id = "modal-content";
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
    <strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}
    <button onclick='mRead("${recipe.ingredients}", "${recipe.instructions}")'>Free hand mode</button>
    `;
    
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

function mRead(ingredients, instructions){

let utterance = new SpeechSynthesisUtterance(`Before we get you started 
lets make sure you have the following ingredients... ${ingredients}`);
utterance.rate = 0.9
  
const synth = speechSynthesis;
 
 let voices = synth.getVoices()
    console.log(voices.length)
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
            let utterance3 = new SpeechSynthesisUtterance(`Great let's begin.`);
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

// function filterRecipes({ cuisine }) {
//   return recipes.filter(recipe => {
//       return recipe.cuisine.toLowerCase() === cuisine.toLowerCase();
//   });
// }

// const filteredRecipes = filterRecipes({ cuisine: "italian" }); // Change "italian" to the desired cuisine
// console.log(filteredRecipes);

