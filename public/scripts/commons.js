export function formattedDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let h24 = today.getHours();
    let mi = today.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return yyyy + '-' + mm + '-' + dd + ' ' + h24 + ':' + mi;
}

export function killTimeIntervals(timeIntervals){
    for(let i=0; i<timeIntervals.length; i++)
        clearInterval(timeIntervals[i]);
}


export function fetchLeaderboard(gameType){
    return fetch(gameType.toLowerCase()+'_leaderboard/get_leaderboard',{
        method:'GET',
    })
}