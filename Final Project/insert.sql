DROP TABLE IF EXISTS stats;

CREATE TABLE stats (
    c_user TEXT PRIMARY KEY,
    c_pass TEXT NOT NULL,
    c_hangman INTEGER, 
    c_tictactoe INTEGER
);
