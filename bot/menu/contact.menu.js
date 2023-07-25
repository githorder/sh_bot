const { Markup } = require("telegraf");

module.exports = Markup.keyboard([
  Markup.button.contactRequest("Поделиться контактом"),
])
  .resize()
  .oneTime(true);
