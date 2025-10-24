import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  /* `return c.text("Hello Hono!");` is sending a response with the text "Hello Hono!" back to the
  client. In this case, `c` is the context object representing the request and response, and `text`
  is a method provided by the Hono framework to send a plain text response to the client. We could change the letter.
  We hame some other methods like json, html, etc.*/
  return c.text("Hello Hono!");
});

/* If I want to return a JSON response, I can use the json method. */
app.get("/json", (c) => {
  return c.json({
    developer: "Kevin Luciano",
    message: "Hello, thanks for watching!",
    year: new Date().getFullYear(),
    sum: 1 + 1,
  });
});

const myName = "Kevin Luciano";

/* If I want to return a HTML response, I can use the html method. */
app.get("/html", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello Hono! - ${myName}</title>
    </head>
    <body>
      <h1>Hello Hono!</h1>
      <p>This is a HTML response. Created by Kevin Luciano.</p>
    </body>
    </html>
  `);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
