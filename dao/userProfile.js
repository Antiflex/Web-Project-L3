import db from "../database/database.js";

class UserProfileDAOClass{

    async existsUser(pseudo){
        const [result] = await db('user_profile').where({id_name: pseudo}).count();
        return parseInt(result.count);
    }

    async getUserProfileById(pseudo) {
        if(await this.existsUser(pseudo)) {
            const [result] = await db('user_profile').select("*").where({id_name: pseudo});
            return result;
        }
        else return {error:"User doesn't exist"};
    }



    async createUserProfile(pseudo, age, aboutMe, password) {
        //check if the user already exists
        if (await this.existsUser(pseudo) === 0) {
            const [id] = await db('user_profile').insert({
                id_name: pseudo,
                age: age,
                about_me: aboutMe,
                password: password
            }).returning('*');

            return id;
        }else return {error :"User with this pseudo already exist"};
    }

    async updateUserProfile(pseudo, age, aboutMe) {
        //check if the user exists
        if (await this.existsUser(pseudo) !== 0) {
            const [id] = await db('user_profile').where({id_name: pseudo}).update({
                age: age,
                about_me: aboutMe,
            }).returning('*');
            return id;
        }else return {error :"User with this pseudo does not exist"};
    }
}

export const UserProfileDAO = new UserProfileDAOClass();