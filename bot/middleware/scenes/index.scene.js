const { Scenes } = require("telegraf");

const bot = require("../../connection/token.connection");

const dialogBase = require("./dialog.scene");
const requestCallWizard = require("./requestCall.scene");
const quizWizard = require("../scenes/quiz.scene");
const bonusWizard = require("../scenes/bonus.scene");

const stage = new Scenes.Stage([
  quizWizard,
  requestCallWizard,
  bonusWizard,
  dialogBase,
]);

bot.use(stage.middleware());

module.exports = stage;
