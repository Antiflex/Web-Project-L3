const express = require('express');
const app = express();

// routes

app.get("/", (req, res) => {
    console.log("Here");
    res.status(500);
    res.send("<h1>Hi</h1>");
    res.render("./static/index.html")
});

app.all("*",(req, res) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
});
app.listen(3000,()=>{});
