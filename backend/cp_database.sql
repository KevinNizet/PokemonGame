DROP TABLE IF EXISTS pokemon;

CREATE TABLE
    pokemon (
        id int primary key NOT NULL AUTO_INCREMENT,
        firstname varchar(255) NOT NULL,
        type varchar(255) NOT NULL,
        location varchar(255) NOT NULL,
        description varchar(255) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
    pokemon (
        firstname,
        type,
        location,
        description
    )
VALUES (
        'Citizen Kane',
        'Orson Wells',
        '1941',
        '0'
    ), (
        'The Godfather',
        'Francis Ford Coppola',
        '1972',
        '1'
    ), (
        'Pulp Fiction',
        'Quentin Tarantino',
        '1994',
        '1'
    ), (
        'Apocalypse Now',
        'Francis Ford Coppola',
        '1979',
        '1'
    ), (
        '2001 a space odyssey',
        'Stanley Kubrick',
        '1968',
        '1'
    ), (
        'The Dark Knight',
        'Christopher Nolan',
        '2008',
        '1'
    );