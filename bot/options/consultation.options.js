const { Markup } = require("telegraf");

module.exports = () =>
  Markup.inlineKeyboard([
    [Markup.button.callback("Получить консультацию", "consult")],
  ]).resize();
