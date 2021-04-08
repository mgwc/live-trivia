import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

'''
Note: much of this follows the Flask documentation's tutorial code
'''


# this will be called in app factory to register the close_db and init_db_command functions with the application instance
def init_app(app):
    app.teardown_appcontext(close_db)       # instruct Flask to call close_db when cleaning up after returning response
    app.cli.add_command(init_db_command)


def get_db():
    if 'db' not in g:
        # Establish db connection for the request
        g.db = sqlite3.connect(     # g is a special object that stores data associated with a unique request
            current_app.config['DATABASE'],     # current_app is another special object that points to the Flask app handling the request
            detect_types=sqlite3.PARSE_DECLTYPES        # detect db data types using the declared types for each column
        )
        g.db.row_factory = sqlite3.Row      # db connection should return db rows in the form of dicts (column names are keys)

    return g.db


# Create database instance (sqlite file in instance folder)
def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:      # open_resource() opens a file relative to the trivia package
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')       # define a command line command called init-db that can be called with 'flask init-db'
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables"""
    init_db()
    click.echo('Initialized the database')


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
