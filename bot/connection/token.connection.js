const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TG_BOT_TOKEN);

module.exports = bot;
