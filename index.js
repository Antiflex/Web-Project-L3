const express = require('express');
console.log("Hello World");
let g1Matrix = [
    [0,0,0],
    [0,0,0],
    [0,0,0]];

function fillMatrix(coords, choice){
    g1Matrix[coords[0]][coords[1]] = choice;
}