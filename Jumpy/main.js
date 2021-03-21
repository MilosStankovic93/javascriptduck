var char = document.getElementById("char");
var block = document.getElementById("block");
var start = document.getElementById("start");
var score = document.getElementById("score");
var trnScore = 0;

var goingDown = false


char.addEventListener("keydown", function(event){
	if(event.keyCode === 32){
		char.classList.add("animateJump")
		down()
	}
})

function jump(){
	if(!goingDown){
		char.classList.add("animateJump")
		down()
	}
					
	
}


function jump2(e){
	if(e.keyCode == 32){
		char.classList.add("animateJump")
		down()

	}
}


function down(){

	goingDown = setTimeout(() => {
				
				char.classList.remove("animateJump")
				goingDown = false;
				
			}, 500)

}


var isDead = setInterval(() =>{
	var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));

	var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

	if(blockLeft < 20 && blockLeft > 0 && charTop >= 130){
		block.style.animation = "none"
		block.style.display = "none"
		alert("YOU LOSE!")
		start.style.display = "block"
		trnScore = 0;
		score.innerHTML = 0;
	}

	
}, 10)



function startAgain(){
	block.style.animation = "block 1s infinite linear";
	block.style.display = ""
	start.style.display = "none"
}


function checkScore(){
	setInterval(()=>{
		var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
		if(blockLeft == 0){
			trnScore += parseInt(100);
			score.innerHTML = trnScore
		}
	}, 7)
}


checkScore()
