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


def test_hello_world(client):
    response = client.get('/hello-world')
    response_data = response.get_data().decode("utf-8")
    print(response_data)
    assert response_data == 'Hello, World'
