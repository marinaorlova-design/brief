// ============================================================
// CLOUDFLARE WORKER — пересылает бриф с сайта в Telegram
// Этот файл НЕ нужно класть на сайт — он деплоится отдельно в Cloudflare.
// Как развернуть и какие секреты задать — см. README.md.
//
// Ожидаемые переменные окружения (секреты Worker'а):
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата/канала, куда присылать брифы
//   ALLOWED_ORIGIN     — необязательно, адрес сайта (по умолчанию "*")
// ============================================================

const TELEGRAM_MESSAGE_LIMIT = 4096;

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// В обычном (legacy) Markdown Telegram нужно экранировать всего 4 символа.
function escapeMarkdown(text) {
  return String(text).replace(/([_*`\[])/g, '\\$1');
}

// Режет длинный текст на куски по TELEGRAM_MESSAGE_LIMIT символов,
// не разрывая абзацы (границы — двойной перенос строки).
function splitIntoChunks(text, limit = TELEGRAM_MESSAGE_LIMIT) {
  if (text.length <= limit) return [text];
  const paragraphs = text.split('\n\n');
  const chunks = [];
  let current = '';
  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length > limit) {
      if (current) chunks.push(current);
      // Если даже один абзац длиннее лимита — режем его жёстко.
      if (paragraph.length > limit) {
        for (let i = 0; i < paragraph.length; i += limit) {
          chunks.push(paragraph.slice(i, i + limit));
        }
        current = '';
      } else {
        current = paragraph;
      }
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function buildSummaryMessage(data) {
  const lines = ['*Новый бриф на сайте*', ''];
  if (data.contactName) lines.push(`*Имя:* ${escapeMarkdown(data.contactName)}`);
  if (data.contactInfo) lines.push(`*Контакт:* ${escapeMarkdown(data.contactInfo)}`);
  if (data.companyName) lines.push(`*Компания:* ${escapeMarkdown(data.companyName)}`);
  if (data.deadline) lines.push(`*Желаемый срок:* ${escapeMarkdown(data.deadline)}`);
  if (data.mainAction) lines.push('', `*Главное действие на сайте:*\n${escapeMarkdown(data.mainAction)}`);
  return lines.join('\n');
}

function buildStageMessage(stage) {
  const title = `*Этап ${String(stage.number).padStart(2, '0')} · ${escapeMarkdown(stage.name)}*`;
  const items = stage.items.map((item) => {
    const prefix = item.important ? '⭐️ ' : '';
    return `${prefix}*${escapeMarkdown(item.label)}*\n${escapeMarkdown(item.value)}`;
  });
  return [title, ...items].join('\n\n');
}

async function sendTelegramMessage(env, text) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    console.error('Telegram sendMessage error:', await res.text());
  }
}

async function sendTelegramDocument(env, file) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`;
  const form = new FormData();
  form.append('chat_id', env.TELEGRAM_CHAT_ID);
  form.append('document', file, file.name);
  form.append('caption', `Файл: ${file.name}`);
  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) {
    console.error('Telegram sendDocument error:', await res.text());
  }
}

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders(origin) });
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({ ok: false, error: 'Worker не настроен: нет TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID' }), {
        status: 500,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }

    try {
      const formData = await request.formData();
      const payloadRaw = formData.get('payload');
      if (!payloadRaw) throw new Error('Нет поля payload в запросе');
      const data = JSON.parse(payloadRaw);

      // 1. Сводка — первым сообщением.
      await sendTelegramMessage(env, buildSummaryMessage(data));

      // 2. Каждый этап — отдельным сообщением (может резаться на несколько).
      for (const stage of data.stages || []) {
        const stageText = buildStageMessage(stage);
        const chunks = splitIntoChunks(stageText);
        for (const chunk of chunks) {
          await sendTelegramMessage(env, chunk);
        }
      }

      // 3. Файлы — документами, следом.
      const files = formData.getAll('files');
      for (const file of files) {
        if (file && typeof file.arrayBuffer === 'function') {
          await sendTelegramDocument(env, file);
        }
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Ошибка обработки брифа:', err);
      return new Response(JSON.stringify({ ok: false, error: String(err) }), {
        status: 500,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }
  },
};
