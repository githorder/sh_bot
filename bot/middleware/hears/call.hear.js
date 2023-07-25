const { Markup } = require("telegraf");

const bot = require("../../connection/token.connection");
const User = require("../../../models/user.model");

const menu = require("../../menu/menu");

const callMessage = require("../../messages/call.message");

module.exports = bot.hears("Заказать звонок", async (ctx) => {
  try {
    const user = await User.findOne({ where: { chatId: ctx.chat.id } });

    if (!user.phone) {
      await ctx.scene.enter("requestCallScene");
    } else {
      await ctx.reply(callMessage, menu);
      user.requestedCall = 1;
      await user.save();
    }
  } catch (err) {
    console.log(err);
  }
});
