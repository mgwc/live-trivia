from flask import Flask, json


def test_get_all_questions(client):
    response = client.get('/questions/')
    response_json = response.get_json()
    print(str(response_json))
    print("response_json type = " + str(type(response_json)))
    assert 0 < len(response_json) <= 10


def test_get_page_of_questions(client):
    response = client.get('/questions/')
    response_json = response.get_json()
    print("response_json = " + str(response_json))
    response_two = client.get('/questions/2')
    response_two_json = response_two.get_json()
    print("response_two_json = " + str(response_two_json))
    assert response_json[0][1] != response_two_json[1][1]


def test_get_single_question(client):
    response = client.get('/questions/question/9')
    response_json = response.get_json()
    print("response_json = " + str(response_json))
    assert response_json[1] == "In what game might you collect a hand containing a Pong?"


def test_edit_question(client):
    initial_response = client.get('/questions/question/3')
    initial_response_json = initial_response.get_json()
    assert initial_response_json[1] == "What are the colors of the rainbow?"
    question_text = "Which of the earth's poles is home to polar bears?"
    answer_text = "The North Pole"
    category = "Biology"
    difficulty = "Easy"
    new_response = client.put('/questions/edit/3', json={'question_text': question_text, 'answer_text': answer_text,
                                                         'category': category, 'difficulty': difficulty})
    new_response_json = new_response.get_json()
    assert (new_response_json[0] == 3 and new_response_json[1] == "Which of the earth's poles is home to polar bears?"
            and new_response_json[2] == "The North Pole" and new_response_json[3] == "Biology"
            and new_response_json[4] == "Easy")


def test_hello_world(client):
    response = client.get('/hello-world')
    response_data = response.get_data().decode("utf-8")
    print(response_data)
    assert response_data == 'Hello, World'
