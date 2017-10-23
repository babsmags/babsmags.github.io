
$( document ).ready(function() {
    $("#button-family").click(function(){
    	$(".flex-container-children img, .flex-container-grandchildren img").removeClass("bigpic");
    	$(".flex-container-children p, .flex-container-grandchildren p").removeClass("bigtext");
    	$(".sibling").show();
    	$(".child").show(1000);
    	$(".grandchild").show();
	});

    $("#button-children").click(function(){
    	$(".sibling").show(1000);
    	$(".child").hide(1000);
    	$(".grandchild").hide(1000);
	});

    $("#button-grandchildren").click(function(){
    	$(".sibling").hide(1000);
    	$(".child").show(1000);
    	$(".grandchild").hide();
    	$(".flex-container-children img, .flex-container-grandchildren img").addClass("bigpic");
    	$(".flex-container-children p, .flex-container-grandchildren p").addClass("bigtext");
	});

    $("#button-great-grandchildren").click(function(){
    	$(".sibling").hide(1500);
    	$(".child").hide(1500);
    	$(".grandchild").show(1500);
    	$('.flex-container-grandchild img').addClass("bigpic");
		$(".flex-container-grandchild p").addClass("bigtext");
	});

	$("#button-eliseo").click(function(){
	    $("div.flex-container-family.eliseo .child, div.flex-container-family.eliseo .grandchild").show(1500);
	});

	$("#button-enrique").click(function(){
	    $("div.flex-container-family.enrique .child, div.flex-container-family.enrique .grandchild").show(1500);
	});

	$("#button-meno").click(function(){
	    $("div.flex-container-family.meno .child, div.flex-container-family.meno .grandchild").show(1500);
	});

	$("#button-ludy").click(function(){
	    $("div.flex-container-family.ludy .child, div.flex-container-family.ludy .grandchild").show(1500);
	});

	$("#button-patricia").click(function(){
	    $("div.flex-container-family.patricia .child, div.flex-container-family.patricia .grandchild").show(1500);
	});

	$("#button-dino").click(function(){
	    $("div.flex-container-family.dino .child, div.flex-container-family.dino .grandchild").show(1500);
	});

	$("#button-rudy").click(function(){
	    $("div.flex-container-family.rudy .child, div.flex-container-family.rudy .grandchild").show(1500);
	});
});
