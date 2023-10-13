import {wamLeaderBoardService} from '../services/wamLeaderboard.js';

class wamLeaderboardControllerClass{
    async getLeaderboard(req,res) {
        try {
            const result = await wamLeaderBoardService.getLeaderboard();
            res.status(201).json(result);
        } catch (err) {
            console.log(err);
        }
    }

    async existsPlaceById(req,res) {
        try {
            const result = await wamLeaderBoardService.existsPlaceById(req.body.place);
            res.status(201).json(result);
        } catch (err) {
            console.log(err);
        }
    }

    async existsPlaceByPseudo(req,res){
        try {
            const result = await wamLeaderBoardService.existsPlaceByPseudo(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async getPlaceById(req,res) {
        try {
            const result = await wamLeaderBoardService.getPlaceById(req.body.place);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async getPlaceByPseudo(req,res) {
        try {
            const result = await wamLeaderBoardService.getPlaceByPseudo(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }


    async getLastPlace(req,res) {
        try {
            const result = await wamLeaderBoardService.getLastPlace();
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async createPlace(req,res) {
        try{
            const result = await wamLeaderBoardService.createPlace(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async updateLeaderboard(req,res){
        try{
            const result = await wamLeaderBoardService.updateLeaderboard();
            res.status(201).json(result);
        }
        catch(err){
            console.log(err);
        }
    }

    async updatePlaceByPseudo(req,res) {
        try{
            const result = await wamLeaderBoardService.updatePlaceByPseudo(req.body.oldPseudo,
                req.body.newPseudo, req.body.wins, req.body.losses);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }

    async deletePlaceByPseudo(req,res) {
        try{
            const result = await wamLeaderBoardService.deletePlaceByPseudo(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    }
}

export const wamLeaderBoardController = new wamLeaderboardControllerClass();