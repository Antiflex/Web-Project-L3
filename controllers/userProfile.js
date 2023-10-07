import {UserProfileService} from '../services/userProfile.js';

class UserProfileControllerClass {
    async getUserProfileById(req,res){
        console.log(`trying to get user ${req.body.pseudo}`);
        try{
            const result = await UserProfileService.getUserProfileById(req.body.pseudo);
            res.status(201).json(result);
        }
        catch (err){
            console.log(err);
        }
    };

    async createUserProfile(req,res){
        console.log(`trying to create user ${req.body.pseudo}`);
        try{
            const id = await UserProfileService.createUserProfile(req.body.pseudo, req.body.age, "", req.body.password);
            res.status(201).json(id);
        }
        catch(err){
            console.log(err);
        }
    };
}

export const UserProfileController =  new UserProfileControllerClass();