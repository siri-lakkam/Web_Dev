const scoreLabels = ['0', '15', '30', '40'];
const points = { a: 0, b: 0 };
let gameOver = false;
 
const scoreEls = {
  a: document.getElementById('score-a'),
  b: document.getElementById('score-b')
};
const gameMessage = document.getElementById('game-message');
const pointButtons = document.querySelectorAll('.point-button');
const resetButton = document.getElementById('reset-game');
 
function render() {
  const a = points.a;
  const b = points.b;
  let textA;
  let textB;
  let message;
 
  if (a >= 4 && a - b >= 2) {
    textA = 'Game';
    textB = scoreLabels[Math.min(b, 3)];
    message = 'Game, Player A! Press "Start a new game" to play again.';
    gameOver = true;
  } else if (b >= 4 && b - a >= 2) {
    textA = scoreLabels[Math.min(a, 3)];
    textB = 'Game';
    message = 'Game, Player B! Press "Start a new game" to play again.';
    gameOver = true;
  } else if (a >= 3 && b >= 3) {
    if (a === b) {
      textA = '40';
      textB = '40';
      message = 'Deuce! A player needs to win two points in a row.';
    } else if (a > b) {
      textA = 'Ad';
      textB = '40';
      message = 'Advantage, Player A.';
    } else {
      textA = '40';
      textB = 'Ad';
      message = 'Advantage, Player B.';
    }
  } else {
    textA = scoreLabels[a];
    textB = scoreLabels[b];
    message = 'Game in progress. Award a point to either player.';
  }
 
  scoreEls.a.textContent = textA;
  scoreEls.b.textContent = textB;
  gameMessage.textContent = message;
 
  pointButtons.forEach((button) => {
    button.disabled = gameOver;
  });
}
 
pointButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (gameOver) return;
    points[button.dataset.player] += 1;
    render();
  });
});
 
if (resetButton) {
  resetButton.addEventListener('click', () => {
    points.a = 0;
    points.b = 0;
    gameOver = false;
    render();
  });
}

const partnerForm = document.getElementById('partner-form');
const formMessage = document.getElementById('form-message');
 
if (partnerForm && formMessage) {
  partnerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('player-name').value.trim();
    const level = document.getElementById('player-level').value;
    const surface = partnerForm.elements['surface'].value;
    formMessage.textContent =
      'Thanks, ' + name + '! Your request for a ' + level.toLowerCase() +
      ' hitting partner on ' + surface + ' courts is ready. This is a demo, so nothing was sent.';
    partnerForm.reset();
  });
}