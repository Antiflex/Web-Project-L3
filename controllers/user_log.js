import {UserProfileService} from "../services/userProfile.js";
import {tttLeaderBoardService} from "../services/tttLeaderboard.js";
import {wamLeaderBoardService} from "../services/wamLeaderboard.js";
import {gameSessionService} from "../services/gameSession.js";

import * as bcrypt from 'bcrypt';


export async function login(req, res){
    const user = await UserProfileService.getUserProfileById(req.body.pseudo);
    if(user.success){
        console.log(user.row.password)
        const result = await bcrypt.compare(req.body.password, user.row.password)
        if(!result)
            return res.redirect('/login?error=pass');
        else {
            req.session.authenticated = true;
            req.session.pseudo = req.body.pseudo;
            return res.redirect('/user_profile');
        }
    }
    else{
        return res.redirect(`/login?error=user&pseudo=${req.body.pseudo}`);
    }
}

export async function userProfile(req, res){
    console.log('------------------------------\n')
    console.log(req.session);
    if (req.session.pseudo != undefined && req.session.pseudo != null) {
        const userResult = await UserProfileService.getUserProfileById(req.session.pseudo);
        const tttResult = await tttLeaderBoardService.getPlaceByPseudo(req.session.pseudo);
        const wamResult = await wamLeaderBoardService.getPlaceByPseudo(req.session.pseudo);
        const sessionResult = await gameSessionService.getGameSessionsByPseudo(req.session.pseudo,{});

        for (let row of [tttResult, wamResult, gameSessionService]){
            if (row.success === false){
                row.row = {}
            }
        }

        return res.render('user/user_profile', {data:JSON.stringify({
            userResult:userResult.row,
            tttResult:tttResult.row,
            wamResult:wamResult.row,
            sessionResult:sessionResult
        })});
    }
    else
        return res.redirect('/login');
}

export async function signup(req,res){
    const user = await UserProfileService.getUserProfileById(req.body.pseudo);
    if(user.success)
        return res.redirect(`/signup?error=user&pseudo=${req.body.pseudo}`);
    if(req.body.password.length < 8 || req.body.password !== req.body.confirm_password)
        return res.redirect(`/signup?error=pass`)

    // about me
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;


    const result = await UserProfileService.createUserProfile(
        req.body.pseudo,
        req.body.age,
        `Here since ${formattedToday}`,
        req.body.password);

    if(result.success === true) {
        await tttLeaderBoardService.createPlace(req.body.pseudo);
        await wamLeaderBoardService.createPlace(req.body.pseudo);
        res.redirect('/login?info=Account succesfully created');
    }
    else
        res.redirect('/signup?info=Sorry there was a problem when creating your account');
}