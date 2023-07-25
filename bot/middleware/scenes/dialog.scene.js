const { Scenes } = require("telegraf");

const dialogBase = new Scenes.BaseScene("dialogScene");

dialogBase.enter(async (ctx) => {
  try {
    await ctx.reply("Entered dialog scene");
  } catch (err) {
    console.log(err);
  }
});

dialogBase.on("message", async (ctx) => {
  try {
    console.log(ctx.message.text);
  } catch (err) {
    console.log(err);
  }
});

module.exports = dialogBase;
