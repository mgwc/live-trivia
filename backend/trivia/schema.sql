DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS sub_question;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS host;
DROP TABLE IF EXISTS game_question;

CREATE TABLE question (
    id INTEGER PRIMARY KEY,
    question_text TEXT NOT NULL,
    answer_text TEXT,
    image_location TEXT,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL
);

CREATE TABLE sub_question (
    parent_question_id INTEGER NOT NULL,
    id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    image_location TEXT,
    PRIMARY KEY (parent_question_id, id),
    FOREIGN KEY (parent_question_id) REFERENCES question (id)
);

CREATE TABLE game (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    owner_id NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES host (id)
);

CREATE TABLE host (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE game_question (
    game_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    PRIMARY KEY (game_id, question_id),
    FOREIGN KEY (game_id) REFERENCES game (id),
    FOREIGN KEY (question_id) REFERENCES question (id)
);