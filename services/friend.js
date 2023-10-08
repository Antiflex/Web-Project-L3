
import {FriendDAO} from '../dao/friend.js'
export class FriendServiceClass{
    getFriendListById(pseudo){
        return FriendDAO.getFriendListById(pseudo);
    }

    createFriendRow(pseudo1, pseudo2){
        return FriendDAO.createFriendRow(pseudo1, pseudo2);
    }

    deleteFriendRow(pseudo1, pseudo2){
        return FriendDAO.deleteFriendRow(pseudo1, pseudo2);
    }
}

export const FriendService = new FriendServiceClass();
