import {FriendService} from '../services/friend.js';

class FriendControllerClass {
    async getFriendListById(req,res){
        console.log(`trying to get friend list of user ${req.body.pseudo}`);
        try{
            const result = await FriendService.getFriendListById(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    };

    async createFriendRow(req,res){
        console.log(`trying to create friend row of users ${req.body.pseudo1} and ${req.body.pseudo2}`);
        try{
            const ids = await FriendService.createFriendRow(req.body.pseudo1, req.body.pseudo2);
            res.status(201).json(ids);
        }
        catch(err){
            console.log(err);
        }
    };

    async deleteFriendRow(req,res){
        console.log(`trying to delete friend row of users ${req.body.pseudo1} and ${req.body.pseudo2}`);
        try{
            const ids = await FriendService.deleteFriendRow(req.body.pseudo1, req.body.pseudo2);
            res.status(201).json(ids);
        }
        catch(err){
            console.log(err);
        }
    };
}

export const FriendController =  new FriendControllerClass();