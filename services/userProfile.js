
import {UserProfileDAO} from '../dao/userProfile.js'
export class UserProfileServiceClass{
    getUserProfileById(pseudo){
        return UserProfileDAO.getUserProfileById(pseudo);
    }
    createUserProfile(pseudo, age, aboutMe, password){
        return UserProfileDAO.createUserProfile(pseudo, age, aboutMe, password);
    }

    updateUserProfile(pseudo, age, aboutMe){
        return UserProfileDAO.updateUserProfile(pseudo, age, aboutMe);
    }

    deleteUserProfile(pseudo){
        return UserProfileDAO.deleteUserProfile(pseudo);
    }
}

export const UserProfileService = new UserProfileServiceClass();
