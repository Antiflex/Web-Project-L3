
import {UserProfileDAO} from '../dao/userProfile.js'
export class UserProfileServiceClass{
    getUserProfileById(pseudo){
        return UserProfileDAO.getUserProfileById(pseudo);
    }
    createUserProfile(pseudo, age, aboutMe, password){
        return UserProfileDAO.createUserProfile(pseudo, age, aboutMe, password);
    }
}

export const UserProfileService = new UserProfileServiceClass();
