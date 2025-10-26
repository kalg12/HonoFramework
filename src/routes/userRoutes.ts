import { Hono } from "hono";
import db from "../db/database.js";

const userRoutes = new Hono();

//Get all users
userRoutes.get("/", (c) => {
  const users = db.prepare("SELECT * FROM users").all();
  return c.json({
    success: true,
    data: users,
    count: users.length,
  });
});

//Get a user by id
userRoutes.get("/:id", (c) => {
  const id = c.req.param("id");
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) {
    return c.json(
      {
        success: false,
        error: "User not found",
        message: `No user found with ID: ${id}`,
      },
      404
    );
  }

  return c.json({
    success: true,
    data: user,
  });
});

//Create a new user with try catch
userRoutes.post("/", async (c) => {
  const { name, email } = await c.req.json();

  // Validación básica
  if (!name || !email) {
    return c.json(
      {
        success: false,
        error: "Validation error",
        message: "Name and email are required",
      },
      400
    );
  }

  try {
    const result = db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run(name, email);

    return c.json(
      {
        success: true,
        message: "User created successfully",
        data: {
          id: result.lastInsertRowid,
          name,
          email,
        },
      },
      201
    );
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return c.json(
        {
          success: false,
          error: "Email already exists",
          message: `The email '${email}' is already registered`,
        },
        409
      );
    }
    return c.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to create user",
      },
      500
    );
  }
});

//Create multiple users
userRoutes.post("/multiple", async (c) => {
  const users = await c.req.json();

  // Validación básica
  if (!Array.isArray(users) || users.length === 0) {
    return c.json(
      {
        success: false,
        error: "Validation error",
        message: "Expected an array of users",
      },
      400
    );
  }

  try {
    const insertUser = db.prepare(
      "INSERT INTO users (name, email) VALUES (?, ?)"
    );
    const insertMany = db.transaction((users) => {
      return users.map((user: any) => insertUser.run(user.name, user.email));
    });
    const result = insertMany(users);

    return c.json(
      {
        success: true,
        message: `${users.length} users created successfully`,
        data: result.map((r: any, index: number) => ({
          id: r.lastInsertRowid,
          name: users[index].name,
          email: users[index].email,
        })),
      },
      201
    );
  } catch (error: any) {
    return c.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to create users",
      },
      500
    );
  }
});

//Update a user by id
userRoutes.put("/:id", async (c) => {
  const id = c.req.param("id");
  const { name, email } = await c.req.json();

  // Validación básica
  if (!name || !email) {
    return c.json(
      {
        success: false,
        error: "Validation error",
        message: "Name and email are required",
      },
      400
    );
  }

  try {
    const result = db
      .prepare("UPDATE users SET name = ?, email = ? WHERE id = ?")
      .run(name, email, id);

    if (result.changes === 0) {
      return c.json(
        {
          success: false,
          error: "User not found",
          message: `No user found with ID: ${id}`,
        },
        404
      );
    }

    return c.json({
      success: true,
      message: "User updated successfully",
      data: {
        id: parseInt(id),
        name,
        email,
      },
    });
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return c.json(
        {
          success: false,
          error: "Email already exists",
          message: `The email '${email}' is already registered by another user`,
        },
        409
      );
    }
    return c.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to update user",
      },
      500
    );
  }
});

//Delete a user by id
userRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);

    if (result.changes === 0) {
      return c.json(
        {
          success: false,
          error: "User not found",
          message: `No user found with ID: ${id}`,
        },
        404
      );
    }

    return c.json({
      success: true,
      message: "User deleted successfully",
      data: {
        id: parseInt(id),
        deletedRows: result.changes,
      },
    });
  } catch (error: any) {
    return c.json(
      {
        success: false,
        error: "Database error",
        message: "Failed to delete user",
      },
      500
    );
  }
});

export default userRoutes;
