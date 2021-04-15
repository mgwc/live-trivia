import sqlite3
import sys
from flask import (
    Blueprint, jsonify, json, request, current_app
)

from trivia.db import get_db

bp = Blueprint('games', __name__, url_prefix='/games')  # (name, where blueprint is defined, url prefix)


# Route for viewing games with optional page number
@bp.route('/', methods=['GET'])
@bp.route('/<int:page>', methods=['GET'])
def all_games(page=1):
    current_app.logger.info("Received request to /games/<int:page>")
    current_app.logger.info("page = " + str(page))
    db = get_db()
    current_app.logger.info("db = " + str(db))
    cur = db.cursor()
    num_skipped_results = (page - 1) * 10
    rows = cur.execute('''
        SELECT id, name, owner_id
        FROM game
        WHERE id NOT IN (SELECT id 
                 FROM game
                 ORDER BY id ASC
                 LIMIT {})
        ORDER BY id ASC
        LIMIT 10
        '''.format(num_skipped_results)).fetchall()
    current_app.logger.info("num rows selected from db = " + str(len(rows)))
    return jsonify([dict(row) for row in rows])


# Get all questions saved to specified game
@bp.route('/game/<int:game_id>', methods=['GET'])
def game_questions(game_id=1):
    current_app.logger.info("Received request to /games/game/<int:game_id>")
    current_app.logger.info("game = " + str(game_id))

    db = get_db()
    cur = db.cursor()
    try:
        rows = cur.execute('''
            SELECT game_id, question_id, idx, round, question_text, answer_text, image_location, category, difficulty
            FROM game_question JOIN question ON game_question.question_id = question.id
            WHERE game_id = ?
            ORDER BY id ASC
        ''', (str(game_id)),).fetchall()
    except sqlite3.Error as e:
        # handle error
        type, value, traceback = sys.exc_info()
        current_app.logger.info("Caught exception at cur.execute in add_question: {}, {}, {}".format(type, value, traceback))
        pass
    current_app.logger.info("num rows selected from db = " + str(len(rows)))

    return jsonify([dict(row) for row in rows])


# Add a new game
@bp.route('/add', methods=['POST'])
def add_game():
    current_app.logger.info("Received request to /add")
    current_app.logger.info("Request json = " + str(request.json))

    game_name = request.json.get('name')
    owner_id = 1    # TODO: Get owner_id from session?

    db = get_db()
    cur = db.cursor()
    try:
        cur.execute('''
            INSERT INTO game
            VALUES(?, ?, ?)
        ''', (None, game_name, owner_id))
        db.commit()
    except sqlite3.Error as e:
        # handle error
        type, value, traceback = sys.exc_info()
        current_app.logger.error("Caught exception at cur.execute in add_game: {}, {}, {}".format(type, value, traceback))
        pass

    current_app.logger.info('Committed new row to db')
    new_row = cur.execute('''
        SELECT id, name, owner_id
        FROM game
        WHERE id = ?
    ''', (cur.lastrowid,)).fetchone()
    current_app.logger.info("new row = " + str(dict(new_row)))

    # return new row data
    return jsonify(dict(new_row))


# Delete a game
@bp.route('/delete/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    current_app.logger.info("Received request to /delete-game")
    db = get_db()
    cur = db.cursor()
    try:
        cur.execute('''
                        DELETE from game 
                        WHERE id == ?
                        ''', (game_id,))
        db.commit()
    except sqlite3.Error as e:
        # handle error
        type, value, traceback = sys.exc_info()
        current_app.logger.error(
            "Caught exception at cur.execute in add_question: {}, {}, {}".format(type, value, traceback))
        return 'Database operation failed', 500
    return "Success"


# Add an existing question to a game
@bp.route('/add-question', methods=['POST'])
def add_game_question():
    current_app.logger.info("Received request to /add-question")
    current_app.logger.info("Request json = " + str(request.json))

    game_id = request.json.get('gameId')
    question_id = request.json.get('questionId')

    db = get_db()
    cur = db.cursor()
    try:
        cur.execute('''
            INSERT INTO game_question
            VALUES(?, ?, ?, ?)
        ''', (game_id, question_id, None, None))
        db.commit()
    except sqlite3.Error as e:
        # handle error
        type, value, traceback = sys.exc_info()
        current_app.logger.error("Caught exception at cur.execute in add_game_question: {}, {}, {}".format(type, value, traceback))
        pass

    current_app.logger.info('Committed new row to db')
    new_row = cur.execute('''
        SELECT game_id, question_id, idx, round
        FROM game_question
        WHERE game_id = ? AND question_id = ?
    ''', (game_id, question_id)).fetchone()
    current_app.logger.info("new row = " + str(dict(new_row)))

    # return new row data
    return jsonify(dict(new_row))


# Route for deleting individual question
@bp.route('/delete/<int:game_id>/<int:qid>', methods=['DELETE'])
def delete_game_question(game_id, qid):
    db = get_db()
    cur = db.cursor()
    try:
        cur.execute('''
                    DELETE from game_question 
                    WHERE game_id == ? AND question_id == ? 
                    ''', (game_id, qid))
        db.commit()
    except sqlite3.Error as e:
        # handle error
        type, value, traceback = sys.exc_info()
        current_app.logger.error("Caught exception at cur.execute in delete_game_question: {}, {}, {}".format(type, value, traceback))
        return 'Database operation failed', 500

    return "Success"


# Route for setting a game question's round number and index in the round
@bp.route('/order/<int:game_id>/<int:qid>', methods=['PUT'])
def set_game_question_order(game_id, qid):
    game_id = str(game_id)
    qid = str(qid)
    round = str(request.json.get('round'))
    idx = str(request.json.get('idx'))

    current_app.logger.info("Game " + str(game_id) + ", question " + str(qid) + " new round = " + round + ", new idx = " + idx)

    db = get_db()
    cur = db.cursor()
    try:
        cur.execute('''
                UPDATE game_question 
                SET round = ?, 
                    idx = ?
                WHERE game_id == ? AND question_id == ?
                ''', (round, idx, game_id, qid))
        db.commit()
    except sqlite3.Error as e:
        type, value, traceback = sys.exc_info()
        current_app.logger.error(
            "Caught exception at cur.execute in set_game_question_order: {}, {}, {}".format(type, value, traceback))
        return 'Database operation failed', 500

    updated_row = cur.execute('''
                SELECT game_id, question_id, idx, round
                FROM game_question
                WHERE game_id == ? AND question_id == ?
                ''', (game_id, qid)).fetchone()

    return jsonify(dict(updated_row))
