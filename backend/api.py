import os

from flask import Flask, request
from blueprints import manage_questions


# application factory
def create_app(test_config=None):

    # create the Flask instance; __name__ is the name of the current Python module; instance_relative_config=True
    # tells the app that configuration files are relative to the instance folder
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',   # TODO: override with a random value when deploying
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

    @app.route('/')
    def hello_world():
        return 'Hello, World'


    return app
