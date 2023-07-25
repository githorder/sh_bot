const rateLimit = require("telegraf-ratelimit");

const bot = require("../../connection/token.connection");

const limitConfig = {
  limit: 2,
  window: 1000,
  onLimitExceeded: (ctx, _) =>
    ctx.reply("Превышено количество запросов, попробуйте ещё раз."),
};

module.exports = bot.use(rateLimit(limitConfig));
