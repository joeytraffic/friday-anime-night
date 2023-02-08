var spoonacularRecipeTitle = $('#food-title');
var spoonacularImage = $("#food-image");
var spoonacularLink = $("#food-link");
var spoonacularSummary = $("#food-summary");
$(document).ready(function(){  // keep everything contained in here this ensures jquery is ready before any other code is executed
    
    var storedFood = JSON.parse(localStorage.getItem("food")) || []; //pulls stored data out of the local storage related to food or declares stored food as and empty array
    localStorage.setItem("food",JSON.stringify(storedFood));  //sets local storage to the pulled data or empty array when jquery loads 
    
    console.log("jqueryready");// debug to confirm jquery is loaded 

    var strtBtn = $("#start-btn"); //start button variable
    
    function fetchSpoontacular(){//fetch spoontacular api
        const spoonacularUrl = "https://api.spoonacular.com/recipes/random/?";   // spoonacular fetch url
        const spoonApiKey = "apiKey=ad5d29ecd2fe482aabd08b828d7593a3";   // spoonacular api key

        
        fetch(spoonacularUrl + spoonApiKey).then(function (response) { 
            if(response.ok){ 
        response.json()
        .then(function (data) { 
            console.log(data);
            spoonacularRecipeTitle.text(data.recipes[0].title);   // sets food title element with data from spoon 
            spoonacularLink.text("Click here for the recipe!").attr("href",data.recipes[0].sourceUrl); // sets the link element to data from spoon 
            spoonacularImage.attr("src",data.recipes[0].image);  //sets the image src to data from spoon 
            spoonacularSummary.html(data.recipes[0].summary);   // sets the summary element to data from spoon 
            storedFood.push(data.recipes[0].title); // pushs a new title to the array from spoon data 
            localStorage.setItem('food',JSON.stringify(storedFood)); // stores the stored food array  into the local storage 



         });
               
        }});

    }

 
    function jikan () { // fetch jikan api
        const jikan= "https://api.jikan.moe/v4/random/anime";
        fetch(jikan) 
        .then((response) => response.json())
        .then((data) => console.log(data));
        
    }



    


        
    
    function fetchJikan(){}  //fetch jikan api 
    
    
    strtBtn.click(function(){   //click handler
        alert("click!");
        fetchSpoontacular();
        jikan();
    });




});