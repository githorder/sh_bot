module.exports = ({ user, price, discount }) => {
  if (Number(user.square) > 1000) {
    return `Спасибо, ${user.name || user.tgName}!

Поскольку ваша площадь попадает под категорию крупных проектов (площадь от 1000 кв. метров), мы готовы предложить вам <b>самые выгодные цены</b>: до 8$ за квадрат!
                    
Точную цену вашего проекта мы сможем просчитать после <b>консультации.</b>
                    
✅ За вашим номером телефона также закреплена <b>скидка в 10%</b>, позвоните нам, чтобы ей воспользоваться!
            
Вы всегда можете получить бесплатную консультацию от нас по номерам:
            
<b>+998 99 511-54-45</b>
<b>+998 95 800-88-83</b>`;
  }

  return `
    Спасибо, ${user.name || user.tgName}!

Исходя из введённой вами квадратуры в ${
    user.square
  } кв.м., мы рассчитали примерную стоимость вашего дизайн-проекта — ${price}$
  
Ваша скидка: 10%
  
<b>✅ Стоимость дизайн-проекта с учетом скидки — ${discount}$!</b>

Скидка в 10% закреплена за вашим номером телефона.
Свяжитесь с нами, чтобы воспользоваться скидкой лично или передать ее своим близким!

Вы всегда можете получить бесплатную консультацию от нас по номерам:
<b>+998 99 511-54-45</b>
<b>+998 95 800-88-83</b>`;
};
