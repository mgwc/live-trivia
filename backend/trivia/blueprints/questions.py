import functools

from flask import (
    Blueprint, jsonify, json, request
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


# Route for viewing individual question
@bp.route('/edit/<int:qid>', methods=['PUT'])
def edit_question(qid):
    question_text = request.form['question_text']
    answer_text = request.form['answer_text']
    image_location = request.form['image_location']
    category = request.form['category']
    difficulty = request.form['difficulty']

    db = get_db()
    cur = db.cursor()
    rows = cur.execute('''
            UPDATE question 
            SET question_text = {}, 
                answer_text = {}, 
                image_location = {}, 
                category = {}, 
                difficulty = {}
            WHERE id == {}
            ORDER BY id ASC
            LIMIT 10
            '''.format(question_text, answer_text, image_location, category, difficulty, qid))

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


