const express = require('express');
const fs = require('fs');
const promisify = require('util')
const {response} = require("express");
const {sendGame} = require("./controllers/gamesController");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// public endpoints

// root -> index
app.get("/",(req, res) => {
    res.status(200).sendFile("public/index.html",{ root: "./" });
});

// whack-a-mole page
app.get("/whack-a-mole",(req, res) => {
    res.status(200).sendFile("whack_a_mole.ejs");
});

app.get("/tic-tac-toe",(req, res) => {
    res.status(200).render("tic_tac_toe.ejs");
});

app.get("style.css",(req,res)=> {
    res.sendFile("public/style.css",{ root: "./" });
})

app.get("/images/whack-a-mole-thumbnail",(req, res) => {
    res.sendFile("public/images/whack_a_mole_thumbnail.png",{ root: "./" });
});

app.get("/images/tic-tac-toe-thumbnail",(req, res) => {
    res.sendFile("public/images/tic_tac_toe_thumbnail.png",{ root: "./" });
});
// dynamic endpoints

app.post("/api/play", (req,res)=> {
    req.body.game = req.query.game;
    const difficultyTab = ['Easy','Medium','Hard']
    req.body.difficultyString = difficultyTab[req.body.difficulty];
    console.log(req.body);
    if(req.query.game == "whack-a-mole")
        res.render("whack_a_mole.ejs",{query : req.body});
    else
        res.render("tic_tac_toe.ejs",{query : req.body});
});

// error 404

app.all("*",(req, res) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
});

app.listen(3000,()=>{});