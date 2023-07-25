const { Markup } = require("telegraf");

module.exports = (time) =>
  Markup.inlineKeyboard([
    [
      Markup.button.callback(
        Number(time) === 0
          ? "✅ Чем раньше, тем лучше"
          : "Чем раньше, тем лучше",
        "time:0"
      ),
      Markup.button.callback(
        Number(time) === 2 ? "✅ В течении полугода" : "В течении полугода",
        "time:2"
      ),
    ],
    [
      Markup.button.callback(
        Number(time) === 3 ? "✅ В течение года" : "В течение года",
        "time:3"
      ),
      Markup.button.callback(
        Number(time) === 4 ? "✅ Через год или более" : "Чем раньше, тем лучше",
        "time:4"
      ),
    ],
    [
      Markup.button.callback(
        Number(time) === 1
          ? "✅ Сразу по готовности дизайн-проекта"
          : "Сразу по готовности дизайн-проекта",
        "time:1"
      ),
    ],
  ]).resize();
