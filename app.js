const express = require("express");
const fortunes = require("./data/fortune");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
// 

app.use(bodyParser.json());

app.get("/fortunes", (req, res) => {
    res.json(fortunes);
});

app.get("/fortunes/random", (req, res) => {
    const random_index = Math.floor(Math.random() * fortunes.length);

    const r_fortune = fortunes[random_index];
    res.json(r_fortune);
});

app.get("/fortunes/:id", (req, res) => {
    const {
        id
    } = req.params;
    res.json(fortunes.find((f) => f.id == id));
});

app.post("/fortunes", (req, res) => {
    console.log(req.body);

    const {
        message,
        lucky_number,
        spirit_animal
    } = req.body;

    const fortune_ids = fortunes.map((f) => f.id);

    const fortune = {
        id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
        message,
        lucky_number,
        spirit_animal,
    };

    const new_fortuens = fortunes.concat(fortune);

    fs.writeFile("./data/fortune.json", JSON.stringify(new_fortuens), (err) =>
        console.log(err)
    );

    res.json(new_fortuens);
});

app.put("/fortunes/:id", (req, res) => {
    const {
        id
    } = req.params;

    const {
        message,
        lucky_number,
        spirit_animal
    } = req.body;

    const old_fortune = fortunes.find((f) => f.id == id);

    old_fortune.message = message;
    old_fortune.lucky_number = lucky_number;
    old_fortune.spirit_animal = spirit_animal;

    fs.writeFile("./data/fortune.json", JSON.stringify(fortunes), (err) =>
        console.log(err)
    );

    res.json(fortunes);
});

app.delete('/fortunes/:id', (req, res) => {
    const {
        id
    } = req.params

    const new_fortunes = fortunes.filter(f => f.id != id)

    fs.writeFile("./data/fortune.json", JSON.stringify(new_fortunes), (err) =>
        console.log(err)
    );

    res.json(new_fortunes);

})
module.exports = app;