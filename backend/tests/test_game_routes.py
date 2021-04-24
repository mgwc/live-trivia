

def test_get_all_games(client):
    response = client.get('/games/')
    response_json = response.get_json()
    print(str(response_json))
    print("response_json type = " + str(type(response_json)))
    assert 0 < len(response_json) <= 10


def test_get_page_of_games(client):
    response = client.get('/games/')
    response_json = response.get_json()
    response_two = client.get('/games/2')
    response_two_json = response_two.get_json()
    assert response_json[0]['id'] != response_two_json[0]['id']


def test_get_game_questions(client):
    response = client.get('/games/game/3')
    response_json = response.get_json()
    assert response_json[0]['question_text'] == "Which state is known as The Keystone State?"


def test_add_game(client):
    game_name = "Mike's 4/13/21 game"
    owner_id = 1

    added_row_response = client.post('/games/add', json={'gameName': game_name, 'ownerId': owner_id})
    print("added_row_response = " + str(added_row_response.get_json()))

    assert added_row_response.get_json()['name'] == "Mike's 4/13/21 game"


def test_delete_game(client):
    game_id = 12

    delete_response = client.delete("/games/delete/{}".format(game_id))
    print(delete_response)
    assert delete_response.data.decode('utf-8') == "Success"


def test_add_game_question(client):
    game_id = 3
    question_id = 14

    added_row_response = client.post('/games/add-question', json={'gameId': 3, 'questionId': 14})
    print("added_row_response = " + str(added_row_response.get_json()))

    game_questions_response = client.get('/games/game/3')
    game_questions_response_json = game_questions_response.get_json()
    print("game_questions_response_json = " + str(game_questions_response_json))

    contains_new_question = [game['question_id'] == 14 for game in game_questions_response_json]
    print("contains_new_question: " + str(contains_new_question))

    assert contains_new_question.__contains__(True)


def test_delete_game_question(client):
    game_id = 3
    question_id = 1

    response = client.delete('/games/delete/3/1')
    assert response.data.decode('utf-8') == 'Success'
    assert response.status_code == 200

    game_questions_response = client.get('/games/game/3')
    game_questions_response_json = game_questions_response.get_json()
    print("game_questions_response_json = " + str(game_questions_response_json))

    contains_deleted_question = [game['question_id'] == 1 for game in game_questions_response_json]
    print("contains_deleted_question: " + str(contains_deleted_question))

    assert not contains_deleted_question.__contains__(True)


def test_update_game_question(client):
    game_id = 3
    qid = 10
    new_round = 1
    new_idx = 5

    response = client.put('/games/order/{}/{}'.format(game_id, qid), json={'round': new_round, 'idx': new_idx})
    response_json = response.get_json()

    assert response_json['round'] == 1 and response_json['idx'] == 5

