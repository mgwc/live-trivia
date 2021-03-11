import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))    # main directory of the app
load_dotenv(os.path.join(basedir, '.env'))


class Config():
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key-not-set'   # this config var gets used as a cryptographic key by some extensions, like Flask-WTF
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'trivia.db')   # get db location from DATABASE_URL env var, or configure db in main dir of app
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # no need to signal to app every time a change is being made to db

