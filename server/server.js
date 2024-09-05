// import express from 'express'
// import sqlite3 from 'sqlite3';

const express = require('express'); //imports middleware
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');//needed since resources are on different ports


const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

const db = new sqlite3.Database('./tasks.db', (err) => { //establish DB
    if (err) {
        console.error('Could not connect to the database', err);
    } else {
        console.log('Connected to the SQLite database.');
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL
        )`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
//routes needed to save a task, update a task, delete a task, read all tasks

app.get('/allTasks', (req, res) => {
    // console.log('request for all tasks received')
    db.all(`Select * FROM tasks`, (err, rows)=>{
        if(err) {
            res.status(500).json({error:err.message})//return a JSON object with the error message for troubleshooting
        }
        res.json({tasks:rows}); //return a json object with the rows
    })
});


app.post('/saveTask', async(req, res)=>{
    const query = `INSERT INTO tasks (description) VALUES (?)`;//values (?) means we will pass a value later
    const {description} = req.body; //look for a value named description in the object, and set description variable to it
    console.log("request to save new task received")
    db.run(query, [description], function(err){
        if(err){
            res.status(500).json({error:err.message})
            return;
        }
        res.json({id:this.lastID, description})//this.lastID gotten from the query
    }) //need to treat description as an array
})

app.delete('/deleteTask/:description', async(req, res)=>{ //route parameter used for a single mandatory parameter
    //route: http://localhost:5000/deleteTask/123
    //query: http://localhost:5000/deleteTask?id=123
    const query = `DELETE FROM tasks WHERE description = ?`;
    const {description} = req.params; //route parameters use req.params, query params use req.query 
    if (!description) {
        console.log('No Description');
        return res.status(400).json({ error: 'Description is required.' });
    }
    // console.log(description)
    db.run(query, [description], function(err){
        if(err){
            console.error('Error executing delete', err.message)
            return res.status(500).json({error:err.message})
        }
        res.json({id:this.lastID, description})
    })
})
