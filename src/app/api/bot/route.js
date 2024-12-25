// app/api/bot/route.js

import { NextResponse } from 'next/server'
import { Telegraf } from 'telegraf'

// Переменная бота на уровне модуля.
// При первом импортировании модуля, если бот не создан — создаём.
// При повторном вызове (в той же среде выполнения) бот уже будет.
let bot

// Функция, которая инициализирует бота один раз
function initBot() {
  if (!bot) {
    const token = process.env.BOT_TOKEN
    if (!token) {
      throw new Error('BOT_TOKEN не указан в .env!')
    }

    // Инициализируем бота
    bot = new Telegraf(token)
    // Настраиваем хендлеры
    bot.start((ctx) => ctx.reply('Бот запущен через webhook!'))
    bot.hears(/привет/i, (ctx) => ctx.reply('И тебе привет!'))
    bot.on('text', (ctx) => {
      ctx.reply(`Вы сказали: ${ctx.message.text}`)
    })
  }
  return bot
}

/**
 * Обработчик POST-запросов (Telegram шлёт обновления методом POST)
 */
export async function POST(request) {
  try {
    // Гарантируем, что бот инициализирован
    const botInstance = initBot()

    // Считываем update из тела запроса
    const update = await request.json()

    // Передаём update боту на обработку
    await botInstance.handleUpdate(update)

    // Возвращаем OK
    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Ошибка при обработке update:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Обработчик GET-запросов (для теста)
 */
export async function GET() {
  return NextResponse.json({ message: 'Hello from Telegram bot API route' })
}