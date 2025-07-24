const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const result = await User.find({});
  response.status(200).json(result);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json(error);
  }
});

usersRouter.delete("/:id", async (request, response) => {
  const userId = request.params.id;
  await User.findByIdAndDelete(userId);
  response.status(204).end();
});

module.exports = usersRouter;
