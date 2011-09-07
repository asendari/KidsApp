var playgroundHeight = 0;
var playgroundWidth = 0;
var randomNumbers= 0;

$(document).ready(function(){
	startGame();
});

function startGame(){
	playgroundHeight = $("#playground").height();
	playgroundWidth = $("#playground").width();
	console.log("[Playground] Height : ", playgroundHeight, " Width :", playgroundWidth);
	
	/* random between 2-10 */
	randomNumbers = parseInt(Math.random()*9)+2;
	
	/* random between 1-NUM_IMAGE */
	var randomImageID = parseInt(Math.random()*NUM_IMAGE)+1;
	
	console.log("[Random] numbers : ", randomNumbers, " images :", randomImageID);
	
	/* Show image */
	for(i=0; i< randomNumbers; i++){
		var img = getImage(randomImageID);
		$(img).width("50px").appendTo("#playground").css("left", parseInt(Math.random()*(playgroundWidth-50))).css("top", parseInt(Math.random()*(playgroundHeight-50)));
	}
	
	var choices = createChoiceNumbers(randomNumbers);
	
	console.log("Possibility : ", choices);
	
	var ul = $("<ul>");
	for(i=0; i<choices.length; i++){
		var li = $("<li>").appendTo(ul);
		$("<a>").click(testNumbers).text(choices[i]).appendTo(li);
	}
	$(ul).appendTo("#menu");
}

function createChoiceNumbers(correctAnswer){
	var NUM_CHOICE = 5;
	var choices = new Array();
	var position = parseInt(Math.random()*NUM_CHOICE);
	
	for(x=0; x<NUM_CHOICE; x++){
		if(x == position){
			choices.push(correctAnswer);
		}else{
			choices.push(getFreeChoice(choices, correctAnswer));
		}
	}
	
	return choices;
}

function getFreeChoice(choices, correctAnswer){
	var find=false;
	while(find == false){
		find = true;
		var random = parseInt(Math.random()*9)+2;
		if(random != correctAnswer){
			for(i=0; i<choices.length; i++){
				if(random == choices[i]){
					find=false;
				}
			}
		}else{
			find=false;
		}
	}
	return random;
}

function testNumbers(e){
	var value = $(e.target).text();
	if(value == randomNumbers){
		alert("houra");
	}else{
		alert("bhou");
	}
}