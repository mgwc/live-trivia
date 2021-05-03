import sqlite3
import sys
import json as pyjson
from flask import (
    Blueprint, jsonify, request, current_app
)
from .. import socketio
from flask_socketio import send, emit, join_room, leave_room
from trivia.db import get_db

bp = Blueprint('live-game', __name__, url_prefix='/live')  # (name, where blueprint is defined, url prefix)


@socketio.on('connect')
def handle_connect():
    print("Received connection event")


@socketio.on('question')
def handle_question(json):
    print("Received question " + str(json))
    print("json[gameId] = " + json['gameId'])
    print("json[question] = " + json['question']['question_text'])
    emit('question', {'question': json['question']['question_text']}, broadcast=True)


@socketio.on('connection event')
def handle_connection_event(json):
    print("Received handle_connection_event")
    # current_app.logger.info("Received connection event with message: {}", str(json))


@socketio.on('answer')
def handle_answer(json):
    print("Received answer = {}, name = {}".format(json['answer'], json['name']))
    emit('answer', json, broadcast=True)


@socketio.on('reveal_answer')
def handle_reveal_answer(json):
    print("Received reveal_answer event; question = {}, answer = {}".format(json['question']['question_text'],
          json['question']['answer_text']))
    emit('reveal_answer', {"question": json['question']['question_text'], "answer": json['question']['answer_text']},
         broadcast=True)


@socketio.on('json')
def handle_json(json):
    print("Received json event")
    # current_app.logger.info("Received json {}", str(json))

