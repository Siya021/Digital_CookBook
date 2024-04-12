document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/recipes')
    .then(res => res.json())
    .then(json => {
        const container = document.getElementById('json-container');
        json.recipes.slice(0,12).forEach(recipe => {
            const card = createCard(recipe);
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

    function createCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = recipe.image;
        card.appendChild(image);

        const name = document.createElement('h2');
        name.textContent = recipe.name;
        card.appendChild(name);

        const ingredients = document.createElement('p');
        ingredients.innerHTML = `<h5>Ingredients:</h5> ${recipe.ingredients}`;
        card.appendChild(ingredients);
        
        const instructions = document.createElement('p');
        instructions.innerHTML = `<h5>Instructions:</h5> ${recipe.instructions}`;
        card.appendChild(instructions);

        return card;
    }
});
