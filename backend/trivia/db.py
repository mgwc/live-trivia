import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

########################
# Placeholder DB class from Flask tutorial
########################


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(                                 # g is a special object that stores data associated with a unique request
            current_app.config['DATABASE'],                     # current_app is another special object that points to the Flask app handling the request
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

        return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()