import sqlite3

import pytest
from trivia.db import get_db

# Note, these tests taken from Flask tutorial/documentation


def test_get_close_db(app):     # passing app fixture from conftest.py as argument
    with app.app_context():
        db = get_db()
        assert db is get_db()       # test that app context yields same db connection each time get_db() is called

    with pytest.raises(sqlite3.ProgrammingError) as e:      # assert that code block raises exception
        db.execute('SELECT 1')

    assert 'closed' in str(e.value)     # assert that connection has closed now that app context has ended


def test_init_db_command(runner, monkeypatch):      # monkeypatch is pytest fixture
    class Recorder(object):
        called = False

    def fake_init_db():
        Recorder.called = True

    monkeypatch.setattr('trivia.db.init_db', fake_init_db)
    result = runner.invoke(args=['init-db'])        # uses runner fixture from conftest.py
    assert 'Initialized' in result.output       # (asserts that CLI runner called trivia.db.init_db using init-db command, returning 'Initialized'
    assert Recorder.called


def test_temp_db_question_table(app):
    with app.app_context():
        db = get_db()
        cur = db.cursor()
        query = '''
            SELECT *
            FROM question
            WHERE category = 'Pop Culture'
        '''
        cur.execute(query)
        r = cur.fetchall()
        assert len(r) == 1
        assert r[0]['id'] == 5


def test_temp_db_join_question_subquestion(app):
    with app.app_context():
        db = get_db()
        cur = db.cursor()
        query = '''
            SELECT question.id AS parent_id, sub_question.id AS child_id, sub_question.question_text AS sub_question_text 
            FROM question JOIN sub_question ON question.id = sub_question.parent_question_id
        '''
        cur.execute(query)
        r = cur.fetchone()
        # print(*r.keys())
        assert r['parent_id'] == 2
        assert r['sub_question_text'] == 'Yellow'
