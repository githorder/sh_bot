const bot = require("../../connection/token.connection");

const CONST = require("../../utils/const");

module.exports = bot.on("message", async (ctx) => {
  try {
    let chatId = ctx.chat.id;
    let messageText = ctx.message.text;

    if (String(chatId) === String(CONST.GROUP_CHAT_ID)) {
      let endIndex = ctx.message.reply_to_message.text.indexOf("chatId");

      let userChatId = Number(
        ctx.message.reply_to_message.text.slice(0, endIndex).trim()
      );

      if (!userChatId) return;

      await ctx.telegram.sendMessage(userChatId, messageText);
      return;
    }
  } catch (err) {
    console.log(err);
  }
});
