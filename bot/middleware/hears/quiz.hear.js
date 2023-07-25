const { Markup } = require("telegraf");

const bot = require("../../connection/token.connection");

const startQuizMessage = require("../../messages/startQuiz.message");

const CONST = require("../../utils/const");

module.exports = bot.hears("Рассчитать стоимость", async (ctx) => {
  try {
    await ctx.replyWithPhoto(CONST.IMAGES.previewImg, {
      caption: startQuizMessage,
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [Markup.button.callback("Пройти тест", "quiz")],
      ]),
    });
  } catch (err) {
    console.log(err);
  }
});
