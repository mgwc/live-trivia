import functools

from flask import (
    Blueprint, jsonify, json
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


