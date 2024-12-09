DROP TABLE IF EXISTS questies;

CREATE TABLE questies (
    q_id INTEGER PRIMARY KEY,
    q_char TEXT NOT NULL,
    q_name TEXT NOT NULL
);

INSERT INTO questies 
(q_id, q_char, q_name)
VALUES
(0, "Archibald", "Defeat Darth Vader"),
(1, "Henrik", "Eat 20k Apples"),
(2, "Isadore", "Win a Dance-Off"),
(3, "Lucinda", "Collect 13 Mangoes"),
(4, "Dominic", "Capture 28 Armadillos");