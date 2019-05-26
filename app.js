//Array of foodstuffs
var foodStuffs = ["Pizza", "Pasta", "Tacos", "Doughnuts", "Cupcakes", "Waffles", "Fried Chicken", "Burrito", "Eggs", "Cheese", "Pineapple", "Sushi", "Cereal"];

//displayFoodGifs is the function to display the food GIFs from GIPHY
function displayFoodGifs() {
	var food = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&limit=10&rating&api_key=dc6zaTOxFJmzC";

    //Create AJAX call for the specific foodstuffs being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);

		//Creating a new div to hold the food
		var newDiv = $("<div>");

		//Creating a loop to open the data within the object
		for (var i in response.data) {
		    // responseElem is the current element being selected in the loop
		    var responseElem = response.data[i];

		    //We create a new div to hold the rating and gif
		    var newDiv = $("<div class='aroundGifs'>");

		    // Within the new div we append a paragraph for the rating
		    newDiv.append("<p>Rating: " + responseElem.rating + "</p>")

		    // newImg is a new image element that will hold the actual gif
		    var newImg = $("<img>");

		    // We add the following props to the new img element: 
			//   src, data-still, data-animate, data-state, class
			/* 
			NOTE: the browser ignores any attribute that starts with "data-"
			The three "data-" attributes below are just for the click handler
			function (on line 64.) 
			Reference: https://www.w3schools.com/tags/att_global_data.asp
			*/ 
		    newImg.attr({
				"src": responseElem.images.original_still.url,
				"data-still": responseElem.images.original_still.url,
				"data-animate": responseElem.images.original.url,
				"data-state": "still",
				"class": "gif"
			});

		    // As with the rating paragraph element, we append newImg to newDiv
		    newDiv.append(newImg);

		    // Finally, we take the entire newDiv, which now contains the rating
		    // paragraph element and the new img element, and add it to the
		    // "#foodGifs" element
		    $("#foodGifs").append(newDiv);

		} 
	   	
		$(".aroundGifs").css("font-family", "'Roboto', sans-serif");
		$(".aroundGifs").css("color", "white");
	   
	   // This line selects ALL elements with the "gif" class and adds
	   // an event handler for the "click" event
		$(".gif").on("click", function() {
			
			// $(this) just means "the element with class 'gif' that was clicked"
		   var state = $(this).attr("data-state");
		   
		   // $(this).attr("data-state") will either be "still" or "animate"
		   // IF it's still: we change it to animate
		   if (state === "still") {
			   
			   var newSrc = $(this).attr("data-animate");
			   $(this).attr("src", newSrc);
			   $(this).attr("data-state", "animate");
			   
			// OTHERWISE it's animate already, so we change it to still
		   } else {
			   var newSrc = $(this).attr("data-still");
			   $(this).attr("src", newSrc);
			   $(this).attr("data-state", "still");
		   }
	   }); // end of click handler
	  
	  });
	};


//Function for displaying food gifs
function buttonsAppear(){

	$("#foodButtonsView").empty();
	//Looping through our foodStuffs array
	for(var i = 0; i < foodStuffs.length; i++) {
		//Creating buttons for each food in the foodStuffs array
		var a = $("<button>");
		//Adding a class of "food" to the button
		a.addClass("food");
		//Adding a data attribute
		a.attr("data-name", foodStuffs[i]);
		//The text of the button
		a.text(foodStuffs[i]);
		//Adding the button to the div
		$("#foodButtonsView").append(a);
		//I'm making the buttons pretty below:
		$("button").css("background-color", "red");
		$("button").css("font-family", "'Roboto', sans-serif");
		$("button").css("border-radius", "20px");
		$("button").css("padding", "7px");
		$("button").css("opacity", ".8");
	}
}

	//Function that handles event where the add food button is clicked. 
	$("#add-food").on("click", function(event){
		event.preventDefault();
		var food = $("#food-input").val().trim(); //WHY AREN'T YOU WORKING?
		foodStuffs.push(food);
		buttonsAppear();

	});
	$(document).on("click", ".food", displayFoodGifs);

	buttonsAppear();
