import express from 'express';
import session from 'express-session'

import {UserProfileController} from './controllers/userProfile.js';
import {FriendController} from "./controllers/friend.js";
import {tttLeaderBoardController} from "./controllers/tttLeaderboard.js";
import {wamLeaderBoardController} from "./controllers/wamLeaderboard.js";
import {gameSessionController} from "./controllers/gameSession.js";

import {getTttLeaderboard, getWamLeaderboard} from './controllers/leaderboardsController.js'
import {getGameParams, playTTT, playWAM, sendGame} from './controllers/gamesController.js';
import {login, userProfile, signup} from './controllers/user_log.js'

const app = express();
app.use(
    session({
        secret: "some secret",
        cookie: { maxAge: 3000000 },
        saveUninitialized: false,
        resave:false
    })
);
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

// game pages

// whack-a-mole page
app.get("/whack-a-mole",playWAM);

// tic-tac-toe page
app.get("/tic-tac-toe",playTTT);

// leaderboard pages

app.get('/ttt_leaderboard',getTttLeaderboard)

app.get('/wam_leaderboard',getWamLeaderboard)

//user related pages

// login page
app.get("/login",(req,res)=>{
    res.render("user/login",{error:req.query.error, pseudo:req.query.pseudo, info:req.query.info});
});

// signup page

app.get("/signup", (req,res)=>{
    res.render("user/signup", {error:req.query.error, pseudo:req.query.pseudo, info:req.query.info})
});

// logout

app.get("/logout",(req,res)=>{
    if(req.session.authenticated == undefined) {
        res.redirect('/login?info=You are not logged in')
    }else {
        req.session.destroy();
        res.redirect('/login?info=Succesfully logged out')
    }
})

// user profile page

app.get("/user_profile",userProfile);

// CRUD requests test page

app.get("/CRUD",(req,res)=>{
    res.render("CRUD");
})

app.post('/trylogin',login);

app.post('/trysignup',signup);

// dynamic endpoints

app.post('/api/get_game_params', getGameParams);

app.post('/api/play', sendGame);

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

app.post('/ttt_leaderboard/update_place_by_pseudo_increment', tttLeaderBoardController.updatePlaceByPseudoIncrement);

app.post('/ttt_leaderboard/delete_place_by_pseudo', tttLeaderBoardController.deletePlaceByPseudo);

// wam_leaderboard api routes

app.get('/wam_leaderboard/get_leaderboard', wamLeaderBoardController.getLeaderboard)

app.post('/wam_leaderboard/get_place_by_id', wamLeaderBoardController.getPlaceById);

app.post('/wam_leaderboard/get_place_by_pseudo', wamLeaderBoardController.getPlaceByPseudo);

app.post('/wam_leaderboard/get_last_place',wamLeaderBoardController.getLastPlace);

app.post('/wam_leaderboard/create_place', wamLeaderBoardController.createPlace);

app.get('/wam_leaderboard/update_leaderboard', wamLeaderBoardController.updateLeaderboard)

app.post('/wam_leaderboard/update_place_by_pseudo', wamLeaderBoardController.updatePlaceByPseudo);

app.post('/wam_leaderboard/update_place_by_pseudo_increment', wamLeaderBoardController.updatePlaceByPseudoIncrement);

app.post('/wam_leaderboard/delete_place_by_pseudo', wamLeaderBoardController.deletePlaceByPseudo);

// game_session api routes

app.post('/game_session/get_game_session_by_pseudo', gameSessionController.getGameSessionsByPseudo);

app.post('/game_session/get_game_session_by_two_pseudos', gameSessionController.getGameSessionsByTwoPseudos);

app.post('/game_session/create_game_session',gameSessionController.createGameSession);

// error 404

app.all("*",(req, res) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
});

app.listen(3000,()=>{});