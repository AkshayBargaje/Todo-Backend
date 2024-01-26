const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db/index");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// body{   for validation
// title:string
// description: string
// }

// List of all the Todo's
app.post("/todo", async (req, res) => {
  const createPayLoad = req.body;
  const parsedPayLoad = createTodo.safeParse(createPayLoad);
  if (!parsedPayLoad.success) {
    res.status(411).json({
      msg: "You sent the wrong input",
    });
    return;
  }
  try {
    await todo.create({
      title: createPayLoad.title,
      description: createPayLoad.description,
    });

    res.status(200).json({
      msg: "New Todo created",
    });
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find();
  res.status(200).json({ todos });
});

app.put("/completed", async (req, res) => {
  const updatePayLoad = req.body;
  const parsedPayLoad = updateTodo.safeParse(updatePayLoad);
  if (!parsedPayLoad.success) {
    res.status(411).json({
      msg: "You sent wrong inputs",
    });
    return;
  }

  try {
    await todo.findOneAndUpdate(
      { _id: updatePayLoad.id },
      { completed: !updatePayLoad.status }
    );
    res.status(200).json({
      msg: "Updated",
    });
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://Akshay11:Akshay11@cluster0.pd8rqul.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    // Wait for MongoDB connection first, and then build the server
    app.listen(3000, () => {
      const address = server.address();
      console.log(`Server listening on${address.address} : ${address.port}`);

      //   console.log(`Server is listening on port 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
