const { Markup } = require("telegraf");

module.exports = Markup.keyboard([
  ["Заказать звонок", "Получить бонусы"],
  ["Рассчитать стоимость"],
  ["Узнать больше о “Sweet Home Design”"],
])
  .resize()
  .oneTime(true);
