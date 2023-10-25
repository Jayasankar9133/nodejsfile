const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const path = require('path');
const dbPath = path.join(__dirname, "database.db");


const app = express();
app.use(express.json())

let port = process.env.port || 3200;

let db = null;

let dbConnection = async () => {

    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })

        app.listen(port, () => {
            console.log("Server running")
        });
    } catch (e) {
        console.log(e.message);
        process.exit(1);

    }

}

dbConnection();


app.get('/person/', async (req, res) => {
    const query = `select * from person`;
    const arrayQuery = await db.all(query);
    res.send(arrayQuery);
});

app.post('/person/', async (req, res) => {
    let { name, age, gender, place } = req.body;
    const query = `INSERT INTO person
    values('${name}',${age},'${gender}','${place}');`;
    const arrayQuery = await db.run(query);
});