const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
const searchSubmit = document.getElementById("submit")
let searchQuery = '';
const APP_ID = "81aff2cb";
const APP_key = "79fd9f9b3d22190e62b9f270ff36c40d";

// form submit event
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    // console.log(searchQuery)
    fetchAPI();
  })

//   search icon click event
searchSubmit.addEventListener("click", ()=>{
    searchQuery =document.querySelector('input').value;
    // console.log(searchQuery)
    fetchAPI();
})

// get the datas from API
  async function fetchAPI(){
    try {
      const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=50`;
    const response = await fetch(baseURL); 
    const data = await response.json();
    generateHTML(data.hits)
    console.log(data);
    if(!response.ok) throw new Error("Failed to get the datas");
    } catch (error) {
      console.log(error.message)
    }
  }

// append the datas to html
  function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML= '';
    results.map(result=>{
       generatedHTML+=`   
        <div class="item">
       <img src="${result.recipe.image}" alt="reciepe image">
       <div class="flex-container">
           <h1 class="title">${result.recipe.label}</h1>
           <a href="${result.recipe.url}" target="_blank" class="view-button">View Recipe</a>
       </div>
       <p class="item-data">Calories:${result.recipe.calories.toFixed(2)}</p>
       <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
       <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
   </div>`
    })
    searchResultDiv.innerHTML= generatedHTML;
  }