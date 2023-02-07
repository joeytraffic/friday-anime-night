$(document).ready(function(){  // keep everything contained in here this ensures jquery is ready before any other code is executed
    
    
    console.log("jqueryready");// debug to confirm jquery is loaded 

    var strtBtn = $("#start-btn"); //start button variable
    
    function fetchSpoontacular(){//fetch spoontacular api
        const spoonacularUrl = "https://api.spoonacular.com/recipes/random/?";
        const spoonApiKey = "apiKey=ad5d29ecd2fe482aabd08b828d7593a3";
        fetch(spoonacularUrl + spoonApiKey)
        .then((response) => response.json())
        .then((data) => console.log(data));  
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