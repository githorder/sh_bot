const { Markup } = require("telegraf");

module.exports = () =>
  Markup.inlineKeyboard([
    [
      Markup.button.callback("Дом", "design:Дом"),
      Markup.button.callback("Квартира", "design:Квартира"),
      Markup.button.callback("Офис", "design:Офис"),
    ],
    [
      Markup.button.callback("Магазин", "design:Магазин"),
      Markup.button.callback("Ресторан", "design:Ресторан"),
      Markup.button.callback("Гостиница", "design:Гостиница"),
    ],
    [Markup.button.callback("Другое", "design:Другое")],
  ]).resize();
