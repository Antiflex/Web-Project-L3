const express = require('express');
const app = express();

// routes

app.get("/", (req, res) => {
    console.log("Here");
    res.status(500);
    res.send("hi");
});

app.get(["/index", "/static/index/index.html"],(req, res) => {
    res.status(500).sendFile("static/index/index.html",{ root: "./" });
});

app.all("*",(req, res) => {
    res.status(404).send('<h1>Error 404 : Page not found</h1>');
});
app.listen(3000,()=>{});
