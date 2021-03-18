var gameField = [];
var snakeParts = [
	{ x: 4, y: 7}
]
var vectorMovement = {
	x: 0,
	y: 0
}

var currentMove;
var Left = "Left"
var Right = "Right"
var Top = "Top"
var Down = "Down"

var food = {
	x: 9,
	y: 13
}

var timeInterval = 330;


var score = document.getElementById("score");
var currentScore = 0;


function createField(n){
	gameField = [];
	for(var i = 0; i<n; i++){
		gameField.push([])
		for(var j = 0; j<n; j++){
			gameField[i].push(null)
		}
	}
}


function showField(){
	var field = document.getElementById("gameMap")
	field.innerHTML = "";
	for(var i=0; i<gameField.length; i++){
		var tr = document.createElement("tr");
		for(var j = 0; j<gameField[i].length; j++){
			var td = document.createElement("td");
			td.className = "field-cell"
			var gotSnake = false;
			var gotFood = false;
			for(k = 0; k<snakeParts.length; k++){
				if(snakeParts[k].x == j && snakeParts[k].y == i){
					gotSnake = true;
					break;
				}
			}

			if(food.x == j && food.y == i){
				gotFood = true;
			}

			if(gotSnake){
				td.classList.add("snake-cell")
			}
			else if(gotFood){
				td.classList.add("food-cell")
			}

			tr.appendChild(td);
		}
		field.appendChild(tr);
	}
}


function handleDirectionKeyPress(e){
	if(e.keyCode == 37 && currentMove == Right){
		return;
	}
	if(e.keyCode == 39 && currentMove == Left){
		return;
	}
	if(e.keyCode == 38 && currentMove == Down){
		return;
	}
	if(e.keyCode == 40 && currentMove == Top){
		return;
	}
	console.log(e)
	// Levo 37
	// Gore 38
	// Desno 39
	// Dole 40

	if(e.keyCode == 37){
		vectorMovement = {
			x: -1,
			y: 0
		}
		currentMove = Left;
		
	}
	if(e.keyCode == 39){	
		vectorMovement = {
			x: 1,
			y: 0
		}
		currentMove = Right;
		
	}
	if(e.keyCode == 38){
		vectorMovement = {
			x: 0,
			y: -1
		}
		currentMove = Top;
		
	}
	if(e.keyCode == 40){
		vectorMovement = {
			x: 0,
			y: 1
		}
		currentMove = Down;
		
	}
	console.log(currentMove)
}

function movement(){
	if(snakeParts.length == 1){
		snakeParts[0].x += vectorMovement.x;
		snakeParts[0].y += vectorMovement.y;
	}
	else{
		var part = snakeParts.pop();
		part.x = snakeParts[0].x + vectorMovement.x
		part.y = snakeParts[0].y + vectorMovement.y
		snakeParts.unshift(part);
	}

	if(snakeParts[0].x <= -1){
		snakeParts[0].x = gameField.length-1;
	}

	if(snakeParts[0].x >= gameField.length){
		snakeParts[0].x = 0;
	}

	if(snakeParts[0].y <= -1){
		snakeParts[0].y = gameField.length-1;
	}

	if(snakeParts[0].y >= gameField.length){
		snakeParts[0].y = 0;
	}

	for(var i = 1; i<snakeParts.length; i++){
		if(snakeParts[i].x  == snakeParts[0].x && snakeParts[i].y == snakeParts[0].y){
			alert("Game over!")


			vectorMovement = {
				x: 0,
				y: 0
			}

			snakeParts = [
				{ x: 4, y: 7}
			]

			food = {
				x: 9,
				y: 13
			}

			currentScore = 0;
			score.innerHTML = 0;
			timeInterval = 330;
		}
		
	}
}

function ate(){
	if(snakeParts[0].x == food.x && snakeParts[0].y == food.y){
		return true;
	}
	return false;
}


function newFood(){
	var x;
	var y;

	do{
		var gotSnake = false
		 x = Math.floor(Math.random()*gameField.length);
		 y = Math.floor(Math.random()*gameField.length);
		 for(var i = 0; i<snakeParts.length; i++){
		 	if(snakeParts[i].x == x && snakeParts[i].y == y){
		 		gotSnake = true;
		 		break;
		 	}
		 }


	}while(gotSnake)

	food.x = x;
	food.y = y;
}

function mainLoop(){
	movement();
	if(ate()){
		var part = {
			x: snakeParts[0].x + vectorMovement.x,
			y: snakeParts[0].y + vectorMovement.y
		};
		snakeParts.unshift(part);
		currentScore += parseInt(1);
		score.innerHTML = currentScore;
		newFood();
		timeInterval -= 20;
		if(timeInterval < 90){
			timeInterval = 90;
		}
	}
	showField();
	setTimeout(()=>{
		mainLoop();
	}, timeInterval)
}
createField(25);


mainLoop();

showField()
console.log(gameField)