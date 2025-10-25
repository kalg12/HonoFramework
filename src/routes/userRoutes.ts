import { Hono } from "hono";
import db from "../db/database.js";

const userRoutes = new Hono();

//Get all users
userRoutes.get("/", (c) => {
  const users = db.prepare("SELECT * FROM users").all();
  return c.json(users);
});

//Get a user by id
userRoutes.get("/:id", (c) => {
  const id = c.req.param("id");
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  return c.json(user);
});

//Create a new user
userRoutes.post("/", async (c) => {
  const { name, email } = await c.req.json();
  const user = db
    .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    .run(name, email);
  return c.json(user);
});

//Update a user by id
userRoutes.put("/:id", async (c) => {
  const id = c.req.param("id");
  const { name, email } = await c.req.json();
  const user = db
    .prepare("UPDATE users SET name = ?, email = ? WHERE id = ?")
    .run(name, email, id);
  return c.json(user);
});

//Delete a user by id
userRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const user = db.prepare("DELETE FROM users WHERE id = ?").run(id);
  return c.json(user);
});

export default userRoutes;
