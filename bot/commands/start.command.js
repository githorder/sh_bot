const { Markup } = require("telegraf");

const bot = require("../connection/token.connection");

const CONSTS = require("../utils/const");

const menu = require("../menu/menu");

const startQuizMessage = require("../messages/startQuiz.message");
const welcomeMessage = require("../messages/welcome.message");

// bot.on("document", async (ctx) => {
//   console.log(ctx.message.document.file_id);
// });

module.exports = bot.start(async (ctx) => {
  let chatId = ctx.chat.id,
    startUrl = ctx.message.text.split("/start")[1].trim(),
    name = `${ctx.from.first_name || ""} ${ctx.from.last_name || ""}`;

  if (String(chatId) === String(CONSTS.GROUP_CHAT_ID)) return;

  try {
    if (startUrl === "quiz") {
      await ctx.replyWithPhoto(CONSTS.IMAGES.previewImg);
      await ctx.replyWithHTML(
        startQuizMessage,
        Markup.inlineKeyboard([[Markup.button.callback("Пройти тест", "quiz")]])
      );
    }

    await ctx.replyWithHTML(welcomeMessage, menu);
  } catch (err) {
    console.log(`The error is ${err}`);
    await ctx.sendMessage(`Что-то пошло не так, попробуйте позже`);
  }
});
