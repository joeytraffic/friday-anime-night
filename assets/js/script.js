var imageContainer = $("#img-container");
var resultsContainer = $('#results-container');     // container variables

var spoonacularRecipeTitle = $('#food-title');     // food information variables
var spoonacularImage = $("#food-image");
var spoonacularLink = $("#food-link");
var spoonacularSummary = $("#food-summary");

var animetitle = $('#anime-title');     // anime information variables
var animeurl = $('#anime-link');
var animeimage = $('#anime-image');
var animesynopsis = $('#anime-synopsis');

var refreshRecipe = $("#refresh-recipe");   // refresh button variables 
var refreshAnime = $("#refresh-anime");

var favoriteRecipe = $("#favorite-recipe-btn");   // favorite button variables 
var favoriteAnime = $('#favorite-anime-btn');

var renderFavRecipe = $("#saved-favorite-recipe");  // save button variables 
var renderFavAnime = $("#saved-favorite-anime");



$(document).ready(function () {  // keep everything contained in here this ensures jquery is ready before any other code is executed

    console.log("jqueryready");// debug to confirm jquery is loaded 

    var closeBtn = $("#close");
    var strtBtn = $("#start-btn"); //start button variable

    if (JSON.parse(localStorage.getItem('food')) !== null) {   // local storage if statements


        for (let i = 0; i < JSON.parse(localStorage.getItem('food')).length; i++) {   // favorites list population  food item
            renderFavRecipe.append("<li class='stored-food-item'>" + "<span class='item-text-food'>" + JSON.parse(localStorage.getItem('food'))[i] + "</span>" + ' <a class="button btn-close" id="close"><span class="material-symbols-outlined">close</span></a> ' + "</li>");
        };
    }
    if (JSON.parse(localStorage.getItem('anime')) !== null) {   // list population anime item
 
        for (let i = 0; i < JSON.parse(localStorage.getItem('anime')).length; i++) {
            renderFavAnime.append("<li class='stored-anime-item'>" + "<span class='item-text-anime'>" + JSON.parse(localStorage.getItem('anime'))[i] + "</span>" + ' <a class="button btn-closeA" id="close"><span class="material-symbols-outlined">close</span></a> ' + "</li>");
        };
    }

    function fetchSpoontacular() {//fetch spoontacular api
        const spoonacularUrl = "https://api.spoonacular.com/recipes/random/?";  // spoonacular url 
        const spoonApiKey = "apiKey=ad5d29ecd2fe482aabd08b828d7593a3";      // spoonacular api key

        var storedFood = JSON.parse(localStorage.getItem("food")) || []; //pulls stored data out of the local storage related to food or declares stored food as and empty array
        localStorage.setItem("food", JSON.stringify(storedFood));  //sets local storage to the pulled data or empty array when jquery loads 

        fetch(spoonacularUrl + spoonApiKey).then(function (response) {   // fetch for spoonacular
            if (response.ok) {   // check if spoon fetch is ok 
                response.json()
                    .then(function (data) {    
                        console.log(data);
                        spoonacularRecipeTitle.text(data.recipes[0].title);        //pulls data from spoonacular 
                        spoonacularImage.attr("src", data.recipes[0].image);
                        spoonacularLink.text("Click here for Recipe!");
                        spoonacularSummary.html(data.recipes[0].summary);



                        spoonacularLink.click(function () {     // click handler for spoonacular food link 
                            window.open(data.recipes[0].sourceUrl);
                        });

                        favoriteRecipe.click(function () {
                            storedFood.push(data.recipes[0].title); // pushs a new title to the array from spoon data 
                            localStorage.setItem('food', JSON.stringify(storedFood)); // stores the stored food array  into the local storage 
                            renderFavRecipe.empty();    // resets fav list every time its clicked 
                            for (let i = 0; i < JSON.parse(localStorage.getItem('food')).length; i++) {   // loop to render favorited food item to the screen 
                                renderFavRecipe.append("<li class='stored-food-item'>" + "<span class='item-text-food'>" + JSON.parse(localStorage.getItem('food'))[i] + "</span>" + ' <a class="button btn-close" id="close"><span class="material-symbols-outlined">close</span></a> ' + "</li>");
                            };


                        });

                        $(".btn-close").click(function () {   // close button click handler on the fav recipe list 
                            var item = $(this).siblings(".item-text-food").text();
                            var localStr = JSON.parse(localStorage.getItem("food"));
                            var index = localStr.indexOf(item);
                            if (index !== -1) {
                                localStr.splice(index, 1);
                                localStorage.setItem("food", JSON.stringify(localStr));
                            }
                            $(this).parent().remove();
                            $(this).remove();
                        });


                    });

            }
        });

    }
    function jikan() {// fetch jikan api
        const jikan = "https://api.jikan.moe/v4/random/anime";  // jikan fetch url 

        var storedAnime = JSON.parse(localStorage.getItem("anime")) || []; //pulls stored data out of the local storage related to food or declares stored food as and empty array
        localStorage.setItem("anime", JSON.stringify(storedAnime));  //sets local storage to the pulled data or empty array when jquery loads 

        fetch(jikan).then(function (response) {  // fetch jikan 
            if (response.ok) {  // checks if jikan information has returned ok 
                response.json()   
                    .then(function (data) {
                        console.log(data.data);        //pulls data from jikan api and displays it on the screen 
                        animetitle.text(data.data.title);
                        animeurl.text("Click here for anime!");
                        animeimage.attr("src", data.data.images.jpg.large_image_url);
                        animesynopsis.text(data.data.synopsis);
                        animeurl.click(function () {
                            window.open(data.data.url);
                        });

                        favoriteAnime.click(function () { // click handler for favorite anime button 
                            storedAnime.push(data.data.title); // pushs a new title to the array from spoon data 
                            localStorage.setItem('anime', JSON.stringify(storedAnime)); // stores the stored food array  into the local storage
                            renderFavAnime.empty();
                            for (let i = 0; i < JSON.parse(localStorage.getItem('anime')).length; i++) {  // loop for populating favorite anime list 
                                renderFavAnime.append("<li class='stored-anime-item'> " + "<span class='item-text-anime'>" + JSON.parse(localStorage.getItem('anime'))[i] + "</span>" + ' <a class="button btn-closeA" id="close"><span class="material-symbols-outlined">close</span></a> ' + "</li>");
                            };

                        });
                        $(".btn-closeA").click(function () {  // close button handler for the anime section
                            var itemA = $(this).siblings('.item-text-anime').text();
                            let localStor = JSON.parse(localStorage.getItem("anime"));
                            let indexA = localStor.indexOf(itemA);
                            if (indexA !== -1) {
                                localStor.splice(indexA, 1);
                                localStorage.setItem("anime", JSON.stringify(localStor));
                            }
                            $(this).parent().remove();
                            $(this).remove();
                        });


                    });
            }
        });
    }
    refreshRecipe.click(function () { // refreshes recipe function 
        fetchSpoontacular();
    })

    refreshAnime.click(function () { // refreshes anime function
        jikan();
    });

    strtBtn.click(function () {   //click handler for start button 
        imageContainer.css("display", "none");
        resultsContainer.css("display", "block");
        fetchSpoontacular();
        jikan();
    });
    $(".btn-close").click(function () {  //start page close button click handler for food 

       
        let item = $(this).siblings(".item-text-food").text();
        var localStr = JSON.parse(localStorage.getItem("food"));
        var index = localStr.indexOf(item);
        if (index !== -1) {
            localStr.splice(index, 1);
            localStorage.setItem("food", JSON.stringify(localStr));
        }
        $(this).parent().remove();
        $(this).remove();
    });

    $(".btn-closeA").click(function () { // start page close button handler for anime 

        
        var itemA = $(this).siblings('.item-text-anime').text();
        let localStor = JSON.parse(localStorage.getItem("anime"));
        let indexA = localStor.indexOf(itemA);
        if (indexA !== -1) {
            localStor.splice(indexA, 1);
            localStorage.setItem("anime", JSON.stringify(localStor));
        }
        $(this).parent().remove();
        $(this).remove();
    });

});