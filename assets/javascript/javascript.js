//////Variables/////////////
var userSearchTerm;
var topics = ["drones", "football", "fortnite", "saab", "robotics", "Star Wars", "Trains"];
var videoReturnAmount = 10;
var video;
var image;
var getVid;

/////////add permanent topics///////////////
for (var i = 0; i < topics.length; i++) {
       
    $("#buttonField").append("<button id=" + topics[i] + " class='topicBut' value =" + topics[i] + ">" + topics[i] + "</button>");
}


//////check for add/saved topics////////////////
var checkStorage = JSON.parse(localStorage.getItem("SavedTopics"));

console.log(checkStorage);
if (checkStorage.length !== 0) {
  for (var t = 0; t < checkStorage.length; t++) {
  $("#buttonField").append("<button id='" + checkStorage[t] + "'class='topicBut saved' value =" + checkStorage[t] + ">" + checkStorage[t] + "</button>");
  }
}


$(document).ready(function() {

//////////////"listen" for dynamic img click///////////////////////
  $(document).on("click", "img", function() {
    var picValue = $(this).attr("data-live");
    if (picValue === "no") {
      $(this).attr("data-live", "yes");
      $(this).attr("src", $(this).attr("data-vid"));

    }
    else if (picValue === "yes") {
      $(this).attr("data-live", "no");
      $(this).attr("src", $(this).attr("data-img"));
    }

  });
   /////////////////on click get button text and retrieve api info//////////////////////////////////////
    $(document).on("click", "button.topicBut", function() {
        $("#videoField").empty();
        var clickValue = $(this).text();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickValue + "&api_key=dc6zaTOxFJmzC&limit=&limit=" + videoReturnAmount + "";

        $.ajax({
          url: queryURL,
          method: "GET"
          }).then(function(response) {

         for (var i = 0; i < videoReturnAmount; i++) {
      
           video = response.data[i].images.original.url;

           image = response.data[i].images.original_still.url;

           rating = (response.data[i].rating).toUpperCase();

           var imagElement = $("<img>");
           $(imagElement).attr("src", image).attr("data-img", image).attr("data-vid", video).attr("data-live", "no");
        
           var pImage = $("<p>");

           $(pImage).append("Rated: " + rating + "<br>").append(imagElement).addClass("gif");

         
           $("#videoField").append(pImage);

          }

        });
        
      });


    /////search click///////////////////////////////////////
   $("#buttonSearch").on("click", function(event) {
      userSearchTerm = $("#userInput").val().trim();
      $("#userInput").val('');
      if (userSearchTerm !== "") {
        /////////local storage for Topics/////////////////////
        var tempTopics = localStorage.getItem("SavedTopics");
        tempTopics = JSON.parse(tempTopics);
        tempTopics.push(userSearchTerm);
        $(".saved").remove();
       
          for (var g = 0; g < tempTopics.length; g++) {
       
           $("#buttonField").append("<button id='" + tempTopics[g] + "' class='topicBut saved' value =" + tempTopics[g] + ">" + tempTopics[g] + "</button>");
     
          }

        tempTopics = JSON.stringify(tempTopics);
        localStorage.setItem("SavedTopics", tempTopics);
      }


    });
///////////////clear user entered search terms///////////////////
    $("#clearSaved").on("click", function() {
      $(".saved").remove();
      var clearAll = [];
      clearAll = JSON.stringify(clearAll);
      localStorage.setItem("SavedTopics", clearAll);
    });

});




