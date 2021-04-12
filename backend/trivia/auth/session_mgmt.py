from sqlite3 import DatabaseError

from flask import current_app
import datetime
import traceback


def create_or_update_session(db, username, session):

    cur = db.cursor()

    # create new session, add it to user's entry in host db
    if session is None:
        try:
            cur.execute('''
                INSERT INTO session
                VALUES (?, ?)
            ''', (None, datetime.datetime.now()))
        except DatabaseError as dbe:
            current_app.logger.error("Database error")
            current_app.logger.error(traceback.format_exc())
        except Exception as e:
            current_app.logger.error(traceback.format_exc())

        new_row = cur.execute('''
            SELECT id
            FROM session
            WHERE id = ?
        ''', (cur.lastrowid,)).fetchone()
        current_app.logger.info("new row = " + str(tuple(new_row)))
        return new_row[id]

    # update session time in session db and user's session
    else:
        curr_time = datetime.datetime.now()
        try:
            cur.execute('''
                    UPDATE session
                    SET time = ?
                    WHERE session = ?
                    ''', (curr_time, session))
        except DatabaseError as dbe:
            current_app.logger.error("Database error")
            current_app.logger.error(traceback.format_exc())
        except Exception as e:
            current_app.logger.error(traceback.format_exc())

        return session
