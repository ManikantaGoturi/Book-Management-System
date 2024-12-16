const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database/library.db');

// Get all books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM Books', [], (err, rows) => {
        if (err) res.status(500).send(err.message);
        else res.json(rows);
    });
});

// Add a new book
app.post('/books', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    db.run(
        `INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)`,
        [Title, AuthorID, GenreID, Pages, PublishedDate],
        function (err) {
            if (err) res.status(500).send(err.message);
            else res.json({ BookID: this.lastID });
        }
    );
});

// Update a book
app.put('/books/:id', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    const { id } = req.params;
    db.run(
        `UPDATE Books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?`,
        [Title, AuthorID, GenreID, Pages, PublishedDate, id],
        function (err) {
            if (err) res.status(500).send(err.message);
            else res.sendStatus(200);
        }
    );
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM Books WHERE BookID = ?`, [id], function (err) {
        if (err) res.status(500).send(err.message);
        else res.sendStatus(200);
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${3306}`));
