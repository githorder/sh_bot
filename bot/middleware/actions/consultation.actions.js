const bot = require("../../connection/token.connection");

const CONST = require("../../utils/const");

const menu = require("../../menu/menu");

const callMessage = require("../../messages/call.message");
const quizResultMessage = require("../../messages/quizResult.message");

const User = require("../../../models/user.model");

bot.action("consult", async (ctx) => {
  let chatId = ctx.chat.id;

  try {
    await ctx.answerCbQuery();
    const user = await User.findOne({ where: { chatId } });
    await ctx.replyWithHTML(callMessage, menu);
    user.requestedCall = 1;

    await ctx.telegram.sendMessage(
      CONST.GROUP_CHAT_ID,
      quizResultMessage({ user, source: "Получить консультацию", chatId }),
      { parse_mode: "HTML" }
    );
  } catch (err) {
    console.log(err);
  }
});
