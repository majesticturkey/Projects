// Initialize player one's moves
let playerOneMoveOneType, playerOneMoveOneValue, playerOneMoveTwoType, playerOneMoveTwoValue, playerOneMoveThreeType, playerOneMoveThreeValue;
// Initialize player two's moves
let playerTwoMoveOneType, playerTwoMoveOneValue, playerTwoMoveTwoType, playerTwoMoveTwoValue, playerTwoMoveThreeType, playerTwoMoveThreeValue;

const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
    if (isValidType(moveOneType) &&
    isValidType(moveTwoType) &&
    isValidType(moveThreeType) &&
    isValidValue(moveOneValue) &&
    isValidValue(moveTwoValue) &&
    isValidValue(moveThreeValue) &&
    (moveOneValue + moveTwoValue + moveThreeValue < 100)){
        if (player === 'Player One') {
            playerOneMoveOneType = moveOneType;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveThreeType = moveThreeType;
            playerOneMoveOneValue = moveOneValue;
            playerOneMoveTwoValue = moveTwoValue;
            playerOneMoveThreeValue = moveThreeValue;
        } else if (player === 'Player Two') {
            playerTwoMoveOneType = moveOneType;
            playerTwoMoveTwoType = moveTwoType;
            playerTwoMoveThreeType = moveThreeType;
            playerTwoMoveOneValue = moveOneValue;
            playerTwoMoveTwoValue = moveTwoValue;
            playerTwoMoveThreeValue = moveThreeValue;
        } else {
            console.log('Invalid Player');
        }
    }
}


// Validate player moves
function isValidType(type) {
    return (type === 'rock' || type === 'paper' || type === 'scissors');
}
function isValidValue(value) {
    return (value > 0 && value < 100);
}


function matchRound(playerOneMove, playerTwoMove, playerOneValue, playerTwoValue) {
    if (!isValidType(playerOneMove) ||
    !isValidType(playerTwoMove) ||
    !isValidValue(playerOneValue) ||
    !isValidValue(playerTwoValue)) {
        return null;
    }
    switch (playerOneMove) {
        case 'rock':
            if (playerTwoMove === 'rock') { return 'Tie'; }
            if (playerTwoMove === 'paper') { return 'Player Two'; }
            if (playerTwoMove === 'scissors') { return 'Player One'; }
        case 'paper':
            if (playerTwoMove === 'rock') { return 'Player One'; }
            if (playerTwoMove === 'paper') { return 'Tie'; }
            if (playerTwoMove === 'scissors') { return 'Player Two'; }
        case 'scissors':
            if (playerTwoMove === 'rock') { return 'Player Two'; }
            if (playerTwoMove === 'paper') { return 'Player One'; }
            if (playerTwoMove === 'scissors') { return 'Tie'; }
    }
}

function getRoundWinner(round) {
    switch(round){
        case 1:
            if (matchRound(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue) === null) { return null; }
            if (matchRound(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue) === 'Tie') {
                if (playerOneMoveOneValue > playerTwoMoveOneValue) {
                    return 'Player One';
                } else if (playerOneMoveOneValue < playerTwoMoveOneValue) {
                    return 'Player Two';
                } else { return 'Tie'; }
            }
            return matchRound(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue);
        case 2:
            if (matchRound(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue) === null) { return null; }
            if (matchRound(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerOneMoveTwoValue) === 'Tie') {
                if (playerOneMoveTwoValue > playerTwoMoveTwoValue) {
                    return 'Player One';
                } else if (playerOneMoveTwoValue < playerTwoMoveTwoValue) {
                    return 'Player Two';
                } else { return 'Tie'; }
            }
            return matchRound(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue);
        case 3:
            if (matchRound(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue) === null) { return null; }
            if (matchRound(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue) === 'Tie') {
                if (playerOneMoveThreeValue > playerTwoMoveThreeValue) {
                    return 'Player One';
                } else if (playerOneMoveThreeValue < playerTwoMoveThreeValue) {
                    return 'Player Two';
                } else { return 'Tie'; }
            }
            return matchRound(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue);
        default:
            return null;
    }
}

function getGameWinner() {
    let playerOneScore = 0;
    let playerTwoScore = 0;

    for (let i = 1; i <= 3; i++) {
        if (getRoundWinner(i) === null) { return null };
        if (getRoundWinner(i) === 'Player One') {
            playerOneScore++;
        } else if (getRoundWinner(i) === 'Player Two') {
            playerTwoScore++;
        }
    }
    if (playerOneScore > playerTwoScore) { return 'Player One'; }
    else if (playerOneScore < playerTwoScore) { return 'Player Two'; }
    else { return 'Tie'; }
}

function randomMove(move) {
    switch(move) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

const setComputerMoves = () => {
    playerTwoMoveOneType = randomMove(Math.floor(Math.random() * 3));
    playerTwoMoveTwoType = randomMove(Math.floor(Math.random() * 3));
    playerTwoMoveThreeType = randomMove(Math.floor(Math.random() * 3));
    playerTwoMoveOneValue = Math.floor(Math.random() * 100);
    playerTwoMoveTwoValue = Math.floor(Math.random() * (100-playerTwoMoveOneValue));
    playerTwoMoveThreeValue = 99 - playerTwoMoveOneValue - playerTwoMoveTwoValue;
}