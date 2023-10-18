import db from "../database/database.js";
import {UserProfileService} from "../services/userProfile.js";

class tttLeaderboardDAOClass{
    async getLeaderboard(){
        return db.select('*').from('ttt_leaderboard').orderBy('id_place_ttt','asc').limit(20);
    }

    async existsPlaceById(place){
        const result = await db('ttt_leaderboard').where({id_place_ttt: place})
        return result.length;
    }

    async existsPlaceByPseudo(pseudo){
        const result = await db('ttt_leaderboard').where({id_player: pseudo});
        return result.length;
    }

    async getPlaceById(place) {
        if(await this.existsPlaceById(place)) {
            const [result] = await db('ttt_leaderboard').select("*").where({id_place_ttt: place});
            return {success:true, row:result};
        }
        else return {success:false, error:"This place doesn't exist"};
    }

    async getPlaceByPseudo(pseudo) {
        const result = await db('ttt_leaderboard').select("*").where({id_player: pseudo});
        if (result.length) {
            return {success: true, row: result[0]};
        }
        else return {success:false, error:"This place doesn't exist"};
    }

    async getLastPlace() {
        const [max] = await db('ttt_leaderboard').max('id_place_ttt');
        if(max.max!==null)
            return parseInt(max.max);
        else return 0;
    }

    async createPlace(pseudo) {
        // check if the user is registered in the user_profile table
        if(!await UserProfileService.existsUser(pseudo)){
            return {success:false, error:"This user doesn't exist"};
        }
        //check if the user already exists in the leaderboard, if not : create a place in the last place
        if (await this.existsPlaceByPseudo(pseudo) === 0) {
            const last = await this.getLastPlace()
            const [row] = await db('ttt_leaderboard').insert({
                id_place_ttt: last + 1,
                wins:0,
                draws:0,
                losses:0,
                id_player:pseudo
            }).returning('*');

            return {success:true, row:row};
        }else return {success:false, error :"This user already exists in the leaderboard"};
    }

    async updateLeaderboard(){
        const leaderboard = await db.raw(
            'select score, id_player, wins, draws, losses \n' +
            'from ttt_leaderboard\n' +
            'join (SELECT 20*wins-15*losses as score, id_player from ttt_leaderboard) using(id_player)\n' +
            'order by score desc;');
        console.log("helloooo");
        const last = await this.getLastPlace()
        let placeUpdate, place;
        const deleteLeaderboard = await db.raw("DELETE FROM ttt_leaderboard;");
        for(let i = 0; i < last; i++){
            place = leaderboard.rows[i];
            placeUpdate = await this.createPlace(place.id_player);
            if(!(placeUpdate.success))
                i--;
            await this.updatePlaceById(i+1, place.wins, place.draws, place.losses, place.id_player);
        }
        return leaderboard.rows;
    }

    async updatePlaceById(place, wins, draws, losses, pseudo) {
        console.log(`updating place # ${place}`);
        //check if the user exists
        if (await this.existsPlaceById(place)) {
            const row = await db('ttt_leaderboard').where({id_place_ttt: place}).update({
                wins: wins,
                draws: draws,
                losses: losses,
                id_player : pseudo});
            return {success:true};
        }else return {success:false, error :"Place with this ID does not exist in the leaderboard"};
    }

    async updatePlaceByPseudo(oldPseudo, newPseudo, wins, draws, losses) {
        console.log(`updating place of user ${oldPseudo}`);
        //check if the user exists
        if (await this.existsPlaceByPseudo(oldPseudo) || oldPseudo === newPseudo) {
            if(!await this.existsPlaceByPseudo(newPseudo) || oldPseudo === newPseudo) {
                const row = await db('ttt_leaderboard').where({id_player: oldPseudo}).update({
                    wins: wins,
                    draws: draws,
                    losses: losses,
                    id_player: newPseudo
                }).returning('*');
                return {success:true, row:row};
            }
            else
                return {success:false, error :"User with this the new pseudo already exists in the leaderboard"};
        }else return {success:false, error :"User with this the old pseudo does not exist in the leaderboard"};
    }

    async updatePlaceByPseudoIncrement(pseudo, gameResult){
        let existsPlace = true
        if (!await this.existsPlaceByPseudo(pseudo)) {
            await this.createPlace(pseudo);
        }
        const place = await this.getPlaceByPseudo(pseudo);
        let wins = place.row.wins;
        let draws = place.row.draws;
        let losses = place.row.losses;
        if(gameResult === "WIN")
            wins++;
        if(gameResult === "DRAW")
            draws++;
        if(gameResult === "LOSS")
            losses++;
        return await this.updatePlaceByPseudo(pseudo, pseudo, wins, draws, losses);
    }

    async deletePlaceByPseudo(pseudo) {
        // check if the user exists
        if (await this.existsPlaceByPseudo(pseudo)) {
            // delete the place
            const [place] = await db('ttt_leaderboard').where({id_player: pseudo}).del('id_place_ttt');
            const last = await this.getLastPlace()
            console.log(place.id_place_ttt, last);
            let placeUpdate, placeNumber;
            // move every other place id up by 1 (decrementing)
            for(let i = place.id_place_ttt; i < last; i++){
                console.log(`place:${i}`);
                [placeNumber] = await db('ttt_leaderboard').where({id_place_ttt:i+1}).returning('id_place_ttt')
                console.log(placeNumber.id_place_ttt);
                placeUpdate = await db('ttt_leaderboard').where({id_place_ttt:i+1}).update({id_place_ttt:placeNumber.id_place_ttt-1})
            }
            return {success:true};
        }else return {success:false, error :"User with this pseudo does not exist in the leaderboard"};
    }
}

export const tttLeaderBoardDAO = new tttLeaderboardDAOClass();