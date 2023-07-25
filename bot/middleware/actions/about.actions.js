const bot = require("../../connection/token.connection");
const User = require("../../../models/user.model");

const callMessage = require("../../messages/call.message");

const menu = require("../../menu/menu");

bot.action("about:Заказать звонок", async (ctx) => {
  let chatId = ctx.chat.id;

  try {
    await ctx.answerCbQuery();

    const user = await User.findOne({ where: { chatId } });

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
