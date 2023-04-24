const users = [];
let maxId = 0;

function getUser(req, res, next) {
  const { id } = req.params;
  const user = users.find((item) => item.id === id);

  if (!user) {
    res.send({ error: true, message: "User not found." });
  } else {
    res.send(user);
  }
}

function addUser(req, res, next) {
  const { name } = req.body;
  const newUser = {
    name,
    id: ++maxId,
  };
  users.push(newUser);
  res.send(newUser);
}

module.exports = { getUser, addUser };
