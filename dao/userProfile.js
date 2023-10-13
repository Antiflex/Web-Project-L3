import db from "../database/database.js";

class UserProfileDAOClass{

    async existsUser(pseudo){
        const [result] = await db('user_profile').where({id_name: pseudo}).count();
        return parseInt(result.count);
    }

    async getUserProfileById(pseudo) {
        if(await this.existsUser(pseudo)) {
            const [result] = await db('user_profile').select("*").where({id_name: pseudo});
            return {success:true, row:result};
        }
        else return {success:false, error:"User doesn't exist"};
    }


    async createUserProfile(pseudo, age, aboutMe, password) {
        //check if the user already exists
        if (await this.existsUser(pseudo) === 0) {
            const [row] = await db('user_profile').insert({
                id_name: pseudo,
                age: age,
                about_me: aboutMe,
                password: password
            }).returning('*');

            return {success:true, row:row};
        }else return {success:false, error :"User with this pseudo already exist"};
    }

    async updateUserProfile(pseudo, age, aboutMe) {
        //check if the user exists
        if (await this.existsUser(pseudo) !== 0) {
            const row = await db('user_profile').where({id_name: pseudo}).update({
                age: age,
                about_me: aboutMe });
            return {success:true};
        }else return {success:false, error :"User with this pseudo does not exist"};
    }

    async deleteUserProfile(pseudo) {
        //check if the user exists
        if (await this.existsUser(pseudo) !== 0) {
            const row = await db('user_profile').where({id_name: pseudo}).del('*');
            return {success:true};
        }else return {success:false, error :"User with this pseudo does not exist"};
    }
}

export const UserProfileDAO = new UserProfileDAOClass();