const { Composer, Scenes, Markup } = require("telegraf");
const User = require("../../../models/user.model");

const menu = require("../../menu/menu");

const requestContactsMessage = require("../../messages/requestContacts.message");
const enterNameMessage = require("../../messages/enterName.message");
const contactMessage = require("../../messages/contact.message");
const callMessage = require("../../messages/call.message");

const startStep = async (ctx) => {
  try {
    await ctx.replyWithHTML(requestContactsMessage);
    await ctx.replyWithHTML(enterNameMessage);
    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
};

const requestName = new Composer();

requestName.on("message", async (ctx) => {
  try {
    const user = await User.findOne({ where: { chatId: ctx.chat.id } });

    if (!user) {
      return;
    }

    user.name = ctx.message.text;
    await user.save();
    await ctx.replyWithHTML(
      contactMessage,
      Markup.keyboard([Markup.button.contactRequest("Поделиться контактом")])
        .resize()
        .oneTime(true)
    );
    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
});

const requestNumber = new Composer();

requestNumber.on("contact", async (ctx) => {
  try {
    const phone = ctx.message.contact.phone_number;
    const user = await User.findOne({ where: { chatId: ctx.chat.id } });
    user.phone = phone;

    await ctx.reply(callMessage, menu);

    user.requestedCall = 1;

    await user.save();
    ctx.scene.leave();
  } catch (err) {
    console.log(err);
  }
});

const requestCallWizard = new Scenes.WizardScene(
  "requestCallScene",
  startStep,
  requestName,
  requestNumber
);

module.exports = requestCallWizard;
