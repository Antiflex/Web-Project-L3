import {tttLeaderBoardDAO} from '../dao/tttLeaderboard.js';

class tttLeaderboardServiceClass{
    getLeaderboard(){
        return tttLeaderBoardDAO.getLeaderboard();
    }
    existsPlaceById(place){
        return tttLeaderBoardDAO.existsPlaceById(place);
    }

    existsPlaceByPseudo(pseudo){
        return tttLeaderBoardDAO.existsPlaceByPseudo(pseudo);
    }

    getPlaceById(place) {
        return tttLeaderBoardDAO.getPlaceById(place);
    }

    getPlaceByPseudo(pseudo) {
        return tttLeaderBoardDAO.getPlaceByPseudo(pseudo);
    }

    getLastPlace() {
        return tttLeaderBoardDAO.getLastPlace();
    }

    createPlace(pseudo) {
        return tttLeaderBoardDAO.createPlace(pseudo);
    }

    updateLeaderboard(){
        return tttLeaderBoardDAO.updateLeaderboard();
    }

    updatePlaceByPseudo(oldPseudo, newPseudo, wins, draws, losses) {
        return tttLeaderBoardDAO.updatePlaceByPseudo(oldPseudo, newPseudo, wins, draws, losses);
    }

    async deletePlaceByPseudo(pseudo) {
        return tttLeaderBoardDAO.deletePlaceByPseudo(pseudo);
    }
}

export const tttLeaderBoardService = new tttLeaderboardServiceClass();