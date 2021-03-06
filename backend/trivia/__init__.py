import logging
import os
import sys
import time
from logging import StreamHandler
from logging.handlers import RotatingFileHandler
from flask_cors import CORS
from flask_socketio import SocketIO
from flask import Flask, request
from trivia.origins import socket_allowed_origins


socketio = SocketIO(cors_allowed_origins="*")


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

    print("App.debug = " + str(app.debug))

    # Configure logging
    if not app.debug:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/new.log', maxBytes=10240, backupCount=10)
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
    # app.logger.info('Trivia startup')

    @app.route('/hello-world')
    def hello_world():
        return 'Hello, World'

    # Route for testing connection between React frontend and api
    @app.route('/time')
    def get_current_time():
        return {'time': time.time()}

    @app.route('/shutdown', methods=['GET'])
    def shutdown():
        shutdown_server()
        return 'Server shutting down...'

    from . import db
    db.init_app(app)

    # Register blueprints with app
    from trivia.blueprints import questions, games, live_game
    app.register_blueprint(questions.bp)
    app.register_blueprint(games.bp)

    # TODO Register error handlers with app

    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    socketio.init_app(app)  #

    return app


def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    socketio.stop()
