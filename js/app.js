/*
  Please add all Javascript code to this file.
*/
$(document).ready(function() {

//action when kardashian picture is clicked
  $("img#kardash").click(function() {
    $(".list-box").addClass("hidden");   //hide any current results from previous clicks
    $(".article").remove();  //remove any articles currently on page so fresh list will load
    $(".loader").removeClass("hidden");  //shows loader
    kardashAjax();
    $("#article-list").removeClass("hidden");   //show articles on page
	});

//action when twitter is clicked
  $("img#jesstweet").click(function() {
    $(".list-box").addClass("hidden");    //hide any current results from previous clicks
    $(".article").remove();  //remove tweet list currently on page so fresh list will load
    $(".loader").removeClass("hidden");   //shows loader
    twitterEmbed();
    $("#twitter-list").removeClass("hidden");   //show twitter feed on page
  });
//action when dessert recipes is clicked
  $("img#yummly").click(function() {
    $(".list-box").addClass("hidden");    //hide any current results from previous clicks
    // $(".item").remove();  //remove recipe list currently on page so fresh list will load
    $(".loader").removeClass("hidden");   //shows loader
    yummlyAjax();
    $("#myCarousel").removeClass("hidden");   //show yummly carousel on page
  });
});

//functions below

//buildHtml will build the html for the Kardashian articles. If no articles present, will place error message on page using function buildHtmlNone
function buildHtml() {
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

//dynamically build the html for the inner part of the carousel (image, link and caption)
function buildCarouselHtml() {
    $("<div>", {class: "item"}).append(
      $("<a href =" + link + ">").append(
        $("<img src =" + image + " alt = ''>")
      ),
      $("<div>", {class:"carousel-caption"}).append(
        $("<h3>").text(title),           
        $("<h6>").text(attribution)
      )
    )
  .appendTo(".carousel-inner");
  $(".carousel-inner .item:first").addClass("active");
  $(".loader").addClass("hidden");
}

//function to do embed call to twitter, filter on tweets by Jessi Magallon, then build html dynamically
function twitterEmbed() {
  //following converts html from Twitter embed into jquery to build on the fly so not hardcoded into html
  $("<a class=twitter-timeline href=https://twitter.com/jessimagallon?ref_src=twsrc%5Etfw>").append("Tweets by jessimagallon").append(
  $("<script async src=https://platform.twitter.com/widgets.js charset=utf-8>")
  ).appendTo("#twitter-list");
}

//function to do ajax call to news api, filter on articles containing "Kardashian", then build html dynamically
function kardashAjax() {
  $.ajax({
    type: "GET",
    url: "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&q=Kardashian&apiKey=7767c5512ac3478ab4cbb281d64f75bd",
    // url: "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=7767c5512ac3478ab4cbb281d64f75bd",

    dataType : 'json',
    success: function(result) {
      if(result.articles.length===0) {
        buildHtmlNone();
      } 
      else {
        for (var i = 0; i < result.articles.length; i++) {
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

//function to do ajax call to yummly food site, and pull article ids from summary list of the first 4 dessert recipes found
//Put these 4 article ids into an array which will be used on subsequent api calls to each recipe for details (image, recipe name, caption)
function yummlyAjax() {
  $.ajax({
    type: "GET",
    url: "https://api.yummly.com/v1/api/recipes?_app_id=583a917b&_app_key=38f0cfab8f3b93443df300dc6ee62a07&allowedCourse[]=course^course-Desserts",
    // url: "http://api.yummly.com/v1/api/recipe/2-Ingredient-Weight-Watchers-Pancakes-Zero-Points-Freestyle-2645921?_app_id=583a917b&_app_key=38f0cfab8f3b93443df300dc6ee62a07",
    // url: "http://api.yummly.com/v1/api/recipe/Sugared-pecans-_gifts-from-the-kitchen_-351475?_app_id=583a917b&_app_key=38f0cfab8f3b93443df300dc6ee62a07",

    dataType : 'json',
    success: function(result) {
      var recipeArr = [];
      for (var i = 0; i < 3; i++) {
        recipeArr.push(result.matches[i].id); 
      }
      //loop through above recipe results and get values from individual recipes
      for (var i = 0; i < recipeArr.length; i++) {
        $.ajax({
          type: "GET",
          url: "https://api.yummly.com/v1/api/recipe/" + recipeArr[i] + "?_app_id=583a917b&_app_key=38f0cfab8f3b93443df300dc6ee62a07",
          // url: "http://api.yummly.com/v1/api/recipe/Sugared-pecans-_gifts-from-the-kitchen_-351475?_app_id=583a917b&_app_key=38f0cfab8f3b93443df300dc6ee62a07",

          dataType : 'json',
          success: function(result) {
            image = result.images[0].hostedLargeUrl;   
            title = result.name;      
            link = result.attribution.url;     
            attribution = "information powered by Yummly";   
            buildCarouselHtml();
            },
          error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            location.reload(true);
            }  
        });
      }
      },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
      location.reload(true);
      }  
  });
}