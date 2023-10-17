import {gameSessionService} from "../services/gameSession.js";

class gameSessionControllerClass {
    async getGameSessionsByPseudo(req,res){
        try{
            const result = await gameSessionService.getGameSessionsByPseudo(req.body.pseudo, req.body.filters);
            console.log(req.body)
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    };

    async getGameSessionsByTwoPseudos(req,res){
        try{
            const result = await gameSessionService.getGameSessionsByTwoPseudos(req.body.pseudo1,req.body.pseudo2, req.body.filters);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    };

    async createGameSession(req,res){
        console.log('--------------------\n req :',req.body);
        try{
            const result = await gameSessionService.createGameSession(req.body.gameType, req.body.gameResult,
                req.body.gameDate, req.body.pseudo1, req.body.pseudo2);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

}

export const gameSessionController = new gameSessionControllerClass();