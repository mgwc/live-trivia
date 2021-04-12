import sqlite3
import sys
from flask import (
    Blueprint, jsonify, json, request, current_app
)
from trivia.db import get_db
from trivia import flask_bcrypt
import trivia.auth.session_mgmt as session_mgmt

bp = Blueprint('auth', __name__, url_prefix='/auth')  # (name, where blueprint is defined, url prefix)


# Verify login information
@bp.route('/login', methods=['POST'])
def login():
    current_app.logger.info("Received request to /login")

    username = request.json.get('username')
    password = request.json.get('password')

    db = get_db()
    cur = db.cursor()

    rows = cur.execute('''
        SELECT id, username, password, session
        FROM host
        WHERE username = ?
        ''', username).fetchone()
    current_app.logger.info("# of matching usernames found in db = " + str(len(rows)))

    session = rows[0]['session']

    if len(rows) > 0:
        if flask_bcrypt.check_password_hash(rows[0]['password'], password):
            '''
            we've found a matching (username, password)
            1. if this 'host' has a session, update it with the current time; else, create a new session and add it to the host record
            2. return a response with the session id in a cookie
            '''
            session_id = session_mgmt.create_or_update_session(db, username, session)
            pass
        else:
            '''
            we've found a matching username, but not a matching password
            return an error response
            '''
            pass
    else:
        '''
        there is no matching username
        return an error response
        '''
        pass

    return jsonify([dict(row) for row in rows])