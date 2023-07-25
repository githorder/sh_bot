const { Markup } = require("telegraf");

module.exports = Markup.inlineKeyboard([
  [Markup.button.callback("Заказать звонок", "about:Заказать звонок")],
])
  .resize()
  .oneTime(true);
