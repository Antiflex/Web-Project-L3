import {formattedDate, killTimeIntervals} from "./commons.js";

const app = Vue.createApp({
    el: '#app',
    data() {
        const Data = JSON.parse(document.getElementById('data').textContent);
        document.getElementById('data').innerHTML='';
        return {
            timer:30000,
            data: Data,
            gameResult:null,
            message:'',
            gameStarted: false,
            gameMatrix:[
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            imageMatrix: [
                ['img/moles/hole.png', 'img/moles/hole.png', 'img/moles/hole.png'],
                ['img/moles/hole.png', 'img/moles/hole.png', 'img/moles/hole.png'],
                ['img/moles/hole.png', 'img/moles/hole.png', 'img/moles/hole.png']
            ],
        };
    },
    methods:{
        start,
        updateCell,
        formatTimer
    }
})

const mountedApp = app.mount('#app');
function start(){
    let timeIntervals = [];
    if(!this.gameStarted) {
        this.timer = 30000;
        this.gameResult = null;
        this.message = '';
        this.gameStarted = true;
        this.gameMatrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.imageMatrix = [
            ['img/moles/hole.png', 'img/moles/hole.png', 'img/moles/hole.png'],
            ['img/moles/hole.png', 'img/moles/hole.png', 'img/moles/hole.png'],
            ['img/moles/hole.png', 'img/moles/hole.png', 'img/moles/hole.png']
        ];
        let interval;
        if (this.difficulty === "Easy")
            interval = 2800;
        else if (this.difficulty === "Medium")
            interval = 1800;
        else
            interval = 800;

        timeIntervals.push(setInterval(() => {
            if (this.gameStarted) {
                if (this.timer > 0)
                    this.timer -= 10;
                else {
                    // win
                    this.gameStarted = false;
                    this.gameResult = 'WIN';
                    this.message= 'You won ! :)'
                    updateRecords(this.data.pseudo, this.gameResult, this.data.difficulty).then(r => console.log(r));
                    killTimeIntervals(timeIntervals);
                }
            }
        }, 10))

        timeIntervals.push(setInterval(() => {
            if (this.gameStarted) {
                const [x, y] = randomMole(this.gameMatrix)
                this.gameMatrix[x][y] = 1;
                this.imageMatrix[x][y] = 'img/moles/mole.png';
                timeIntervals.push(setTimeout(() => {
                    if (this.gameMatrix[x][y] === 1) {
                        this.gameStarted = false;
                        this.gameResult = 'LOSS';
                        this.message = 'You lost :(';
                        updateRecords(this.data.pseudo, this.gameResult, this.data.difficulty).then(r => console.log(r));
                        killTimeIntervals(timeIntervals);
                    } else
                        this.gameMatrix[x][y] = 0;
                }, interval))

            }
        }, interval))
    }
}

function randomMole(mat){
    // get places where a mole can appear
    let places = []
    for(let i=0; i<mat.length; i++){
        for(let j=0; j<mat[0].length; j++){
            if(mat[i][j]===0)
                places.push([i,j])
        }
    }
    // return a random place
    return places[Math.floor(places.length * Math.random())];
}

function updateCell(line, col){
    if (this.gameStarted) {
        if (this.gameMatrix[line][col] === 1) {
            this.gameMatrix[line][col] = -1;
            this.imageMatrix[line][col] = '/img/moles/hole.png';
        }
    }
}

function formatTimer(timer){ // takes a number and returns its 5 digits string version
    timer = Math.floor(timer);
    let timerString = '';
    const l = timer.toString().length
    if(l > 5)
        return  timer.toString().slice(l-5,l)

    timerString =  '0'.repeat(5-l)+timer.toString()
    return timerString

}

async function updateRecords(pseudo, gameResult, difficulty) {
    const formattedToday = formattedDate()

    let body = JSON.stringify({
        gameType: "WAM",
        gameResult: gameResult,
        gameDate: formattedToday,
        pseudo1: pseudo,
        pseudo2: difficulty + '_AI'
    })

    console.log(body)
    let response = await fetch('http://localhost:3000/game_session/create_game_session', {
        method: 'POST',
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    console.log(response);
    response = await fetch("http://localhost:3000/wam_leaderboard/update_place_by_pseudo_increment", {
        method: 'POST',
        body: JSON.stringify({
            pseudo: pseudo,
            gameResult: gameResult
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    console.log(response);

    response = await fetch("http://localhost:3000/wam_leaderboard/update_leaderboard");
    console.log(response)
}