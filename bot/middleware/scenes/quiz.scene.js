const { Scenes, Composer } = require("telegraf");

const CONST = require("../../utils/const");
const User = require("../../../models/user.model");

const menu = require("../../menu/menu");
const contactMenu = require("../../menu/contact.menu");

const designMessage = require("../../messages/design.message");
const squareMessage = require("../../messages/square.message");
const squareLimitMessage = require("../../messages/squareLimit.message");
const styleMessage = require("../../messages/style.message");
const timeMessage = require("../../messages/time.message");
const endQuizMessage = require("../../messages/endQuiz.message");
const rememberBonusMessage = require("../../messages/rememberBonus.message");
const requestCallMessage = require("../../messages/requestCall.message");
const stayMessage = require("../../messages/stay.message");
const lastMessage = require("../../messages/last.message");
const enterNameMessage = require("../../messages/enterName.message");
const contactMessage = require("../../messages/contact.message");

const designOptions = require("../../options/design.options");
const styleOptions = require("../../options/style.options.js");
const timeOptions = require("../../options/time.options");
const consultOptions = require("../../options/consultation.options");

const startStep = new Composer();

startStep.on("callback_query", async (ctx) => {
  let chatId = ctx.chat.id;
  ctx.session.allStyles = {};

  try {
    const user = await User.findOne({ where: { chatId } });

    if (!user) return;
    if (String(chatId) === String(CONST.GROUP_CHAT_ID)) return;

    await ctx.replyWithPhoto(CONST.IMAGES.designImg, {
      caption: designMessage,
      ...designOptions(),
    });

    await ctx.answerCbQuery();

    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
});

const designStep = new Composer();

designStep.on("callback_query", async (ctx) => {
  let chatId = ctx.chat.id;
  try {
    const user = await User.findOne({ where: { chatId } });
    let design = ctx.callbackQuery.data.split(":")[1];

    user.design = design;
    await user.save();

    await ctx.replyWithPhoto(CONST.IMAGES.squareImg, {
      caption: squareMessage,
      parse_mode: "HTML",
    });

    await ctx.answerCbQuery();

    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
});

const squareStep = new Composer();

squareStep.on("message", async (ctx) => {
  let chatId = ctx.chat.id;

  try {
    const user = await User.findOne({ where: { chatId } });
    let square = +ctx.message.text;

    if (isNaN(square) || square < 10 || square > 10000) {
      await ctx.reply(squareLimitMessage);
      return;
    }

    user.square = square;
    await user.save();

    await ctx.replyWithPhoto(CONST.IMAGES.styleImg, {
      caption: styleMessage,
      ...styleOptions(),
    });

    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
});

const styleStep = new Composer();

styleStep.on("callback_query", async (ctx) => {
  let chatId = ctx.chat.id;
  let data = ctx.callbackQuery.data.split(":")[1];
  const { allStyles } = ctx.session;

  try {
    const user = await User.findOne({ where: { chatId } });

    if (data === "confirm") {
      if (!allStyles[chatId] || allStyles[chatId]?.length === 0) {
        await ctx.replyWithPhoto(CONST.IMAGES.styleImg, {
          caption: styleMessage,
          ...styleOptions(),
        });

        return;
      }

      user.style = allStyles[chatId];
      await user.save();
      delete allStyles[chatId];

      await ctx.answerCbQuery();

      await ctx.replyWithPhoto(CONST.IMAGES.timeImg, {
        caption: timeMessage,
        ...timeOptions(),
      });

      ctx.wizard.next();
    } else {
      if (allStyles[chatId]?.includes(data)) {
        let index = allStyles[chatId].indexOf(data);
        allStyles[chatId].splice(index, 1);
      } else {
        if (!allStyles[chatId]) {
          allStyles[chatId] = [];
        }
        allStyles[chatId].push(data);
      }

      await ctx.answerCbQuery();
      await ctx.editMessageReplyMarkup({
        inline_keyboard: styleOptions(allStyles[chatId]).reply_markup
          .inline_keyboard,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

const timeStep = new Composer();

timeStep.on("callback_query", async (ctx) => {
  let data = ctx.callbackQuery.data.split(":")[1];
  let chatId = ctx.chat.id;
  let price = 0;

  try {
    const user = await User.findOne({ where: { chatId } });
    user.time = CONST.TIME_OPTIONS[data];

    if (Number(user.square) <= 50) {
      price = Number(user.square) * CONST.PRICE_MULTIPLIERS[0];
    } else if (Number(user.square) <= 75) {
      price = Number(user.square) * CONST.PRICE_MULTIPLIERS[1];
    } else if (Number(user.square) <= 150) {
      price = Number(user.square) * CONST.PRICE_MULTIPLIERS[2];
    } else if (Number(user.square) <= 300) {
      price = Number(user.square) * CONST.PRICE_MULTIPLIERS[3];
    } else if (Number(user.square) <= 500) {
      price = Number(user.square) * CONST.PRICE_MULTIPLIERS[4];
    } else if (Number(user.square) <= 1000) {
      price = Number(user.square) * CONST.PRICE_MULTIPLIERS[5];
    } else {
      price = null;
    }
    user.price = price;
    await user.save();

    await ctx.editMessageReplyMarkup({
      inline_keyboard: timeOptions(data).reply_markup.inline_keyboard,
    });

    await ctx.answerCbQuery();

    if (user.phone) {
      let discount = Math.round(user.price * 0.9);

      await ctx.replyWithHTML(
        endQuizMessage({ user, price: user.price, discount })
      );
      setTimeout(async () => {
        await ctx.replyWithHTML(rememberBonusMessage);
        await ctx.replyWithDocument(CONST.FILES.bonus);
        await ctx.replyWithDocument(CONST.FILES.checklist);

        setTimeout(async () => {
          await ctx.replyWithHTML(requestCallMessage, consultOptions());
          setTimeout(async () => {
            await ctx.replyWithHTML(stayMessage, menu);
            ctx.scene.leave();
          }, 4000);
        }, 4000);
      }, 3000);
      return;
    }

    await ctx.replyWithHTML(lastMessage);
    await ctx.replyWithHTML(enterNameMessage);
    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
});

const nameStep = new Composer();

nameStep.on("message", async (ctx) => {
  try {
    const user = await User.findOne({ where: { chatId: ctx.chat.id } });

    if (!user) return;

    user.name = ctx.message.text;
    await user.save();
    await ctx.replyWithHTML(contactMessage, contactMenu);
    ctx.wizard.next();
  } catch (err) {
    console.log(err);
  }
});

const contactStep = new Composer();

contactStep.on("contact", async (ctx) => {
  const phone = ctx.message.contact.phone_number;
  let text = ctx.message.text;
  let chatId = ctx.chat.id;
  try {
    const user = await User.findOne({ where: { chatId } });

    if (CONST.COMMANDS.includes(text)) return;
    if (!user) return;
    if (String(chatId) === String(CONST.GROUP_CHAT_ID)) return;

    user.phone = phone;
    await user.save();

    let discount = Math.round(user.price * 0.9);

    await ctx.replyWithHTML(
      endQuizMessage({ user, price: user.price, discount })
    );
    setTimeout(async () => {
      await ctx.replyWithHTML(rememberBonusMessage);
      await ctx.replyWithDocument(CONST.FILES.bonus);
      await ctx.replyWithDocument(CONST.FILES.checklist);

      setTimeout(async () => {
        await ctx.replyWithHTML(requestCallMessage, consultOptions());
        setTimeout(async () => {
          await ctx.replyWithHTML(stayMessage, menu);
          ctx.scene.leave();
        }, 4000);
      }, 4000);
    }, 3000);

    ctx.scene.leave();
  } catch (err) {
    console.log(err);
  }
});

const quizWizard = new Scenes.WizardScene(
  "quizScene",
  startStep,
  designStep,
  squareStep,
  styleStep,
  timeStep,
  nameStep,
  contactStep
);

module.exports = quizWizard;
