const bot = require("../../connection/token.connection");

const menu = require("../../menu/menu");

const bonusMessage = require("../../messages/bonus.message");

const User = require("../../../models/user.model");

const CONST = require("../../utils/const");

bot.hears("Получить бонусы", async (ctx) => {
  let chatId = ctx.chat.id;

  try {
    const user = await User.findOne({ where: { chatId } });

    if (!user.phone) {
      ctx.scene.enter("bonusScene");
    } else {
      await ctx.replyWithHTML(bonusMessage, menu);
      await ctx.replyWithDocument(CONST.FILES.bonus);
      await ctx.replyWithDocument(CONST.FILES.checklist);
    }
  } catch (err) {
    console.log(err);
  }
});
