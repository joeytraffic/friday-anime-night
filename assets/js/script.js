var resultsContainer = $('#results-container');

var spoonacularRecipeTitle = $('#food-title');
var spoonacularImage = $("#food-image");
var spoonacularLink = $("#food-link");
var spoonacularSummary = $("#food-summary");

var animetitle = $('#anime-title');
var animeurl = $('#anime-link');
var animeimage = $('#anime-image');
var animesynopsis = $('#anime-synopsis');

var refreshRecipe = $("#refresh-recipe");
var refreshAnime = $("#refresh-anime");

var favoriteRecipe = $("#favorite-recipe-btn");
var favoriteAnime = $('#favorite-anime-btn');

var renderFavRecipe = $("#saved-favorite-recipe");
var renderFavAnime = $("#saved-favorite-anime");

$(document).ready(function(){  // keep everything contained in here this ensures jquery is ready before any other code is executed
    
    console.log("jqueryready");// debug to confirm jquery is loaded 
    
    var strtBtn = $("#start-btn"); //start button variable
    
    if(JSON.parse(localStorage.getItem('food')) !== null){
    
    
    for (let i = 0; i < JSON.parse(localStorage.getItem('food')).length; i++){
    renderFavRecipe.append("<li class='stored-food-item'>" + JSON.parse(localStorage.getItem('food'))[i] + "</li>");
    };
}
    if (JSON.parse(localStorage.getItem('anime')) !== null){
    
    for (let i = 0; i < JSON.parse(localStorage.getItem('anime')).length; i++){
        renderFavAnime.append("<li class='stored-anime-item'>" + JSON.parse(localStorage.getItem('anime'))[i] + "</li>");
    };
    }
    
    function fetchSpoontacular(){//fetch spoontacular api
        const spoonacularUrl = "https://api.spoonacular.com/recipes/random/?";
        const spoonApiKey = "apiKey=ad5d29ecd2fe482aabd08b828d7593a3";
        
        var storedFood = JSON.parse(localStorage.getItem("food")) || []; //pulls stored data out of the local storage related to food or declares stored food as and empty array
        localStorage.setItem("food",JSON.stringify(storedFood));  //sets local storage to the pulled data or empty array when jquery loads 
        
        fetch(spoonacularUrl + spoonApiKey).then(function (response) { 
            if(response.ok){
        response.json()
        .then(function (data) { 
            console.log(data);
            spoonacularRecipeTitle.text(data.recipes[0].title);
            spoonacularImage.attr("src",data.recipes[0].image);
            spoonacularLink.text("Click here for Recipe!");
            spoonacularSummary.html(data.recipes[0].summary);

            
            
            spoonacularLink.click(function(){
                window.open(data.recipes[0].sourceUrl);   
            });
            
            favoriteRecipe.click(function(){
                storedFood.push(data.recipes[0].title); // pushs a new title to the array from spoon data 
                localStorage.setItem('food',JSON.stringify(storedFood)); // stores the stored food array  into the local storage 
                renderFavRecipe.empty();
                for (let i = 0; i < JSON.parse(localStorage.getItem('food')).length; i++){
                    renderFavRecipe.append("<li class='stored-food-item'>" + JSON.parse(localStorage.getItem('food'))[i] + "</li>");
                };
            
            })
         });
               
        }});

    }

 
    function jikan (){// fetch jikan api
        const jikan= "https://api.jikan.moe/v4/random/anime";

        var storedAnime = JSON.parse(localStorage.getItem("anime")) || []; //pulls stored data out of the local storage related to food or declares stored food as and empty array
        localStorage.setItem("anime",JSON.stringify(storedAnime));  //sets local storage to the pulled data or empty array when jquery loads 

        fetch(jikan).then(function (response) {
            if(response.ok){ 
        response.json()
        .then(function (data) { 
            console.log(data.data);
            animetitle.text(data.data.title);
            animeurl.text("Click here for anime!");
            animeimage.attr("src",data.data.images.jpg.large_image_url);
            animesynopsis.text(data.data.synopsis);
            animeurl.click(function(){
                window.open(data.data.url);
            });
            
            favoriteAnime.click(function(){
                storedAnime.push(data.data.title); // pushs a new title to the array from spoon data 
                localStorage.setItem('anime',JSON.stringify(storedAnime)); // stores the stored food array  into the local storage
                renderFavAnime.empty();
                for (let i = 0; i < JSON.parse(localStorage.getItem('anime')).length; i++){
                    renderFavAnime.append("<li class='stored-anime-item'>" + JSON.parse(localStorage.getItem('anime'))[i] + "</li>");
                };
            
            })
        
        });
        }});
    }



    


        
    
    refreshRecipe.click(function(){ // refreshes recipie
        fetchSpoontacular();
    })
    
    refreshAnime.click(function(){ // refreshes anime
        jikan();
    });
    
    strtBtn.click(function(){   //click handler
        
        fetchSpoontacular();
        jikan();
    });




});