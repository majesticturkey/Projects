const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite3');

app.get('/', (req, res, next) => {
    db.all('SELECT * FROM Artist WHERE is_currently_employed = 1', (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({artists: rows});
        }
    })
});

app.param('artistId', (req, res, next, artistId) => {
    db.get(`SELECT * FROM Artist WHERE id = ${artistId}`, (error, row) => {
        if (error) {
            next(error);
        } else {
            if (row) {
                req.artist = row;
                next();
            } else {
                res.sendStatus(404);
            }
        }
    });
});

app.get('/:artistId', (req, res, next) => {
    res.status(200).json({artist: req.artist});
});

app.post('/', (req, res, next) => {
    const name = req.body.artist.name;
    const dateOfBirth = req.body.artist.dateOfBirth;
    const biography = req.body.artist.biography;
    if (!name || !dateOfBirth || !biography) {
        res.sendStatus(400);
    }
    const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;
    db.run('INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)',
    {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed
    }, function(error) {
        if(error){
            next(error);
        }
        db.get(`SELECT * FROM Artist WHERE id = ${this.lastID}`, (error, artist) => {
            res.status(201).json({artist: artist});
        });
    });
});

app.put('/:artistId', (req, res, next) => {
    const name = req.body.artist.name;
    const dateOfBirth = req.body.artist.dateOfBirth;
    const biography = req.body.artist.biography;
    if (!name || !dateOfBirth || !biography) {
        res.sendStatus(400);
    }
    const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;

    const sql = 'UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, biography = $biography, is_currently_employed = $isCurrentlyEmployed WHERE Artist.id = $artistId';
    const values = {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed,
        $artistId: req.params.artistId
    };
    db.run(sql, values, (error) => {
        if (error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`, (error, artist) => {
                res.status(200).json({artist: artist});
            });
        }
    });
});

app.delete('/:artistId', (req, res, next) => {
    db.run(`UPDATE Artist SET is_currently_employed = 0 WHERE Artist.id = ${req.params.artistId}`, (error) => {
        if (error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Artist WHERE Artist.id = ${req.params.artistId}`, (error, artist) => {
                res.status(200).json({artist: artist});
            });
        }
    });
});

module.exports = app;