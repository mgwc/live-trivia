import os
import time

from flask import Flask, request


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

    @app.route('/hello-world')
    def hello_world():
        return 'Hello, World'

    # Route for testing connection between React frontend and api
    @app.route('/time')
    def get_current_time():
        return {'time': time.time()}

    from . import db
    db.init_app(app)

    return app
