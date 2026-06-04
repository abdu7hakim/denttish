const TOKEN = '8812802494:AAFy5bzlckr15ys6av2ChUPwPZZbNPEkuVc';
const BASE = `https://api.telegram.org/bot${TOKEN}`;
const MINI_APP_URL = 'https://denttish-app.vercel.app';

async function call(method, body) {
  const r = await fetch(`${BASE}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function sendMessage(chatId, text, extra = {}) {
  return call('sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', ...extra });
}

let lastOffset = 0;

async function poll() {
  const data = await call('getUpdates', { offset: lastOffset + 1, timeout: 30 });

  for (const update of data.result || []) {
    lastOffset = update.update_id;
    const msg = update.message;
    if (!msg || !msg.text) continue;

    const chatId = msg.chat.id;
    const text = msg.text.trim();

    if (text === '/start') {
      await sendMessage(chatId,
        `👋 <b>Xush kelibsiz, ${msg.from.first_name || 'mehmon'}!</b>

DentTish — bu stomatologik klinika uchun zamonaviy bron qilish tizimi.

<b>Nima qila olasiz:</b>
🦷 Shifokorlar bilan tanishish
📅 Qulay vaqtni tanlab qabulga yozilish
🔔 Qabul holatini kuzatish

<b>Davom etish uchun Mini App ni oching:</b>`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '🚀 Mini App ni ochish', web_app: { url: MINI_APP_URL } }
            ]]
          }
        }
      );
    } else if (text === '/help') {
      await sendMessage(chatId,
        `<b>Yordam</b>

/start - Bosh sahifa
/help - Yordam

Savollaringiz bormi? Mini App orqali murojaat qiling:`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '🚀 Mini App', web_app: { url: MINI_APP_URL } }
            ]]
          }
        }
      );
    }
  }

  setTimeout(poll, 1000);
}

console.log('🤖 DentTish bot ishga tushdi...');
poll();
