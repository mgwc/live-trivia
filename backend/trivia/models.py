from trivia import db


class User(db.Model):   # Note: db.Model is a base class for all Flask-SQLAlchemy models
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(2048), unique=True, nullable=False)
    answer_text = db.Column(db.String(256))
    image_location = db.Column(db.String(256))
    category = db.column(db.String(64), nullable=False)
    difficulty = db.column(db.String(32), nullable=False)

    def __repr__(self):
        return '<Question {}'.format(self.question_text)


class SubQuestion(db.Model):
    parent_question_id = db.Column(db.Integer, )


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