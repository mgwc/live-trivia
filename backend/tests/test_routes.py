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
    response_two = client.get('/questions/2')
    response_two_json = response_two.get_json()
    assert response_json[0][1] != response_two_json[1][1]


def test_get_single_question(client):
    response = client.get('/questions/question/9')
    response_json = response.get_json()
    assert response_json[1] == "In what game might you collect a hand containing a Pong?"


def test_add_question(client):
    question_text = "Who was Time magazine's unusual choice for Person of the Year in 2006?"
    answer_text = "You"
    category = "Pop Culture"
    difficulty = "Hard"
    added_row_response = client.post('/questions/add', json={'question_text': question_text, 'answer_text': answer_text,
                                                             'category': category, 'difficulty': difficulty})
    assert added_row_response.get_json()[1] == "Who was Time magazine's unusual choice for Person of the Year in 2006?"


def test_add_duplicate_question(client):
    


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
    assert new_response_json[0] == 3
    assert new_response_json[1] == "Which of the earth's poles is home to polar bears?"
    assert new_response_json[2] == "The North Pole"
    assert new_response_json[3] is None
    assert new_response_json[4] == "Biology"
    assert new_response_json[5] == "Easy"


def test_delete_question(client):
    question_text = "This is a question to be deleted"
    answer_text = "Answer"
    category = "Pop Culture"
    difficulty = "Hard"
    added_row_response = client.post('/questions/add', json={'question_text': question_text, 'answer_text': answer_text,
                                                             'category': category, 'difficulty': difficulty})
    qid = int(added_row_response.get_json()[0])
    print("qid = " + str(qid))
    q_for_deletion_response = client.get('/questions/question/{}'.format(qid))
    print(q_for_deletion_response.get_json())
    assert q_for_deletion_response.get_json()[1] == "This is a question to be deleted"
    client.get('/questions/delete/{}'.format(qid))
    get_deleted_q_response = client.get('/questions/question/'.format(qid))
    print(get_deleted_q_response)
    assert get_deleted_q_response.status_code == 404


def test_hello_world(client):
    response = client.get('/hello-world')
    response_data = response.get_data().decode("utf-8")
    print(response_data)
    assert response_data == 'Hello, World'
