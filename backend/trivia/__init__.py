import os
import time

from flask import Flask, request
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


db = SQLAlchemy()
migrate = Migrate()


# application factory
def create_app(config_class=None):

    # create the Flask instance, using configuration object defined in config module
    app = Flask('trivia')
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

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

    return app
