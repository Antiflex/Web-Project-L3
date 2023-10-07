import express from 'express';
import * as fs from 'fs';
import promissify from 'util'

import {getGameParams, sendGame} from './controllers/gamesController.js';
import {UserProfileController} from './controllers/userProfile.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views',  "./views");
app.use(express.static('./public'));

// public endpoints

// root -> index
app.get("/",(req, res) => {
    res.status(200).render('index.ejs',{ root: "./" });
});

// whack-a-mole page
app.get("/whack-a-mole",(req, res) => {
    res.render("whack_a_mole", {query : {pseudo : "anonymous user", game : "whack-a-mole", difficultyString : "Medium"}});
});

// tic-tac-toe page
app.get("/tic-tac-toe",(req, res) => {
    res.render("tic_tac_toe", {query : {pseudo : "anonymous user", game : "tic-tac-toe", difficultyString : "Medium"}});
});

//login page

app.get("/login",(req,res)=>{
    res.render("login");
});

// dynamic endpoints

app.post('/api/get_game_params', getGameParams);

app.post("/api/play", sendGame);

//app.post("/trylogin",tryLogin);

app.post('/create_user_profile', UserProfileController.createUserProfile);

app.get('/get_user_profile', UserProfileController.getUserProfileById);

// error 404

app.all("*",(req, res) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
});

app.listen(3000,()=>{});