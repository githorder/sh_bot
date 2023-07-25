const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

require("./bot/middleware/session/user.session");

require("./bot/middleware/rateLimit/index");

require("./bot/commands/start.command");

require("./bot/middleware/scenes/index.scene");

require("./bot/middleware/hears/quiz.hear");
require("./bot/middleware/hears/call.hear");
require("./bot/middleware/hears/about.hear");
require("./bot/middleware/hears/bonus.hear");

require("./bot/middleware/actions/quiz.actions");
require("./bot/middleware/actions/consultation.actions");
require("./bot/middleware/actions/about.actions");

require("./bot/middleware/on/message.on");

const sequelize = require("./startup/db.startup");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV === "development") {
  require("./bot/connection/local.connection");
}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("The Database is running");

    app.listen(PORT, () => {
      console.log(`The server is running on PORT:${PORT}`);
    });

    app.get("/", async (req, res) => {
      try {
        res.send("Hello");
      } catch (err) {
        console.log(err);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
