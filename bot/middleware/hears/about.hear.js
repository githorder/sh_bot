const bot = require("../../connection/token.connection");

const aboutMessage = require("../../messages/about.message");
const requestCallAboutMessage = require("../../messages/requestCallAbout.message");

const requestCallAboutOptions = require("../../options/requestCallAbout.options");

bot.hears("Узнать больше о “Sweet Home Design”", async (ctx) => {
  try {
    await ctx.replyWithHTML(aboutMessage);
    setTimeout(async () => {
      await ctx.replyWithHTML(requestCallAboutMessage, requestCallAboutOptions);
    }, 4000);
  } catch (err) {
    console.log(err);
  }
});
