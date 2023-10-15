import {UserProfileService} from "../services/userProfile.js";
import {tttLeaderBoardService} from "../services/tttLeaderboard.js";
import {wamLeaderBoardService} from "../services/wamLeaderboard.js";
import {gameSessionService} from "../services/gameSession.js";

import * as bcrypt from 'bcrypt';

const numSaltRounds = 8;

export async function login(req,res){
    const user = await UserProfileService.getUserProfileById(req.body.pseudo);
    if(user.success){
        const hash = await bcrypt.hash(req.body.password, numSaltRounds);
        let result = await bcrypt.compare(user.row.password, hash);

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