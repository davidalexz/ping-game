var scores, roundScores, activePlayer, gamePlaying;

init();

/* scores = [0,0];
roundScores = 0;
activePlayer = 0; //tells us which is the currently active player, 0 will be the 1st player and 1 will the second player
/*

// document.querySelector("#current-" + activePlayer).textContent = dice; //we can use the activePlayer variable to select stuff, all we need to do is build our string here. Because of type coercion, JS will convert ("#current-" + activePlayer) to current-0 / 1- IF activePlayer = 0 or if it's 1. - IMPORTANT we need to change the activePlayer so we know which player turn it is; .textContent only changes the text and not the HTML

/*
document.querySelector("#current-" + activePlayer).innerHTML = "<strong>" + dice + "</strong>";
if we want to change the HTML and not the text, we use innerHTML method
*/

/*We can also use .querySelector method to actually only read from a webpage and store them in a variable for example. We can use .querySelector(it's a setter and a getter) to set a value(like the example above) and also to get a value like the var x example.

var x = document.querySelector("#score-1").textContent;
*/

// we can also use the query selector to change the CSS of some element.

//add Event listener to the Roll the Dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
	// what happens as soon as someone clicks the button ?
	if (gamePlaying) {
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// 3. Update the round score but only IF the rolled number was NOT a 1
		if (dice !== 1) {
			//Add score
			roundScores += dice; //roundScore = roundScore + dice -> we update the round score
			document.querySelector('#current-' + activePlayer).textContent = roundScores; //we display the round score in our user interface
		} else {
			//Next player
			nextPlayer();
		}
	}
});

//Event listener for HOLD button

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//1. add Current score to the Global score
		scores[activePlayer] += roundScores;

		//2. Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//3. Check if player won the game
		if (scores[activePlayer] >= 50) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

function nextPlayer() {
	//we defined the function to not repeat ourselves in the 3rd points of the HOLD and DICE buttons so that we only have to call the function.
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //ternary operator
	roundScores = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScores = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0'; //we used getElementById to as another method which is a little bit faster than querySelection, ONLY WORKS FOR ID's.
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
