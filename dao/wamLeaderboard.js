import db from "../database/database.js";

class wamLeaderboardDAOClass{
    async getLeaderboard(){
        return db.select('*').from('wam_leaderboard');
    }

    async existsPlaceById(place){
        const result = await db('wam_leaderboard').where({id_place_wam: place});
        return result.length;
    }

    async existsPlaceByPseudo(pseudo){
        const result = await db('wam_leaderboard').where({id_player: pseudo});
        return result.length;
    }

    async getPlaceById(place) {
        if(await this.existsPlaceById(place)) {
            const [result] = await db('wam_leaderboard').select("*").where({id_place_wam: place});
            return {success:true, row:result};
        }
        else return {success:false, error:"This place doesn't exist"};
    }

    async getPlaceByPseudo(pseudo) {
        const result = await db('wam_leaderboard').select("*").where({id_player: pseudo});
        if (result.length) {
            return {success: true, row: result[0]};
        }
        else return {success:false, error:"This place doesn't exist"};
    }

    async getLastPlace() {
        const [max] = await db('wam_leaderboard').max('id_place_wam');
        if(max.max!==null)
            return parseInt(max.max);
        else return 0;
    }

    async createPlace(pseudo) {
        //check if the user already exists in the leaderboard, if not : create a place in the last place
        if (await this.existsPlaceByPseudo(pseudo) === 0) {
            const last = await this.getLastPlace()
            const [row] = await db('wam_leaderboard').insert({
                id_place_wam: last + 1,
                wins:0,
                losses:0,
                id_player:pseudo
            }).returning('*');

            return {success:true, row:row};
        }else return {success:false, error :"This user already exists in the leaderboard"};
    }

    async updateLeaderboard(){
        const leaderboard = await db.raw(
            'select score, id_player, wins, losses \n' +
            'from wam_leaderboard\n' +
            'join (SELECT 20*wins-15*losses as score, id_player from wam_leaderboard) using(id_player)\n' +
            'order by score desc;');
        console.log("helloooo");
        const last = await this.getLastPlace()
        let placeUpdate, place;
        const deleteLeaderboard = await db.raw("DELETE FROM wam_leaderboard;");
        for(let i = 0; i < last; i++){
            place = leaderboard.rows[i];
            placeUpdate = await this.createPlace(place.id_player);
            await this.updatePlaceById(i+1, place.wins, place.losses, place.id_player);
        }
        return leaderboard.rows;
    }

    async updatePlaceById(place, wins, losses, pseudo) {
        console.log(`updating place # ${place}`);
        //check if the user exists
        if (await this.existsPlaceById(place)) {
            const row = await db('wam_leaderboard').where({id_place_wam: place}).update({
                wins: wins,
                losses: losses,
                id_player : pseudo});
            return {success:true};
        }else return {success:false, error :"User with this pseudo does not exist in the leaderboard"};
    }

    async updatePlaceByPseudo(oldPseudo, newPseudo, wins, losses) {
        console.log(`updating place of user ${oldPseudo}`);
        //check if the user exists
        if (await this.existsPlaceByPseudo(oldPseudo)) {
            const row = await db('wam_leaderboard').where({id_player: oldPseudo}).update({
                wins: wins,
                losses: losses,
                id_player: newPseudo
            });
            return {success:true, rows:await this.getLeaderboard()};
        }else return {success:false, error :"User with this pseudo does not exist in the leaderboard"};
    }

    async deletePlaceByPseudo(pseudo) {
        // check if the user exists
        if (await this.existsPlaceByPseudo(pseudo)) {
            // delete the place
            const [place] = await db('wam_leaderboard').where({id_player: pseudo}).del('id_place_wam');
            const last = await this.getLastPlace()
            console.log(place.id_place_wam, last);
            let placeUpdate, placeNumber;
            // move every other place id up by 1 (decrementing)
            for(let i = place.id_place_wam; i < last; i++){
                console.log(`place:${i}`);
                [placeNumber] = await db('wam_leaderboard').where({id_place_wam:i+1}).returning('id_place_wam')
                console.log(placeNumber.id_place_wam);
                placeUpdate = await db('wam_leaderboard').where({id_place_wam:i+1}).update({id_place_wam:placeNumber.id_place_wam-1})
            }
            return {success:true};
        }else return {success:false, error :"User with this pseudo does not exist in the leaderboard"};
    }
}

export const wamLeaderBoardDAO = new wamLeaderboardDAOClass();