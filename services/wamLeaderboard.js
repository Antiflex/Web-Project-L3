import {wamLeaderBoardDAO} from '../dao/wamLeaderboard.js';

class wamLeaderboardServiceClass{
    getLeaderboard(){
        return wamLeaderBoardDAO.getLeaderboard();
    }
    existsPlaceById(place){
        return wamLeaderBoardDAO.existsPlaceById(place);
    }

    existsPlaceByPseudo(pseudo){
        return wamLeaderBoardDAO.existsPlaceByPseudo(pseudo);
    }

    getPlaceById(place) {
        return wamLeaderBoardDAO.getPlaceById(place);
    }

    getPlaceByPseudo(pseudo) {
        return wamLeaderBoardDAO.getPlaceByPseudo(pseudo);
    }

    getLastPlace() {
        return wamLeaderBoardDAO.getLastPlace();
    }

    createPlace(pseudo) {
        return wamLeaderBoardDAO.createPlace(pseudo);
    }

    updateLeaderboard(){
        return wamLeaderBoardDAO.updateLeaderboard();
    }

    updatePlaceByPseudo(oldPseudo, newPseudo, wins, losses) {
        return wamLeaderBoardDAO.updatePlaceByPseudo(oldPseudo, newPseudo, wins, losses);
    }

    async deletePlaceByPseudo(pseudo) {
        return wamLeaderBoardDAO.deletePlaceByPseudo(pseudo);
    }
}

export const wamLeaderBoardService = new wamLeaderboardServiceClass();