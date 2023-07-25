const { Markup } = require("telegraf");

module.exports = (styles = []) =>
  Markup.inlineKeyboard([
    [
      Markup.button.callback(
        `${styles?.includes("Hi-Tech") ? "✅ Hi-Tech" : "Hi-Tech"}`,
        "style:Hi-Tech"
      ),

      Markup.button.callback(
        `${styles?.includes("Арт-деко") ? "✅ Арт-деко" : "Арт-деко"}`,
        "style:Арт-деко"
      ),
      Markup.button.callback(
        `${styles?.includes("Классика") ? "✅ Классика" : "Классика"}`,
        "style:Классика"
      ),
    ],
    [
      Markup.button.callback(
        `${
          styles?.includes("Минимализм | Лофт")
            ? "✅ Минимализм | Лофт"
            : "Минимализм | Лофт"
        }`,
        "style:Минимализм | Лофт"
      ),
      Markup.button.callback(
        `${styles?.includes("Модерн") ? "✅ Модерн" : "Модерн"}`,
        "style:Модерн"
      ),
    ],
    [
      Markup.button.callback(
        `${styles?.includes("Luxury") ? "✅ Luxury" : "Luxury"}`,
        "style:Luxury"
      ),
      Markup.button.callback(
        `${styles?.includes("Другое") ? "✅ Другое" : "Другое"}`,
        "style:Другое"
      ),
    ],
    [Markup.button.callback("☑️ Подтвердить", "style:confirm")],
  ]).resize();
