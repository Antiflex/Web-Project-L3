import db from '../database/database.js';

class gameSessionDAOClass {
    async getGameSessionsByPseudo(pseudo, filters){
        const result = await db("game_session").where(filters)
            .andWhere(function(){
                this.where({id_player_1:pseudo}).orWhere({id_player_2:pseudo})
        });
        return result;
    };

    async getGameSessionsByTwoPseudos(pseudo1, pseudo2, filters){
        const result = await db("game_session").where(filters)
            .andWhere(function(){
                this.where({id_player_1:pseudo1}).andWhere({id_player_2:pseudo2})
                    .orWhere(function(){
                        this.where({id_player_1:pseudo2}).andWhere({id_player_2:pseudo1})})
            });
        return result;
    };

    async createGameSession(gameType, gameResult, gameDate, pseudo1, pseudo2){
        const result = await db.raw(`insert into Game_session
            (game_type, game_result, game_date, id_player_1, id_player_2) VALUES
            ('${gameType}', '${gameResult}', TO_TIMESTAMP('${gameDate}', 'YYYY-MM-DD HH24:MI'), '${pseudo1}', '${pseudo2}')`);

        return {success:"true"};
    }
}

export const gameSessionDAO = new gameSessionDAOClass();