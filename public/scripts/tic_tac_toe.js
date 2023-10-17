const app = Vue.createApp({
    el: '#app',
    data() {
        const Data = JSON.parse(document.getElementById('data').textContent);
        document.getElementById('data').innerHTML='';
        return {
            data: Data,
            message:'',
            gameStarted: false,
            updatable: false,
            gameMatrix:[
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            imageMatrix: [
                ['img/empty.png', 'img/empty.png', 'img/empty.png'],
                ['img/empty.png', 'img/empty.png', 'img/empty.png'],
                ['img/empty.png', 'img/empty.png', 'img/empty.png']
            ],
        };
    },
    methods:{
        start,
        updateCell
    }
})

function start(){
    this.message = '';
    this.gameStarted = true;
    this.updatable = true;
    this.gameMatrix=[
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    this.imageMatrix=[
        ['img/empty.png', 'img/empty.png', 'img/empty.png'],
        ['img/empty.png', 'img/empty.png', 'img/empty.png'],
        ['img/empty.png', 'img/empty.png', 'img/empty.png']
    ]
}

function updateCell(line, col) {
    console.log(this.gameStarted, line, col)
    if (this.gameStarted && this.updatable) {
        if (this.gameMatrix[line][col] === 0) {
            this.gameMatrix[line][col] = 1;
            this.imageMatrix[line][col] = '/img/X.png';
            this.updatable = false;

            setTimeout(async () => {
                let win = checkWin(this.gameMatrix)

                // AI plays here if the game isn't won yet
                if (win === 0) {
                    const move = aiMove(this.gameMatrix);
                    this.gameMatrix[move[0]][move[1]] = 2;
                    this.imageMatrix[move[0]][move[1]] = '/img/O.png'
                }

                // Check if the game should end

                win = checkWin(this.gameMatrix)
                if (win !== 0) {
                    this.gameStarted = false;
                    this.updatable = false;
                    let result;
                    if (win === 1) {
                        this.message = "You won !! :)";
                        result = "WIN";
                    } else if (win === -1) {
                        this.message = "You lost :(";
                        result = "LOSS"
                    } else {
                        this.message = "It's a Draw !"
                        result = "DRAW"
                    }

                    // update database records

                    const today = new Date();
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1; // Months start at 0!
                    let dd = today.getDate();
                    let h24 = today.getHours();
                    let mi = today.getMinutes();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;
                    const formattedToday = yyyy + '-' + mm + '-' + dd + ' ' + h24 + ':' + mi;

                    console.log('h24:',h24,'mi:',mi);
                    console.log(formattedToday);
                    console.log("fetching");

                    let body = JSON.stringify({
                        gameType: "TTT",
                        gameResult: result,
                        gameDate: formattedToday,
                        pseudo1: this.data.pseudo,
                        pseudo2: this.data.difficulty + '_AI'
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
                    response = await fetch("http://localhost:3000/ttt_leaderboard/update_place_by_pseudo_increment",{
                        method: 'POST',
                        body: JSON.stringify({
                            pseudo: this.data.pseudo,
                            gameResult: result
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    console.log(response);

                    response = await fetch("http://localhost:3000/ttt_leaderboard/update_leaderboard");
                    console.log(response)
                } else
                    this.updatable = true;
            }, 500);
        }
    }
}

function aiMove(gameMatrix){
    // get the list of possible moves
    let moves = [];
    let l = 0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(gameMatrix[i][j]===0){
                moves[l] = [i,j]
                l++;
            }
        }
    }
    const i =  Math.floor(moves.length * Math.random());
    return  moves[i];
}

function checkWin(gameMatrix){
    console.log(transpose(gameMatrix))
    if(contains(gameMatrix,[1,1,1]) || contains(transpose(gameMatrix),[1,1,1]))
        return 1;
    if(contains(gameMatrix,[2,2,2]) || contains(transpose(gameMatrix),[2,2,2]))
        return -1;
    if(gameMatrix[1][1] === gameMatrix[2][2] && gameMatrix[1][1] === gameMatrix[0][0]) {
        if (gameMatrix[0][0] === 1)
            return 1;
        if (gameMatrix[0][0] === 2)
            return -1;
    }
    if(gameMatrix[1][1] === gameMatrix[0][2] && gameMatrix[1][1] === gameMatrix[2][0]) {
        if (gameMatrix[1][1] === 1)
            return 1;
        if (gameMatrix[1][1] === 2)
            return -1;
    }
    for(let i=0;i<3;i++) {
        if(gameMatrix[i].includes(0))
            return 0
    }
    return -2;
}

function transpose(mat){
    let transpose = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
        ];
    const x = mat.length;
    const y = mat[0].length;
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            transpose[j][i] = mat[i][j];
            transpose[i][j] = mat[j][i];
        }
    }
    console.log(transpose)
    return transpose;
}

function contains(mat,arr) {
    let result = false;
    for (let i = 0; i < mat.length; i++) {
        result = true;
        for (let j = 0; j < mat[0].length; j++) {
            if (mat[i][j] !== arr[j])
                result = false;
        }
        if (result)
            return true;
    }
    return result
}