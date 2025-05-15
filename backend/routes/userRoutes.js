import express from "express";
const router = express.Router();

var users = [
  {
    id: 1,
    name: "John",
    age: 25,
    sex: "masculino",
    weight: 70,
    height: 175,
    activityLevel: "moderado",
    goal: "manter",
  },
  {
    id: 2,
    name: "Maria",
    age: 30,
    sex: "feminino",
    weight: 60,
    height: 165,
    activityLevel: "leve",
    goal: "perder",
  },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.send(users.find((x) => x.id == id));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (users.find((x) => x.id == id) === undefined) {
    res.send("Bad request");
  } else {
    users = users.filter((user) => user.id != id);
    res.send("User " + id + " deleted!");
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  let userToCreate = req.body;

  if (users.find((x) => x.id == id) === undefined) {
    res.send("Bad request");
  } else {
    let user = users.find((user) => user.id == id);
    user.first_name = userToCreate.first_name;
    user.last_name = userToCreate.last_name;
    user.email = userToCreate.email;

    res.send("User " + id + " updated!");
  }
});

router.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: users.length + 1 });

  res.send(`${user.first_name} has been added to the Database`);
});

export default router;
