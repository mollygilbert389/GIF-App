
//this telling the buttons what to do & pull GIFs
var animalArray = ["winter", "snow", "Vermont", "cold", "Game of Thrones", "holiday", "Christmas", "vacation", "fire", "Autumn", "gingerbread", "turkey", "maple", "farm", "pine trees", "candles", "hot drinks"]

var numberOfGifs = 10;


$("#newValue").on("click", function (){
  var newAnimal = $("#add").val();
  animalArray.push(newAnimal);
  $("#add").val("");
  addBtn();

  })

var addBtn = function(){
  $("#buttonSpace").empty();

  for (var i = 0; i < animalArray.length; i++) {
    var newBtn = $("<button>");
    newBtn.addClass("button");
    newBtn.text(animalArray[i]);
    newBtn.on("click", function() {
      $("#gifs-appear-here").empty();
      var animal = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal +
            "&api_key=zG9cWB2fdhAqDcr9UfzJFW6DLBO8hMXP&rating" + "&limit=" + numberOfGifs;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i])
        var newDiv = $("<div>");
        newDiv.addClass("gifDiv")
        var newImage = $("<img>");
        newImage.attr("src", response.data[i].images.original_still.url)
        newImage.attr("data-still", response.data[i].images.original_still.url)
        newImage.attr("data-moving", response.data[i].images.original.url)
        
        newImage.on("click", function(){
          if ($(this).attr("data-still") == $(this).attr("src")) {
            $(this).attr("src", $(this).attr("data-moving"))
          }
          else { 
            $(this).attr("src", $(this).attr("data-still"))
          }
        })
          $(newDiv).append(newImage);
          var rating = $("<p>").text("Rating : " + response.data[i].rating)
          $(newDiv).append(rating);
          $("#gifs-appear-here").append(newDiv);

        }

      })


    })


//adding note to test Github


    $("#buttonSpace").append(newBtn);
  }
}

addBtn();


