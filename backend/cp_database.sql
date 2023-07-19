-- Créez la base de données

CREATE DATABASE IF NOT EXISTS cp_database;

-- Utilisez la base de données nouvellement créée

USE cp_database;

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
        'Bulbizarre',
        'Plante',
        'Forêt',
        'Meilleur starter'
    ), (
        'Carapuce',
        'Eau',
        'Plage',
        'Très mignon'
    ), (
        'Salameche',
        'Feu',
        'Volcan',
        'Fait de la lumière la nuit'
    ), (
        'Pikachu',
        'Electricité',
        'Centrale électrique',
        'Peut recharger un téléphone rapidement'
    );