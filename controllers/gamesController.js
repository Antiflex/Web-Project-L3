export function getGameParams(req,res){
    req.body.game = req.query.game;
    const difficultyTab = ['Easy','Medium','Hard']
    req.body.difficultyString = difficultyTab[req.body.difficulty];
    console.log(req.body);
    return res.json(req.body);
}

export function sendGame(req,res) {
    req.body.game = req.query.game;
    const difficultyTab = ['Easy','Medium','Hard']
    req.body.difficultyString = difficultyTab[req.body.difficulty];
    if(req.query.game == "whack-a-mole")
        return res.render("whack_a_mole.ejs",{query : req.body});
    else
        return res.render("tic_tac_toe.ejs",{query : req.body});
}