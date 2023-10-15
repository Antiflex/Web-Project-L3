export function getGameParams(req,res){
    req.body.game = req.query.game;
    const difficultyTab = ['Easy','Medium','Hard']
    req.body.difficultyString = difficultyTab[req.body.difficulty];
    console.log(req.body);
    return res.json(req.body);
}

export function sendGame(req,res) {
    const difficultyTab = ['Easy','Medium','Hard']
    if(req.query.game === "whack-a-mole")
        return res.redirect(`/whack-a-mole?difficulty=${difficultyTab[req.body.difficulty]}`);
    else
        return res.redirect(`/tic-tac-toe?difficulty=${difficultyTab[req.body.difficulty]}`);
}

export function playWAM(req,res){
    if(req.session.authenticated !== true)
        return res.redirect('/login?info=Must be logged in to play')
    else {
        let difficulty='Medium';
        if(['Easy', 'Medium', 'Hard'].includes(req.query.difficulty))
            difficulty = req.query.difficulty;
        return res.render("games/whack_a_mole", {
            query: {
                pseudo: req.session.pseudo,
                game: "whack-a-mole",
                difficultyString: difficulty
            }
        });
    }
}

export function playTTT(req,res){
    if(req.session.authenticated !== true)
        return res.redirect('/login?info=Must be logged in to play')
    else {
        let difficulty='Medium';
        if(['Easy', 'Medium', 'Hard'].includes(req.query.difficulty))
            difficulty = req.query.difficulty;
        return res.render("games/tic_tac_toe", {
            query: {
                pseudo: req.session.pseudo,
                game: "tic-tac-toe",
                difficultyString: difficulty
            }
        });
    }
}