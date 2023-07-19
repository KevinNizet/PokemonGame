/* eslint-disable no-undef */
const database = require("./database");

const getAllComment = (req, res) => {
  database
    .query("select * from newpokemon")
    .then(([users]) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getCommentById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from newpokemon where id = ?", [id])
    .then(([comments]) => {
      if (comments[0] != null) {
        res.json(comments[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const deleteComment = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from newpokemon where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the comment");
    });
};

const updateComment = (req, res) => {
  const id = parseInt(req.params.id);
  const { comment } = req.body;

  database
    .query("update newpokemon set comment = ? where id = ?", [comment, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the comment");
    });
};

const createComment = (req, res) => {
  const { comment } = req.body;

  database
    .query("INSERT INTO newpokemon (comment) VALUES (?)", [comment])
    .then(([result]) => {
      res.location(`/comment/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the pokemon");
    });
};

module.exports = {
  getAllComment,
  getCommentById,
  deleteComment,
  updateComment,
  createComment,
};
