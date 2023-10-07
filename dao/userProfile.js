import db from "../database/database.js";

class UserProfileDAOClass{
    async getUserProfileById(pseudo) {
        const [result] = await db('user_profile').select("*").where({id_name: pseudo});
        return result;
    }
    async createUserProfile(pseudo, age, aboutMe, password){
        const [id] = await db('user_profile').insert({
            id_name:pseudo,
            age:age,
            about_me:aboutMe,
            password:password
        }).returning('id_name');

        return id;
    }
}

export const UserProfileDAO = new UserProfileDAOClass();