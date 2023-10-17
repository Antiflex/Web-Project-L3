import {gameSessionDAO} from "../dao/gameSession.js";
import {tttLeaderBoardService} from "./tttLeaderboard.js";
import * as pg from 'pg';


function resetPgDateParsers() {
    for (const pgType of typesToReset) {
        setTypeParser(pgType, val => String(val)); // like noParse() function underhood pg lib
    }
}

import {wamLeaderBoardService} from "./wamLeaderboard.js";


class gameSessionServiceClass {
    getGameSessionsByPseudo(pseudo, filters){
        return gameSessionDAO.getGameSessionsByPseudo(pseudo, filters);
    };

    getGameSessionsByTwoPseudos(pseudo1, pseudo2, filters){
        return gameSessionDAO.getGameSessionsByTwoPseudos(pseudo1, pseudo2, filters);
    };

    createGameSession(gameType, gameResult, gameDate, pseudo1, pseudo2){
        return gameSessionDAO.createGameSession(gameType, gameResult, gameDate, pseudo1, pseudo2);
    }

    async createGameSessionExtended(gameType, gameResult, gameDate, pseudo1, pseudo2){
        const res1 = await gameSessionDAO.createGameSession(gameType, gameResult, gameDate, pseudo1, pseudo2);
        const res2 = await tttLeaderBoardService.updatePlaceByPseudo(pseudo1, pseudo1, )
    }
}

export const gameSessionService = new gameSessionServiceClass();