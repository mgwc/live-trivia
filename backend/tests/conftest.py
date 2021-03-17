import os
import tempfile

import pytest
from trivia import create_app
from trivia.db import get_db, init_db

with open(os.path.join(os.path.dirname(__file__), 'data.sql'), 'rb') as f:      # __file__ is pathname of file from which module was loaded
    _data_sql = f.read().decode('utf8')


@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()     # creates & opens a temporary file, returning file object and path to it

    # create an application object for the purpose of testing
    app = create_app({
        'TESTING': True,        # allows exceptions to propagate to test client
        'DATABASE': db_path,        # set application object's database path to path of temporary file created above
    })

    with app.app_context():
        init_db()       # create a db file at the location specified in the app object's 'DATABASE' attribute by executing DDL in schema.sql
        get_db().executescript(_data_sql)   # fill db file with data using insert statements in data.sql

    yield app

    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    question_text = "Which of the earths poles is home to penguins?"
    answer_text = "The south pole"

    return app.test_client()        # create a test client for app


@pytest.fixture
def runner(app):
    return app.test_cli_runner()        # create a CLI runner that can call the Click commands registered with the app
