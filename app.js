const express = require('express');
const fs = require('fs');
const promisify = require('util')

const app = express();
app.use(express.static("public"));
// public endpoints

app.get("/",(req, res) => {
    res.status(500).sendFile("public/index.html",{ root: "./" });
});

app.get("/whack-a-mole",(req, res) => {
    res.status(500).sendFile("public/whack_a_mole.html",{ root: "./" });
});

app.get("/tic-tac-toe",(req, res) => {
    res.status(500).sendFile("public/tic_tac_toe.html",{ root: "./" });
});

app.all("*",(req, res) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
});
app.listen(3000,()=>{});

// dynamic endpoints