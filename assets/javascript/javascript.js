//////Variables/////////////
var userSearchTerm;
var topics = ["drones", "football", "fortnite", "saab", "robotics", "Star Wars", "Trains"];
var videoReturnAmount = 10;
var video;
var image;
var getVid;

//////create buttons////////////////
for (var i = 0; i < topics.length; i++) {
       
    $("#buttonField").append("<button id=" + topics[i] + " class='topicBut' value =" + topics[i] + ">" + topics[i] + "</button>");
}


$(document).ready(function() {

  $(document).on("click", "img", function() {
    var picValue = $(this).attr("src");

    console.log(picValue);
  });
   /////////////////on click get button text and retrieve api info//////////////////////////////////////
    $(document).on("click", "button.topicBut", function() {
        $("#videoField").empty();
        var clickValue = $(this).text();

        console.log(clickValue);


        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickValue + "&api_key=dc6zaTOxFJmzC&limit=&limit=" + videoReturnAmount + "";

        $.ajax({
          url: queryURL,
          method: "GET"
          }).then(function(response) {


         for (var i = 0; i < videoReturnAmount; i++) {
      
           video = response.data[i].images.original.url;

           image = video.replace("giphy.gif", "480w_s.jpg");
           console.log(image);
         
           $("#videoField").append("<img src=" + image + ">");

          }


        });
        
  
      });



    /////search click/////////
   $("#buttonSearch").on("click", function(event) {
     userSearchTerm = $("#userInput").val();

     topics.push(userSearchTerm);

     $("#buttonField").empty();
    
     //////add search term to array/////
     for (var i = 0; i < topics.length; i++) {
       
        $("#buttonField").append("<button id=" + topics[i] + " class='topicBut' value =" + topics[i] + ">" + topics[i] + "</button>");
     
     }

    });


    


     //var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearchTerm + "&api_key=dc6zaTOxFJmzC&limit=&limit=" + videoReturnAmount + "";

       // $.ajax({
         //  url: queryURL,
         //  method: "GET"
         //  }).then(function(response) {
         //  console.log(response);

       

       

         //for (var i = 0; i < videoReturnAmount; i++) {
      
          // var video = response.data[i].images.original.url;

          // var image = video.replace("giphy.gif", "480w_s.jpg");
         
          // $("#videoField").html("<img src=" + video + ">");

          //}


       // });
    

    

   });




