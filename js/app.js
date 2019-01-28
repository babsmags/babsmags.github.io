/*
  Please add all Javascript code to this file.
*/
$(document).ready(function() {

  // call functions for each api news source on page load so that default view has all articles
  // mashableAjax();
  // diggAjax();
  // buzzfeedAjax();


  //on click will clear any articles currently on page and pull results just for source selected in dropdown
	// $("#newsSource li").click(function() {
 //      $(".loader").removeClass("hidden");     //shows loader
 //    	var newsSource = ($(this).find('a.value').text());  //get the value from dropdown
 //    	$('#sourceName').text(newsSource);   //replace news source dropdown title with selected source 
 //      $('title').html("Feedr: " + newsSource);  //replace page title with selected source name
 //      $('.contentsTitle').html(newsSource);  //replace text in box that shows contents of page
 //      $(".article").remove();  //remove any articles currently on page so next api group will load

  $("img#kardash").click(function() {
    console.log("kardashian clicked");
    $(".list-box").addClass("hidden");   //hide any current results from previous clicks
    $(".article").remove();  //remove any articles currently on page so fresh list will load
    $(".loader").removeClass("hidden");  //shows loader
    kardashAjax();
    $("#article-list").removeClass("hidden");   //show articles on page
	});

  $("img#jesstweet").click(function() {
    console.log("twitter clicked");
    $(".list-box").addClass("hidden");    //hide any current results from previous clicks
    $(".article").remove();  //remove tweet list currently on page so fresh list will load
    $(".loader").removeClass("hidden");   //shows loader
    twitterEmbed();
    $("#twitter-list").removeClass("hidden");   //show twitter feed on page
  });

  $("img#dessert").click(function() {
    console.log("cupcake clicked");
    $(".list-box").addClass("hidden");    //hide any current results from previous clicks
    $(".article").remove();  //remove tweet list currently on page so fresh list will load
    $(".loader").removeClass("hidden");   //shows loader
    dessertAjax();
    $("#recipe-list").removeClass("hidden");   //show twitter feed on page
  });


});

//functions below

function buildHtml() {
  console.log("now in buildHtml");
  $("<article>", {class: "article"}).append(
    $("<section>", {class:"impressions"}).append("News Source"),
    $("<section>", {class:"featuredImage"}).append(
      $("<img src =" + image + " alt = ''>")
      ),
    $("<section>", {class:"articleContent"}).append(
      $("<a href =" + link + ">").append(
        $("<h3>").text(title),           
        $("<h6>").text(source)
        )
      ),
    $("<section>", {class:"impressions"}).append(source),
    $("<div>", {class:"clearfix"})
  ).appendTo("#article-list")
  $(".loader").addClass("hidden");
}

function buildHtmlNone() {
  console.log("now in buildHtmlNone");
  $("<article>", {class: "article"}).append(
    $("<section>", {class:"impressions"}).append(""),
    $("<section>", {class:"featuredImage"}).append(
      $("")
      ),
    $("<section>", {class:"articleContent"}).append(
      $("<h3>").text("No Kardashian Articles to View"),           
      $("<h6>").text("Please try again later")
    ),
    $("<section>", {class:"impressions"}).append(""),
    $("<div>", {class:"clearfix"})
  ).appendTo("#article-list")
  $(".loader").addClass("hidden");
}

function twitterEmbed() {
  console.log("Twitter clicked");
  //following converts html from Twitter embed into jquery to build on the fly so not hardcoded into html
  $("<a class=twitter-timeline href=https://twitter.com/jessimagallon?ref_src=twsrc%5Etfw>").append("Tweets by jessimagallon").append(
  $("<script async src=https://platform.twitter.com/widgets.js charset=utf-8>")
  ).appendTo("#twitter-list");
}


function kardashAjax() {
  $.ajax({
    type: "GET",
    url: "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&q=Kardashian&apiKey=7767c5512ac3478ab4cbb281d64f75bd",
    // url: "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=7767c5512ac3478ab4cbb281d64f75bd",

    dataType : 'json',
    success: function(result) {
      if(result.articles.length===0) {
        console.log("No Kardashian articles to view")
        buildHtmlNone();
      } 
      else {
        for (var i = 0; i < result.articles.length; i++) {
          console.log(result.articles);
          image = result.articles[i].urlToImage;   
          title = result.articles[i].title;      
          link = result.articles[i].url;     
          source = result.articles[i].source.name;      
          buildHtml();
          }
        }
      },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
      location.reload(true);
      }  
  });
}

function dessertAjax() {
unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=4&tags=dessert")
.header("X-RapidAPI-Key", "b3822ba832msh4622b9be2937f4cp1d9e04jsnb1abab5c8fcd")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
}
