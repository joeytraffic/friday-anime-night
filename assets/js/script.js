var spoonacularRecipeTitle = $('#food-title');
var spoonacularImage = $("#food-image");
var spoonacularLink = $("#food-link");
var spoonacularSummary = $("#food-summary");

var animetitle = $('#anime-title');
var animeurl = $('#anime-link');
var animeimage = $('#anime-image');
var animesynopsis = $('#anime-synopsis');

$(document).ready(function(){  // keep everything contained in here this ensures jquery is ready before any other code is executed
    
    
    console.log("jqueryready");// debug to confirm jquery is loaded 

    var strtBtn = $("#start-btn"); //start button variable
    
    function fetchSpoontacular(){//fetch spoontacular api
        const spoonacularUrl = "https://api.spoonacular.com/recipes/random/?";
        const spoonApiKey = "apiKey=ad5d29ecd2fe482aabd08b828d7593a3";

        
        fetch(spoonacularUrl + spoonApiKey).then(function (response) { 
            if(response.ok){
        response.json()
        .then(function (data) { 
            console.log(data);
            spoonacularRecipeTitle.text(data.recipes[0].title);
            spoonacularLink.text("Click here for the recipe!").attr("href",data.recipes[0].sourceUrl);
            spoonacularImage.attr("src",data.recipes[0].image);
            spoonacularSummary.html(data.recipes[0].summary);
         });
               
        }});

    }

 
    function jikan (){// fetch jikan api
        const jikan= "https://api.jikan.moe/v4/random/anime";
        fetch(jikan).then(function (response) {
            if(response.ok){ 
        response.json()
        .then(function (data) { 
            console.log(data.data);
            animetitle.text(data.data.title);
            animeurl.text("Click here for anime").attr("href",data.data.url);
            animeimage.attr("src",data.data.images.jpg.large_image_url);
            animesynopsis.text(data.data.synopsis);
        
        });
        }});
    }



    


        
    
    
    
    
    strtBtn.click(function(){   //click handler
        fetchSpoontacular();
        jikan();
    });




});