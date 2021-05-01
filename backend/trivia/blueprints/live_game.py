import sqlite3
import sys
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
    print("json[question] = " + json['question'])
    emit('question', {'question': json['question']}, broadcast=True)


@socketio.on('connection event')
def handle_connection_event(json):
    print("Received handle_connection_event")
    # current_app.logger.info("Received connection event with message: {}", str(json))


@socketio.on('message')
def handle_message(data):
    print("Received message event")
    #current_app.logger.info("Received message {}", str(data))


@socketio.on('answer')
def handle_answer(data):
    print("Received answer {}", data)
    print("Answer = {}, name = {}", data['answer'], data['name'])
    emit("answer_ack", "Received your answer")
    # current_app.logger.info("Received answer {}", data)


@socketio.on('json')
def handle_json(json):
    print("Received json event")
    # current_app.logger.info("Received json {}", str(json))

