/* Create data for temporary database file to be used in testing */

INSERT INTO question (id, question_text, answer_text, category, difficulty) -- Note: Leaving out image_location --
VALUES
    (1, 'Which state is known as The Keystone State?', 'Pennsylvania', 'Social Science', 'Easy'),
    (5, 'Which actor portrayed Iron Man in the eponymous 2008 film?', 'Robert Downey Jr.', 'Pop Culture', 'Easy'),
    (2, 'Name the Spanish word for each of the following colors', NULL, 'Language', 'Easy');

INSERT INTO sub_question (parent_question_id, id, question_text, answer_text, image_location)
VALUES
    (2, 1, "Yellow", "Amarillo", "www/yellow.jpg"),
    (2, 2, "Pink", "Rosado", "www/pink.jpg"),
    (2, 3, "White", "Blanco", NULL);
