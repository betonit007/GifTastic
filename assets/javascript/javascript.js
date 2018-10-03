//////Variables/////////////
var userSearchTerm;
var termArray = [];

$(document).ready(function() {
    /////search click/////////
   $("#buttonSearch").on("click", function(event) {
    console.log("ok...");
    userSearchTerm = $("#userInput").val();
    termArray.push(userSearchTerm);
    console.log(termArray);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearchTerm + "&api_key=dc6zaTOxFJmzC";
    

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      $("#buttonField").append("<button id=" + userSearchTerm + " value =" + userSearchTerm + ">" + userSearchTerm + "</button>");
   
      var video = response.data[0].images.original.url;

      var newStr = video.replace("giphy.gif", "480w_s.jpg");
  
      $("#videoField").html("<img src=" + newStr + ">");


    });


    

   });

});


