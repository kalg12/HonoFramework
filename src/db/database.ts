import Database from "better-sqlite3";

/* This code snippet is creating a new instance of the `Database` class from the "better-sqlite3"
library. The `new Database("db.sqlite", { verbose: console.log })` part is initializing a new
database connection to a SQLite database file named "db.sqlite". The second argument `{ verbose:
console.log }` is an optional configuration object that enables verbose logging to the console for
debugging purposes. */
const db = new Database("db.sqlite", { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`);

export default db;
