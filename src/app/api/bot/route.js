import { Telegraf } from 'telegraf';

/**
 * Чтобы бот не инициализировался заново при каждом запросе,
 * мы можем хранить его в глобальной переменной (хак для Serverless).
 */


if (!bot) {
  // Инициализация бота
  bot = new Telegraf(process.env.BOT_TOKE);

  // Простейшие обработчики
  bot.start((ctx) => ctx.reply('Бот запущен через webhook!'));
  bot.hears(/привет/i, (ctx) => ctx.reply('И тебе привет!'));
  bot.on('text', (ctx) => {
    ctx.reply(`Вы сказали: ${ctx.message.text}`);
  });

  // Не делаем bot.launch()! Используем handleUpdate() в обработчике запросов.
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Передаём update боту
      await bot?.handleUpdate(req.body, res);
    } catch (error) {
      console.error('Ошибка при обработке update:', error);
      return res.status(500).send('Internal Server Error');
    }
    // Если Telegraf сам не ответил, отправляем OK
    if (!res.headersSent) {
      res.status(200).send('OK');
    }
  } else {
    // Можно вернуть что-то при GET-запросе, просто для проверки
    res.status(200).json({ message: 'Hello from Telegram bot API route' });
  }
}