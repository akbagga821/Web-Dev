DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
    c_id INTEGER PRIMARY KEY,
    c_name TEXT NOT NULL,
    c_wit INTEGER, 
    c_strength INTEGER, 
    c_attack INTEGER, 
    c_defense INTEGER,
    c_magic INTEGER,
    c_equipment TEXT NOT NULL,
    c_quests TEXT NOT NULL
);

INSERT INTO characters 
(c_id, c_name, c_wit, c_strength, c_attack, c_defense, c_magic, c_equipment, c_quests)
VALUES
(0, "Archibald", 0, 7, 2, 1, 0, '', '');


INSERT INTO characters 
(c_id, c_name, c_wit, c_strength, c_attack, c_defense, c_magic, c_equipment, c_quests)
VALUES
(1, "Henrik", 4, 3, 3, 1, 2, '', ''),
(2, "Isadore", 2, 6, 4, 0, 4, '', ''),
(3, "Lucinda", 4, 3, 1, 8, 1, '', ''),
(4, "Dominic", 5, 2, 3, 3, 2, '', '');