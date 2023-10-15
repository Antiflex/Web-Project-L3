import {gameSessionDAO} from "../dao/gameSession.js";


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
}

export const gameSessionService = new gameSessionServiceClass();