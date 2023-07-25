const { Composer, Scenes } = require("telegraf");
const User = require("../../../models/user.model");

const menu = require("../../menu/menu");

const getBonusMessage = require("../../messages/getBonus.message");
const enterNameMessage = require("../../messages/enterName.message");
const contactMessage = require("../../messages/contact.message");
const bonusMessage = require("../../messages/bonus.message");

const contactOptions = require("../../options/contact.options");

const CONST = require("../../utils/const");

const startStep = async (ctx) => {
  try {
    await ctx.replyWithHTML(getBonusMessage);
    await ctx.replyWithHTML(enterNameMessage);
    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
};

const requestName = new Composer();

requestName.on("message", async (ctx) => {
  let chatId = ctx.chat.id;

  try {
    const user = await User.findOne({ where: { chatId } });

    if (!user) {
      return;
    }

    user.name = ctx.message.text;
    await user.save();
    await ctx.replyWithHTML(contactMessage, contactOptions);
    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
});

const requestNumber = new Composer();

requestNumber.on("contact", async (ctx) => {
  let chatId = ctx.chat.id;

  try {
    const phone = ctx.message.contact.phone_number;
    const user = await User.findOne({ where: { chatId } });
    user.phone = phone;
    await user.save();

    await ctx.replyWithHTML(bonusMessage, menu);
    await ctx.replyWithDocument(CONST.FILES.bonus);
    await ctx.replyWithDocument(CONST.FILES.checklist);

    ctx.scene.leave();
  } catch (err) {
    console.log(err);
  }
});

const bonusWizard = new Scenes.WizardScene(
  "bonusScene",
  startStep,
  requestName,
  requestNumber
);

module.exports = bonusWizard;
