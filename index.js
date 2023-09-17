const express = require('express');
console.log("Hello World");

// matrix for the tic-tac-toe game
// 0 = empty square, 1 = filled with a cross, 2 = filled with a circle
let ticTacToeMat = [
    [0,0,0],
    [0,0,0],
    [0,0,0]];

function fillMatrix(coords, choice){
    if (ticTacToeMat[coords[0]][coords[1]] !== 0) {
        ticTacToeMat[coords[0]][coords[1]] = choice;
    }
    else
        throw new Error('square is already filled')
}

console.log(ticTacToeMat)