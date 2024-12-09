DROP TABLE IF EXISTS votes;

CREATE TABLE votes (
    v_upvotes INTEGER,
    v_downvotes INTEGER
);

INSERT INTO votes 
(v_upvotes, v_downvotes)
VALUES
(0,0);