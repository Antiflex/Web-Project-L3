import {tttLeaderBoardService} from '../services/tttLeaderboard.js';

class tttLeaderboardControllerClass{
    async getLeaderboard(req,res) {
        try {
            const result = await tttLeaderBoardService.getLeaderboard();
            res.status(201).json(result);
        } catch (err) {
            console.log(err);
        }
    }

    async existsPlaceById(req,res) {
        try {
            const result = await tttLeaderBoardService.existsPlaceById(req.body.place);
            res.status(201).json(result);
        } catch (err) {
            console.log(err);
        }
    }

    async existsPlaceByPseudo(req,res){
        try {
            const result = await tttLeaderBoardService.existsPlaceByPseudo(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async getPlaceById(req,res) {
        try {
            const result = await tttLeaderBoardService.getPlaceById(req.body.place);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async getPlaceByPseudo(req,res) {
        try {
            const result = await tttLeaderBoardService.getPlaceByPseudo(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }


    async getLastPlace(req,res) {
        try {
            const result = await tttLeaderBoardService.getLastPlace();
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async createPlace(req,res) {
        try{
            const result = await tttLeaderBoardService.createPlace(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async updateLeaderboard(req,res){
        try{
            const result = await tttLeaderBoardService.updateLeaderboard();
            res.status(201).json(result);
        }
        catch(err){
            console.log(err);
        }
    }

    async updatePlaceByPseudo(req,res) {
        try{
            const result = await tttLeaderBoardService.updatePlaceByPseudo(req.body.oldPseudo,
                req.body.newPseudo, req.body.wins, req.body.draws, req.body.losses);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async deletePlaceByPseudo(req,res) {
        try{
            const result = await tttLeaderBoardService.deletePlaceByPseudo(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }
}

export const tttLeaderBoardController = new tttLeaderboardControllerClass();