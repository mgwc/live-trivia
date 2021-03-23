import logging
import os
import sys
import time
from logging import StreamHandler
from logging.handlers import RotatingFileHandler

from flask import Flask


# application factory
def create_app(test_config=None):

    # create the Flask instance;
    # instance_relative_config=True tells the app that configuration files are relative to the instance folder
    app = Flask('trivia', instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',   # TODO: override with a random value when deploying
        DATABASE=os.path.join(app.instance_path, 'trivia.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing; this can be used to set a real SECRET_KEY
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Configure logging
    if not app.debug:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/trivia.log', maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        stream_handler = StreamHandler(sys.stdout)
        stream_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        stream_handler.setLevel(logging.INFO)
        app.logger.addHandler(stream_handler)

        app.logger.setLevel(logging.INFO)
        #app.logger.info('Trivia startup')

    @app.route('/hello-world')
    def hello_world():
        return 'Hello, World'

    # Route for testing connection between React frontend and api
    @app.route('/time')
    def get_current_time():
        return {'time': time.time()}

    from . import db
    db.init_app(app)

    # Register blueprints with app
    from trivia.blueprints import questions
    app.register_blueprint(questions.bp)

    # Register error handlers with app


    return app
