-- Books Table
CREATE TABLE Books (
    BookID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    AuthorID INTEGER NOT NULL,
    GenreID INTEGER NOT NULL,
    Pages INTEGER,
    PublishedDate DATE,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);

-- Genres Table
CREATE TABLE Genres (
    GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT
);

-- Authors Table
CREATE TABLE Authors (
    AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL
);
