/* Create data for temporary database file to be used in testing */

INSERT INTO question (id, question_text, answer_text, category, difficulty) -- Note: Leaving out image_location --
VALUES
    (1, 'Which state is known as The Keystone State?', 'Pennsylvania', 'Social Science', 'Easy'),
    (5, 'Which actor portrayed Iron Man in the eponymous 2008 film?', 'Robert Downey Jr.', 'Pop Culture', 'Easy'),
    (2, 'Name the Spanish word for each of the following colors', NULL, 'Language', 'Easy'),
    (3, 'What are the colors of the rainbow?', 'Red, Orange, Yellow, Green, Blue, Indigo, Violet', 'General Knowledge', 'Easy'),
    (4, 'What kind of leaf is featured on the Canadian flag?', 'Maple', 'General Knowledge', 'Easy'),
    (6, 'Chanterelle and Lion''s Mane are varieties of what?', 'Mushroom', 'Biology', 'Medium'),
    (10, 'The lyrics of the Pixies song ""Where Is My Mind?"" were inspired by what outdoor activity?', 'Scuba diving', 'Music', 'Hard'),
    (7, 'In what musical does the cast sing about 525,600 minutes?', 'Rent', 'Arts & Entertainment', 'Easy'),
    (8, 'Nicaragua and Dominica are the only two countries to have what color in their flag?', 'Purple', 'General Knowledge', 'Easy'),
    (9, 'In what game might you collect a hand containing a Pong', 'Mah Jong', 'General Knowledge', 'Medium'),
    (11, 'Caviar is a food consisting of salt-cured roe that is traditionally produced by what kind of fish?', 'Sturgeon', 'Food', 'Medium'),
    (12, 'Name two of the five countries that border Kenya', 'Tanzania, Uganda, South Sudan, Ethiopia, Somalia', 'Geography', 'Medium'),
    (13, 'The acronym NIMBY is used to refer to people who oppose local development projects. What does NIMBY stand for?',
        'Not In My Backyard', 'General Knowledge', 'Medium'),
    (14, 'Order these tech companies by their founding date: Facebook, Uber, Spotify, Netflix',
        'Netflix (1997), Facebook (2004), Spotify (2006), Uber (2009)', 'Business', 'Medium');

INSERT INTO sub_question (parent_question_id, id, question_text, answer_text, image_location)
VALUES
    (2, 1, "Yellow", "Amarillo", "www/yellow.jpg"),
    (2, 2, "Pink", "Rosado", "www/pink.jpg"),
    (2, 3, "White", "Blanco", NULL);
