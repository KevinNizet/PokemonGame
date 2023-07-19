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
        description varchar(255) NOT NULL,
        picture varchar(500)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
    pokemon (
        firstname,
        type,
        location,
        description,
        picture
    )
VALUES (
        'Bulbizarre',
        'Plante',
        'Forêt',
        'Meilleur starter',
        'https://i.gifer.com/WnES.gif'
    ), (
        'Carapuce',
        'Eau',
        'Plage',
        'Très mignon',
        'https://66.media.tumblr.com/tumblr_ma4ft6OXxw1rfjowdo1_500.gif'
    ), (
        'Salameche',
        'Feu',
        'Volcan',
        'Fait de la lumière la nuit',
        'https://66.media.tumblr.com/tumblr_ma0tijLFPg1rfjowdo1_500.gif'
    ), (
        'Pikachu',
        'Electricité',
        'Centrale électrique',
        'Peut recharger un téléphone rapidement',
        'https://66.media.tumblr.com/927365f0bbdd1f3d2f852bac8759f89b/tumblr_mh8a7wx1WG1rfjowdo1_r2_500.gif'
    );