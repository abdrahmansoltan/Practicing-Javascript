'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
// same result but different method
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// switching function
const switchPlayers = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let threshold = 100;

// initialization function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

// calling the initialization function
init();

// Roling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    // if (diceEl.classList.contains('hidden'))
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch plaers
      switchPlayers();
    }
  }
});

// Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if player wins
    if (scores[activePlayer] >= threshold) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('.player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else switchPlayers();
  }
});

// Play again button
btnNew.addEventListener('click', function () {
  init();
});
