import express from 'express';
import * as fs from 'fs';
import promisify from 'util'

import {getGameParams, sendGame} from './controllers/gamesController.js';
import {UserProfileController} from './controllers/userProfile.js';
import {FriendController} from "./controllers/friend.js";
import {tttLeaderBoardController} from "./controllers/tttLeaderboard.js";
import {wamLeaderBoardController} from "./controllers/wamLeaderboard.js";

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


// CRUD requests test page

app.get("/CRUD",(req,res)=>{
    res.render("CRUD");
})

// dynamic endpoints

app.post('/api/get_game_params', getGameParams);

app.post("/api/play", sendGame);

// user profile api routes

app.post('/get_user_profile', UserProfileController.getUserProfileById);

app.post('/create_user_profile', UserProfileController.createUserProfile);

app.post("/update_user_profile",UserProfileController.updateUserProfile);

app.post('/delete_user_profile', UserProfileController.deleteUserProfile);

// friend table api routes

app.post('/get_user_friendlist', FriendController.getFriendListById);

app.post('/create_friend_row', FriendController.createFriendRow);

app.post('/delete_friend_row', FriendController.deleteFriendRow);

// ttt_leaderboard api routes

app.get('/ttt_leaderboard/get_leaderboard', tttLeaderBoardController.getLeaderboard)

app.post('/ttt_leaderboard/get_place_by_id', tttLeaderBoardController.getPlaceById);

app.post('/ttt_leaderboard/get_place_by_pseudo', tttLeaderBoardController.getPlaceByPseudo);

app.post('/ttt_leaderboard/get_last_place',tttLeaderBoardController.getLastPlace);

app.post('/ttt_leaderboard/create_place', tttLeaderBoardController.createPlace);

app.get('/ttt_leaderboard/update_leaderboard', tttLeaderBoardController.updateLeaderboard)

app.post('/ttt_leaderboard/update_place_by_pseudo', tttLeaderBoardController.updatePlaceByPseudo);

app.post('/ttt_leaderboard/delete_place_by_pseudo', tttLeaderBoardController.deletePlaceByPseudo);

// wam_leaderboard api routes

app.get('/wam_leaderboard/get_leaderboard', wamLeaderBoardController.getLeaderboard)

app.post('/wam_leaderboard/get_place_by_id', wamLeaderBoardController.getPlaceById);

app.post('/wam_leaderboard/get_place_by_pseudo', wamLeaderBoardController.getPlaceByPseudo);

app.post('/wam_leaderboard/get_last_place',wamLeaderBoardController.getLastPlace);

app.post('/wam_leaderboard/create_place', wamLeaderBoardController.createPlace);

app.get('/wam_leaderboard/update_leaderboard', wamLeaderBoardController.updateLeaderboard)

app.post('/wam_leaderboard/update_place_by_pseudo', wamLeaderBoardController.updatePlaceByPseudo);

app.post('/wam_leaderboard/delete_place_by_pseudo', wamLeaderBoardController.deletePlaceByPseudo);

// error 404

app.all("*",(req, res) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
});

app.listen(3000,()=>{});