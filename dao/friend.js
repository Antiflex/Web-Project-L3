import db from "../database/database.js";
import {UserProfileDAO} from './userProfile.js';

class FriendDAOClass{
    async getFriendListById(pseudo) {
        if(await UserProfileDAO.existsUser(pseudo)) {
            const result = await db('is_friend_with').select("id_player_2 as friend").where({id_player_1: pseudo})
                .union(function () {
                    this.select("id_player_1").from("is_friend_with").where({id_player_2: pseudo})
                });
                let friends=[];
                for (let i = 0; i<result.length; i++) {
                    friends[i] = result[i].friend;
                }
                    return {success:true, friends:friends};
        }else return {success:false, error:"User doesn't exist"}
    }

    async areFriends(pseudo1, pseudo2){
        // -------dev console log ---------
        const existsPLayer1 = await UserProfileDAO.existsUser(pseudo1);
        const existsPLayer2 = await UserProfileDAO.existsUser(pseudo2);
        const P1 = await UserProfileDAO.getUserProfileById(pseudo1);
        const P2 = await UserProfileDAO.getUserProfileById(pseudo2);
        console.log(P1, P2);
        console.log(`Exist player ? = ${existsPLayer1} , ${existsPLayer2}`);
        // ---------------------------------
        if(existsPLayer1 && existsPLayer2) {
            const[result] = await db('is_friend_with')
                .where({id_player_1: pseudo1, id_player_2: pseudo2})
                .orWhere({id_player_1:pseudo2, id_player_2:pseudo1}).count();
            return {value: parseInt(result.count), success:true, error:null};
        } else return {value: null, success:false, error: "One user or more do not exist "};
    };

    async createFriendRow(pseudo1, pseudo2) {
        //check if the users exist and are not already friends
        const areFriends = await this.areFriends(pseudo1, pseudo2);
        console.log(`areFriends = ${areFriends}`);
        if (areFriends.value === 0) {
            const [row] = await db('is_friend_with')
                .insert({
                    id_player_1: pseudo1,
                    id_player_2: pseudo2 })
                .returning(['id_player_1', 'id_player_2']);
            return {success:true, row:row};
        }else if(areFriends.value > 0) return {error :"Users are already friends"};
        else return {success:false, error:areFriends.error};
    }

    async deleteFriendRow(pseudo1, pseudo2) {
        //check if the users exist and are already friends
        const areFriends = await this.areFriends(pseudo1, pseudo2);
        if (areFriends.value > 0) {
            const [ids] = await db('is_friend_with').del()
                .where({id_player_1: pseudo1, id_player_2: pseudo2})
                .orWhere({id_player_1:pseudo2, id_player_2:pseudo1}).count("id_player_1")
                .returning(['id_player_1', 'id_player_2']);
            return {success:true};
        }else if(areFriends.value === 0){
            return {success:false, error:"Users are not friends"};
        }
        else return {success:false, error:areFriends.error};
    }
}

export const FriendDAO = new FriendDAOClass();