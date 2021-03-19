import functools
import logging

from flask import (
    Blueprint, jsonify, json, request, current_app
)
from trivia.db import get_db

bp = Blueprint('questions', __name__, url_prefix='/questions')  # (name, where blueprint is defined, url prefix)


# Route for viewing database questions with optional page number
@bp.route('/', methods=['GET'])
@bp.route('/<int:page>', methods=['GET'])
def all_questions(page=1):
    print("page = " + str(page))
    db = get_db()
    cur = db.cursor()
    num_skipped_results = (page - 1) * 10
    rows = cur.execute('''
        SELECT id, question_text, answer_text, image_location, category, difficulty
        FROM question
        WHERE id NOT IN (SELECT id 
                 FROM question
                 ORDER BY id ASC
                 LIMIT {})
        ORDER BY id ASC
        LIMIT 10
        '''.format(num_skipped_results)).fetchall()
    return jsonify([tuple(row) for row in rows])


# Route for data on single question
@bp.route('/question/<int:qid>', methods=['GET'])
def get_single_question(qid):
    db = get_db()
    cur = db.cursor()
    row = cur.execute('''
            SELECT id, question_text, answer_text, image_location, category, difficulty
            FROM question
            WHERE id = {}
            '''.format(qid)).fetchone()
    return jsonify(tuple(row))


# Route for adding question to database
@bp.route('/add', methods=['POST'])
def add_question():
    question_text = request.json['question_text']
    answer_text = request.json.get('answer_text')
    image_location = request.json.get('image_location')
    category = request.json['category']
    difficulty = request.json['difficulty']

    db = get_db()
    cur = db.cursor()
    cur.execute('''
        INSERT INTO question
        VALUES(?, ?, ?, ?, ?, ?)
    ''', (None, question_text, answer_text, image_location, category, difficulty))
    db.commit()

    current_app.logger.info('Committed new row to db')
    new_row = cur.execute('''
        SELECT id, question_text
        FROM question
        WHERE id = ?
    ''', (cur.lastrowid,)).fetchone()
    current_app.logger.info(str(tuple(new_row)))

    return jsonify(tuple(new_row))


# Route for viewing individual question
@bp.route('/edit/<int:qid>', methods=['PUT'])
def edit_question(qid):
    question_text = request.json['question_text']
    current_app.logger.info("Question_text = " + question_text + ", type = " + str(type(question_text)))
    answer_text = request.json.get('answer_text')
    image_location = request.json.get('image_location')
    category = request.json['category']
    difficulty = request.json['difficulty']

    db = get_db()
    cur = db.cursor()
    cur.execute('''
            UPDATE question 
            SET question_text = ?, 
                answer_text = ?, 
                image_location = ?, 
                category = ?, 
                difficulty = ?
            WHERE id == ?
            ''', (question_text, answer_text, image_location, category, difficulty, qid))
    db.commit()

    new_row = cur.execute('''
                SELECT id, question_text, answer_text, image_location, category, difficulty
                FROM question
                WHERE id = ?
                ''', (qid,)).fetchone()

    return jsonify(tuple(new_row))

'''
    SELECT id, question_text, answer_text, image_location, category, difficulty
    FROM question
    WHERE id NOT IN (SELECT id 
                     FROM question
                     ORDER BY id ASC
                     LIMIT 20)
    ORDER BY id ASC
    LIMIT 20
'''


