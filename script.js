//Loads all the buttons and sets the retry and hidden buttons 
//to hidden at the start of the game
window.addEventListener('DOMContentLoaded', (event) => {  
	var startOver = document.getElementById("retry-button");
	var start = document.getElementById("start-button");
  var twr = document.getElementById("share");

	startOver.style.display = "none";
	start.style.display = "inline-block";
	twr.style.zIndex = -10;
});

//on game over the retry and share buttons are displayed
function displayButtons() {
	var startOver = document.getElementById("retry-button");
	var start = document.getElementById("start-button");
  var twr = document.getElementById("share");

  if (startOver.style.display === "none")
	{
		startOver.style.display = "block";
		start.style.display = "none";
    twr.style.zIndex = 10;
	}
  else 
	{
		startOver.style.display = "none";
		start.style.display = "inline-block";
    twr.style.zIndex = -10;
	}
}

//holds the whole game in this one function
function theGame(){
	var startOver = document.getElementById("retry-button");
	startOver.style.display = "none";

  var twr = document.getElementById("share");
	twr.style.zIndex = -10;

  const cat = document.querySelector('.cat')
  const gameScreen = document.querySelector('.game')

  /* moves the bird to the centre */
  let catLeft = 20;
  let catBottom = 50;
  let gravity = 1.25;
  let gameDone = false;
  let countPlease = false;
  let counter=0;
  let pipeTopStop,stopVal,pipeBottom,pipeMove;
  let gap = 25;
	let highScore = counter;
	var savedScore=0;

	//sets score to 0 at the start
	document.getElementById("score").innerHTML = 0

	// applies gravity to the cat by constantly lowering its position on the screen
  function startGame() {
    catBottom -= gravity
    cat.style.bottom = catBottom + '%'
    cat.style.left = catLeft + '%'
  }
  
	var start = document.getElementById("start-button");
	start.style.display = "none";

 // runs the gravity function every 20 miliseconds
  let gamertimerId = setInterval(startGame, 20)
 
  // function that makes the cat jump by 15 % of the page height when pressed
  function jump() {
    if (catBottom < 80)
      catBottom += 15
    cat.style.bottom = jump + '%'
  }

	// when the user clicks the screen the jump function happens
  document.addEventListener('click', jump)
  
	//generates the top and bottom pipes
  function makePipe() {
    let pipeLeft = 90;
		pipeMove = pipeLeft;
    let random = Math.random() * 20
    pipeBottom = random

    const pipe = document.createElement('div')
		const topPipe = document.createElement('div')
    
    if (!gameDone) 
		{
			gameScreen.appendChild(pipe)
			gameScreen.appendChild(topPipe)
		}
    pipe.classList.add('pipe')
    topPipe.classList.add('topPipe')

		//sets the pipe to appear at 90% of the vw
    pipe.style.left = pipeLeft + '%'
		topPipe.style.left = pipeLeft + '%'
    pipe.style.bottom = pipeBottom + '%'
		topPipe.style.bottom = pipeBottom + gap + 50 + '%'

    pipeTopStop = pipeBottom+20

		let timerId = setInterval(move, 20)
    // makes the pipe move and remove when at the edge of screen
	  function move() {
        pipeLeft -= 0.5
        pipe.style.left = pipeLeft + '%'
        topPipe.style.left = pipeLeft + '%'

        if (pipeLeft === -50) 
          clearInterval(timerId)  
    }
    
		// decrements the pipe's position so it can be tracked when the cat passes it 
		function moveTheLeft() {
			 while (pipeMove > 1)
					pipeMove -= 1
		}
    moveTheLeft()
    stopVal = pipeTopStop

		// if the game is not over then continue to make pipes and check if the cat hit an obstacle 
    if (!gameDone) {
      setTimeout(makePipe, 3700)
      setTimeout(checkCatCollide, 3600)
      if (countPlease)
				counter++
    }
  }

  if (!gameDone)
    makePipe()
  stopVal = pipeTopStop; //to collide next to the pipe

  function checkCatCollide(){
   // cat touches pipeTop or pipeBottom
    if ((catBottom >= stopVal+5 && catLeft >=pipeMove) || (catBottom < stopVal-10 && catLeft>=pipeMove))
    {
      countPlease = false;
      gameOver()
      clearInterval(timerId)
    }
    else
		{
			countPlease = true;
			printResult()
		}
  }

  function gameOver() {
   // stop the gravity  
	 	clearInterval(gamertimerId)

    // display the score 
		displayButtons()
    
		counter--
		printResult()
		counter++
    gameDone = true

		//prevents the user from continuing to jump
    document.removeEventListener('click', jump)
		if (counter>= highScore)
		{
			highScore = counter
			printHighScore()
		}
  }

	function printResult(){
			var print = counter+1;
			document.getElementById("score").innerHTML = print;
	}

	function printHighScore(){
		savedScore = localStorage.getItem('highest');
		if (savedScore >= highScore)
			document.getElementById("hi-score").innerHTML = savedScore;
		else
		{
			const print2 = highScore;
			localStorage.setItem('highest', print2);
			savedScore = localStorage.getItem('highest');
			document.getElementById("hi-score").innerHTML = savedScore;
		}
	}
}