DROP TABLE IF EXISTS equips;

CREATE TABLE equips (
    e_id INTEGER PRIMARY KEY,
    e_name TEXT NOT NULL
);

INSERT INTO equips 
(e_id, e_name)
VALUES
(1, "Shield"),
(2, "Cloak"),
(3, "Sword"),
(4, "Orb");