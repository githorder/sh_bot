const bot = require("../../connection/token.connection");

module.exports = bot.action("quiz", async (ctx) => {
  try {
    await ctx.answerCbQuery();
    ctx.scene.enter("quizScene");
  } catch (err) {
    console.log(err);
  }
});
