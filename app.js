// ============================================================
// САЙТ-БРИФ — логика формы
// Вопросы заданы данными ниже (STAGES / SCREENS) — чтобы изменить
// формулировку, добавить или убрать вопрос, правьте только этот блок.
// ============================================================

// Семь этапов брифа — их названия и описания показываются в левой колонке.
const STAGES = [
  { number: 1, name: 'Бизнес-задача', description: 'Зачем сайт нужен именно сейчас и какое действие он должен приносить чаще всего.' },
  { number: 2, name: 'Продукт и фокус', description: 'Что продаёт бизнес, что покупают чаще всего и что вы хотите продавать больше.' },
  { number: 3, name: 'Клиент', description: 'Первая гипотеза о том, кто покупает и что для него важно при выборе.' },
  { number: 4, name: 'Путь продажи', description: 'Как человек идёт от первого обращения до покупки и где чаще всего срывается сделка.' },
  { number: 5, name: 'Ценность и доказательства', description: 'За что вас ценят и рекомендуют, и чем это можно подтвердить.' },
  { number: 6, name: 'Материалы и дизайн', description: 'Текущий сайт, доступы, готовые материалы и лёгкие пожелания по дизайну.' },
  { number: 7, name: 'Контакты и сроки', description: 'Как с вами связаться и в какие сроки хотелось бы уложиться.' },
];

// Экраны — каждый показывается отдельным шагом с кнопкой «Далее».
// type: 'textarea' | 'text' | 'radio' | 'checkboxGroup' | 'links' | 'files' | 'consent'
const SCREENS = [
  { stage: 1, fields: [
    { id: 'why_now', type: 'textarea', label: 'Зачем бизнесу сайт именно сейчас?', required: true },
    { id: 'main_action', type: 'textarea', label: 'Какое действие сайт должен приводить чаще: запись, звонок, расчёт, покупка?', required: true },
    { id: 'priority_segment', type: 'textarea', label: 'Какое направление, география или сегмент в приоритете?', required: false },
  ]},
  { stage: 2, fields: [
    { id: 'what_sells', type: 'textarea', label: 'Что именно продаёт бизнес?', hint: 'Коротко: ниша, дата основания (по желанию).', required: true },
    { id: 'formats', type: 'textarea', label: 'Какие продукты или форматы можно купить?', required: true },
    { id: 'best_sellers', type: 'textarea', label: 'Что покупают чаще всего?', required: false },
    { id: 'want_more_of', type: 'textarea', label: 'Что бизнес хочет продавать больше?', required: false },
    { id: 'product_scope', type: 'textarea', label: 'Что входит в продукт? Какие есть ограничения?', required: false },
  ]},
  { stage: 3, fields: [
    { id: 'who_buys', type: 'textarea', label: 'Кто обычно покупает?', required: true },
    { id: 'buying_trigger', type: 'textarea', label: 'В какой ситуации он начинает искать решение?', required: false },
    { id: 'choice_criteria', type: 'textarea', label: 'Что для него, предположительно, важно при выборе?', required: false },
  ]},
  { stage: 4, fields: [
    { id: 'first_contact', type: 'textarea', label: 'Кто первым общается с человеком?', required: true },
    { id: 'sales_path', type: 'textarea', label: 'Как выглядит путь от первого обращения до покупки?', required: true },
    { id: 'after_lead', type: 'textarea', label: 'Что происходит сразу после заявки?', required: false },
  ]},
  { stage: 4, fields: [
    { id: 'deal_breakers', type: 'textarea', label: 'Где сделки чаще всего рвутся?', important: true,
      hint: 'Это самый важный ответ на этом этапе: он подскажет, какие блоки и аргументы должны появиться на сайте.', required: true },
    { id: 'objections', type: 'textarea', label: 'Какие возражения или сомнения чаще всего звучат от клиентов?', required: false },
  ]},
  { stage: 5, fields: [
    { id: 'valued_for', type: 'textarea', label: 'За что клиенты особенно ценят компанию?', required: true },
    { id: 'different_how', type: 'textarea', label: 'Что компания делает иначе и чем это доказать?', required: false },
    { id: 'recommended_for', type: 'textarea', label: 'За что компанию рекомендуют?', required: false },
  ]},
  { stage: 5, fields: [
    { id: 'numbers', type: 'textarea', label: 'Цифры, которыми можно подкрепить сказанное', hint: 'Сколько клиентов, проектов, лет на рынке, сотрудников.', required: false },
    { id: 'proof_have', type: 'textarea', label: 'Чем доказываем: что реально есть на руках?', important: true,
      hint: 'Кейсы, цифры, сертификаты, реальные примеры: то, что можно показать, а не просто сказать.', required: true },
    { id: 'proof_lack', type: 'textarea', label: 'Чего пока не хватает и что нельзя обещать', important: true,
      hint: 'Это защита от лишних обещаний на сайте: честно напишите, чего пока не хватает.', required: false },
  ]},
  { stage: 6, fields: [
    { id: 'current_site', type: 'textarea', label: 'Есть ли у вас сайт сейчас?',
      hint: 'Ссылка. Какие функции он выполнял, на что был упор? Что не устраивает, что переносим, что выкидываем?', required: false },
    { id: 'crm_access', type: 'textarea', label: 'Есть ли доступ к CRM, звонкам, перепискам, причинам отказа?', required: false },
  ]},
  { stage: 6, fields: [
    { id: 'reviews_faq', type: 'textarea', label: 'Какие отзывы, FAQ, звонки или переписки уже есть?', required: false },
    { id: 'materials_docs', type: 'textarea', label: 'Есть ли презентации, прайс, документы, фото, рендеры?', required: false },
    { id: 'provide_checklist', type: 'checkboxGroup', label: 'Что из этого вы готовы предоставить?', required: false, options: [
      { value: 'photo_video', label: 'Фото/видео' },
      { value: 'text', label: 'Текст' },
      { value: 'brand_identity', label: 'Фирменный стиль' },
      { value: 'logo', label: 'Логотип' },
      { value: 'audience_analysis', label: 'Анализ ЦА' },
      { value: 'none', label: 'Ничего из этого' },
    ]},
  ]},
  { stage: 6, fields: [
    { id: 'links', type: 'links', label: 'Ссылки на материалы', hint: 'Каждая ссылка с новой строки: сайт, соцсети, облако, презентация.', required: false },
    { id: 'files', type: 'files', label: 'Файлы', hint: 'До 10 файлов, каждый не больше 18 МБ. Файлы не сохраняются в черновике: если перезагрузите страницу, прикрепите их заново.', required: false },
  ]},
  { stage: 6, fields: [
    { id: 'theme_preference', type: 'radio', label: 'Светлый / тёмный / без разницы', required: false, options: [
      { value: 'light', label: 'Светлый' },
      { value: 'dark', label: 'Тёмный' },
      { value: 'no_preference', label: 'Без разницы' },
    ]},
    { id: 'colors_required', type: 'textarea', label: 'Цвета бренда, которые обязательно должны быть', required: false },
    { id: 'colors_avoid', type: 'textarea', label: 'Какие цвета точно не должны использоваться', required: false },
  ]},
  { stage: 7, fields: [
    { id: 'contact_name', type: 'text', label: 'Как вас зовут?', required: true },
    { id: 'company_name', type: 'text', label: 'Компания или проект', required: false },
    { id: 'contact_info', type: 'text', label: 'Телеграм, телефон или почта', required: true },
    { id: 'desired_deadline', type: 'text', label: 'Желаемый срок на разработку', required: false },
    { id: 'anything_else', type: 'textarea', label: 'Что-то ещё, о чём я не спросила?', required: false },
    { id: 'consent', type: 'consent', label: 'Согласен(на) на обработку персональных данных', required: true },
  ]},
];

const TOTAL_STAGES = STAGES.length; // 7
const DRAFT_KEY = 'siteBriefDraft_v1';
const LAST_SUBMISSION_KEY = 'siteBriefLastSubmission_v1';
const MAX_FILES = 10;
const MAX_FILE_SIZE = 18 * 1024 * 1024; // 18 МБ

// ------------------------------------------------------------
// Состояние формы
// ------------------------------------------------------------
const state = {
  currentIndex: 0,
  answers: {},   // { fieldId: значение }
  files: [],     // [{ name, size, file: File }] — не персистентно между перезагрузками
};

// ------------------------------------------------------------
// Ссылки на DOM
// ------------------------------------------------------------
const screenIntro = document.getElementById('screen-intro');
const screenForm = document.getElementById('screen-form');
const screenThanks = document.getElementById('screen-thanks');

const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const fieldsContainer = document.getElementById('fields-container');
const progressFill = document.getElementById('progress-fill');
const stageCounter = document.getElementById('stage-counter');
const asideNumber = document.getElementById('aside-number');
const asideTitle = document.getElementById('aside-title');
const asideDescription = document.getElementById('aside-description');
const toastEl = document.getElementById('toast');
const telegramLink = document.getElementById('telegram-link');
const downloadBtn = document.getElementById('download-btn');
const restartBtn = document.getElementById('restart-btn');

// ============================================================
// ТОСТ-УВЕДОМЛЕНИЯ
// ============================================================
let toastTimer = null;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  requestAnimationFrame(() => toastEl.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-visible');
    setTimeout(() => { toastEl.hidden = true; }, 350);
  }, 3200);
}

// ============================================================
// РЕНДЕР ПОЛЕЙ
// ============================================================

// Автоматический рост textarea под содержимое, без внутренней прокрутки.
function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function fieldWrapper(field) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  wrap.dataset.fieldId = field.id;

  const labelRow = document.createElement('div');
  labelRow.className = 'field__label-row';

  const label = document.createElement('label');
  label.className = 'field__label';
  label.htmlFor = field.id;
  label.textContent = field.label;
  if (field.required) {
    const mark = document.createElement('span');
    mark.className = 'field__required-mark';
    mark.textContent = ' *';
    label.appendChild(mark);
  }
  labelRow.appendChild(label);

  if (field.important) {
    const badge = document.createElement('span');
    badge.className = 'field__badge';
    badge.textContent = 'важно';
    labelRow.appendChild(badge);
  }

  wrap.appendChild(labelRow);

  if (field.hint) {
    const hint = document.createElement('p');
    hint.className = 'field__hint';
    hint.textContent = field.hint;
    wrap.appendChild(hint);
  }

  return wrap;
}

function addErrorNode(wrap, text) {
  const err = document.createElement('p');
  err.className = 'field__error';
  err.textContent = text;
  wrap.appendChild(err);
}

function renderTextarea(field) {
  const wrap = fieldWrapper(field);
  const el = document.createElement('textarea');
  el.id = field.id;
  el.rows = 1;
  el.value = state.answers[field.id] || '';
  el.addEventListener('input', () => {
    state.answers[field.id] = el.value;
    autoGrow(el);
    clearInvalid(wrap);
    scheduleDraftSave();
  });
  wrap.appendChild(el);
  addErrorNode(wrap, 'Пожалуйста, заполните это поле');
  requestAnimationFrame(() => autoGrow(el));
  return wrap;
}

function renderText(field) {
  const wrap = fieldWrapper(field);
  const el = document.createElement('input');
  el.type = 'text';
  el.id = field.id;
  el.value = state.answers[field.id] || '';
  el.addEventListener('input', () => {
    state.answers[field.id] = el.value;
    clearInvalid(wrap);
    scheduleDraftSave();
  });
  wrap.appendChild(el);
  addErrorNode(wrap, 'Пожалуйста, заполните это поле');
  return wrap;
}

function renderLinks(field) {
  const wrap = fieldWrapper(field);
  const el = document.createElement('textarea');
  el.id = field.id;
  el.rows = 1;
  el.placeholder = 'https://…';
  el.value = state.answers[field.id] || '';
  el.addEventListener('input', () => {
    state.answers[field.id] = el.value;
    autoGrow(el);
    clearInvalid(wrap);
    scheduleDraftSave();
  });
  wrap.appendChild(el);
  requestAnimationFrame(() => autoGrow(el));
  return wrap;
}

function renderRadio(field) {
  const wrap = fieldWrapper(field);
  const list = document.createElement('div');
  list.className = 'option-list';
  field.options.forEach((opt, i) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = field.id;
    input.id = `${field.id}_${opt.value}`;
    input.value = opt.value;
    input.checked = state.answers[field.id] === opt.value;
    input.addEventListener('change', () => {
      state.answers[field.id] = opt.value;
      clearInvalid(wrap);
      scheduleDraftSave();
    });
    const lab = document.createElement('label');
    lab.htmlFor = input.id;
    lab.textContent = opt.label;
    item.appendChild(input);
    item.appendChild(lab);
    list.appendChild(item);
  });
  wrap.appendChild(list);
  return wrap;
}

function renderCheckboxGroup(field) {
  const wrap = fieldWrapper(field);
  const list = document.createElement('div');
  list.className = 'option-list';
  const current = Array.isArray(state.answers[field.id]) ? state.answers[field.id] : [];
  field.options.forEach((opt) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `${field.id}_${opt.value}`;
    input.value = opt.value;
    input.checked = current.includes(opt.value);
    input.addEventListener('change', () => {
      let arr = Array.isArray(state.answers[field.id]) ? state.answers[field.id].slice() : [];
      if (input.checked) {
        if (!arr.includes(opt.value)) arr.push(opt.value);
      } else {
        arr = arr.filter((v) => v !== opt.value);
      }
      state.answers[field.id] = arr;
      scheduleDraftSave();
    });
    const lab = document.createElement('label');
    lab.htmlFor = input.id;
    lab.textContent = opt.label;
    item.appendChild(input);
    item.appendChild(lab);
    list.appendChild(item);
  });
  wrap.appendChild(list);
  return wrap;
}

function humanFileSize(bytes) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function renderFiles(field) {
  const wrap = fieldWrapper(field);

  const drop = document.createElement('div');
  drop.className = 'file-drop';
  drop.tabIndex = 0;
  drop.innerHTML = `
    <span class="file-drop__title">Перетащите файлы сюда или нажмите, чтобы выбрать</span>
    <span class="file-drop__hint">До ${MAX_FILES} файлов, каждый не больше 18 МБ</span>
  `;
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  drop.appendChild(input);

  const list = document.createElement('div');
  list.className = 'file-list';

  function renderList() {
    list.innerHTML = '';
    state.files.forEach((item, idx) => {
      const row = document.createElement('div');
      row.className = 'file-list__item';
      const name = document.createElement('span');
      name.className = 'file-list__name';
      name.textContent = item.name;
      const size = document.createElement('span');
      size.className = 'file-list__size';
      size.textContent = humanFileSize(item.size);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'file-list__remove';
      removeBtn.innerHTML = '✕';
      removeBtn.setAttribute('aria-label', `Удалить файл ${item.name}`);
      removeBtn.addEventListener('click', () => {
        state.files.splice(idx, 1);
        renderList();
      });
      row.appendChild(name);
      row.appendChild(size);
      row.appendChild(removeBtn);
      list.appendChild(row);
    });
  }
  renderList();

  function addFiles(fileList) {
    const incoming = Array.from(fileList);
    for (const file of incoming) {
      if (state.files.length >= MAX_FILES) {
        showToast(`Можно прикрепить не больше ${MAX_FILES} файлов`);
        break;
      }
      if (file.size > MAX_FILE_SIZE) {
        showToast(`«${file.name}» больше 18 МБ, файл не добавлен`);
        continue;
      }
      state.files.push({ name: file.name, size: file.size, file });
    }
    renderList();
  }

  drop.addEventListener('click', () => input.click());
  drop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
  });
  input.addEventListener('change', () => { addFiles(input.files); input.value = ''; });
  ['dragenter', 'dragover'].forEach((evt) => {
    drop.addEventListener(evt, (e) => { e.preventDefault(); drop.classList.add('is-dragover'); });
  });
  ['dragleave', 'drop'].forEach((evt) => {
    drop.addEventListener(evt, (e) => { e.preventDefault(); drop.classList.remove('is-dragover'); });
  });
  drop.addEventListener('drop', (e) => { addFiles(e.dataTransfer.files); });

  wrap.appendChild(drop);
  wrap.appendChild(list);
  return wrap;
}

function renderConsent(field) {
  const wrap = fieldWrapper(field);
  wrap.querySelector('.field__label-row').remove(); // у согласия своя разметка ниже

  const row = document.createElement('div');
  row.className = 'consent-row';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = field.id;
  input.checked = !!state.answers[field.id];
  input.addEventListener('change', () => {
    state.answers[field.id] = input.checked;
    clearInvalid(wrap);
    scheduleDraftSave();
    updateNextButtonState();
  });
  const label = document.createElement('label');
  label.htmlFor = field.id;
  label.innerHTML = `Согласен(на) на обработку персональных данных в соответствии с <a href="privacy.html" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>
    и <a href="offer.html" target="_blank" rel="noopener noreferrer">публичной офертой</a>.`;
  row.appendChild(input);
  row.appendChild(label);
  wrap.appendChild(row);
  addErrorNode(wrap, 'Нужно согласие на обработку данных, чтобы отправить бриф');
  return wrap;
}

function renderField(field) {
  switch (field.type) {
    case 'textarea': return renderTextarea(field);
    case 'text': return renderText(field);
    case 'links': return renderLinks(field);
    case 'radio': return renderRadio(field);
    case 'checkboxGroup': return renderCheckboxGroup(field);
    case 'files': return renderFiles(field);
    case 'consent': return renderConsent(field);
    default: return document.createElement('div');
  }
}

function clearInvalid(wrap) { wrap.classList.remove('is-invalid'); }

// ============================================================
// НАВИГАЦИЯ ПО ЭКРАНАМ ФОРМЫ
// ============================================================

function renderScreen(idx) {
  const screen = SCREENS[idx];
  const stageInfo = STAGES[screen.stage - 1];

  fieldsContainer.innerHTML = '';
  screen.fields.forEach((field) => fieldsContainer.appendChild(renderField(field)));

  asideNumber.textContent = String(screen.stage).padStart(2, '0');
  asideTitle.textContent = stageInfo.name;
  asideDescription.textContent = stageInfo.description;
  stageCounter.textContent = `Этап ${String(screen.stage).padStart(2, '0')} / ${String(TOTAL_STAGES).padStart(2, '0')}`;

  const progress = ((idx + 1) / SCREENS.length) * 100;
  progressFill.style.width = `${progress}%`;

  backBtn.disabled = idx === 0;
  nextBtn.textContent = idx === SCREENS.length - 1 ? 'Отправить бриф' : 'Далее';

  updateNextButtonState();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function updateNextButtonState() {
  const screen = SCREENS[state.currentIndex];
  const isLast = state.currentIndex === SCREENS.length - 1;
  if (!isLast) { nextBtn.disabled = false; return; }
  const consentField = screen.fields.find((f) => f.type === 'consent');
  nextBtn.disabled = consentField ? !state.answers[consentField.id] : false;
}

function goToScreen(idx) {
  state.currentIndex = Math.max(0, Math.min(idx, SCREENS.length - 1));
  renderScreen(state.currentIndex);
  scheduleDraftSave();
}

// ------------------------------------------------------------
// Валидация
// ------------------------------------------------------------
function isFieldEmpty(field) {
  const v = state.answers[field.id];
  if (field.type === 'consent') return !v;
  if (field.type === 'checkboxGroup') return !Array.isArray(v) || v.length === 0;
  if (typeof v === 'string') return v.trim() === '';
  return v === undefined || v === null;
}

// Возвращает id первого невалидного обязательного поля на экране, либо null
function validateScreen(idx) {
  const screen = SCREENS[idx];
  let firstInvalid = null;
  screen.fields.forEach((field) => {
    if (!field.required) return;
    const wrap = fieldsContainer.querySelector(`[data-field-id="${field.id}"]`);
    if (isFieldEmpty(field)) {
      if (wrap) wrap.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = field.id;
    } else if (wrap) {
      wrap.classList.remove('is-invalid');
    }
  });
  return firstInvalid;
}

// Проверяет вообще все обязательные поля во всех экранах.
// Возвращает { screenIndex, fieldId } первого невалидного, либо null.
function validateAll() {
  for (let i = 0; i < SCREENS.length; i++) {
    const screen = SCREENS[i];
    for (const field of screen.fields) {
      if (field.required && isFieldEmpty(field)) {
        return { screenIndex: i, fieldId: field.id };
      }
    }
  }
  return null;
}

// ============================================================
// ЧЕРНОВИК (localStorage)
// ============================================================
let draftSaveTimer = null;
function scheduleDraftSave() {
  clearTimeout(draftSaveTimer);
  draftSaveTimer = setTimeout(saveDraft, 400);
}

function saveDraft() {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      answers: state.answers,
      currentIndex: state.currentIndex,
      savedAt: Date.now(),
    }));
  } catch (e) {
    console.warn('Не удалось сохранить черновик:', e);
  }
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function hasAnyAnswer(answers) {
  return Object.values(answers || {}).some((v) => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'string') return v.trim() !== '';
    return !!v;
  });
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch (e) { /* игнорируем */ }
}

// ============================================================
// ФОРМАТИРОВАНИЕ ОТВЕТОВ (для скачивания и для отправки)
// ============================================================
function formatAnswerValue(field) {
  const v = state.answers[field.id];
  if (field.type === 'checkboxGroup') {
    if (!Array.isArray(v) || v.length === 0) return '';
    return v.map((val) => (field.options.find((o) => o.value === val) || {}).label || val).join(', ');
  }
  if (field.type === 'radio') {
    if (!v) return '';
    return (field.options.find((o) => o.value === v) || {}).label || v;
  }
  if (field.type === 'consent') return v ? 'Да' : '';
  return (v || '').toString().trim();
}

// Собирает ответы в структурированный вид: по этапам, с подписями вопросов.
// Этим же объектом пользуются и скачивание файла, и отправка в Telegram —
// Worker ничего не знает про порядок и формулировки вопросов, только
// показывает то, что прислал клиент. Так вопросы можно менять только здесь.
function buildStructuredPayload() {
  const stages = STAGES.map((stageInfo) => {
    const screensOfStage = SCREENS.filter((s) => s.stage === stageInfo.number);
    const items = [];
    screensOfStage.forEach((screen) => {
      screen.fields.forEach((field) => {
        if (field.type === 'consent') return; // согласие в отчёт не выводим
        const value = formatAnswerValue(field);
        if (!value) return;
        items.push({ label: field.label, value, important: !!field.important });
      });
    });
    return { number: stageInfo.number, name: stageInfo.name, items };
  }).filter((s) => s.items.length > 0);

  return {
    submittedAt: new Date().toISOString(),
    contactName: (state.answers.contact_name || '').toString().trim(),
    contactInfo: (state.answers.contact_info || '').toString().trim(),
    companyName: (state.answers.company_name || '').toString().trim(),
    deadline: (state.answers.desired_deadline || '').toString().trim(),
    mainAction: (state.answers.main_action || '').toString().trim(),
    stages,
  };
}

function buildAnswersReport() {
  const data = buildStructuredPayload();
  const lines = [];
  lines.push('БРИФ НА РАЗРАБОТКУ САЙТА');
  lines.push(`Дата: ${new Date().toLocaleString('ru-RU')}`);
  lines.push(`Контакт: ${data.contactName || '—'} · ${data.contactInfo || '—'}`);
  lines.push('');
  data.stages.forEach((stage) => {
    lines.push(`— ${String(stage.number).padStart(2, '0')} · ${stage.name.toUpperCase()} —`);
    lines.push(stage.items.map((it) => `${it.label}\n${it.value}`).join('\n\n'));
    lines.push('');
  });
  if (state.files.length) {
    lines.push('— ПРИЛОЖЕННЫЕ ФАЙЛЫ —');
    lines.push(state.files.map((f) => `${f.name} (${humanFileSize(f.size)})`).join('\n'));
  }
  return lines.join('\n');
}

function downloadReport() {
  const text = buildAnswersReport();
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const namePart = (state.answers.contact_name || 'бриф').toString().trim().replace(/[^\p{L}\p{N}]+/gu, '_');
  a.href = url;
  a.download = `бриф_${namePart || 'ответы'}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ============================================================
// ОТПРАВКА
// ============================================================
async function submitBrief() {
  const endpoint = (typeof BRIEF_ENDPOINT_URL === 'string') ? BRIEF_ENDPOINT_URL.trim() : '';

  // Сохраняем полный отчёт локально в любом случае — до сетевого запроса.
  try {
    localStorage.setItem(LAST_SUBMISSION_KEY, JSON.stringify({
      answers: state.answers,
      savedAt: Date.now(),
    }));
  } catch (e) { /* игнорируем — сеть/скачивание всё равно отработают */ }

  if (endpoint) {
    try {
      const formData = new FormData();
      formData.append('payload', JSON.stringify(buildStructuredPayload()));
      state.files.forEach((item) => formData.append('files', item.file, item.name));
      await fetch(endpoint, { method: 'POST', body: formData });
    } catch (e) {
      console.warn('Не удалось отправить бриф в Telegram, но ответы сохранены локально:', e);
    }
  }

  clearDraft();
  showThanksScreen();
}

function showThanksScreen() {
  screenForm.hidden = true;
  screenThanks.hidden = false;
  const username = (typeof MY_TELEGRAM_USERNAME === 'string') ? MY_TELEGRAM_USERNAME.trim() : '';
  telegramLink.href = username ? `https://t.me/${username}` : '#';
  if (!username) telegramLink.style.display = 'none';
}

// Сброс — на случай, если нужно заполнить ещё один бриф (например, для второго сайта).
function restartBrief() {
  state.answers = {};
  state.files = [];
  state.currentIndex = 0;
  clearDraft();
  screenThanks.hidden = true;
  screenForm.hidden = false;
  renderScreen(0);
}

// ============================================================
// ОБРАБОТЧИКИ
// ============================================================
startBtn.addEventListener('click', () => {
  screenIntro.hidden = true;
  screenForm.hidden = false;
  renderScreen(state.currentIndex);
});

backBtn.addEventListener('click', () => {
  if (state.currentIndex > 0) goToScreen(state.currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  const isLast = state.currentIndex === SCREENS.length - 1;

  const invalidId = validateScreen(state.currentIndex);
  if (invalidId) {
    const wrap = fieldsContainer.querySelector(`[data-field-id="${invalidId}"]`);
    if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Заполните, пожалуйста, обязательные поля');
    return;
  }

  if (isLast) {
    const problem = validateAll();
    if (problem) {
      goToScreen(problem.screenIndex);
      requestAnimationFrame(() => {
        const wrap = fieldsContainer.querySelector(`[data-field-id="${problem.fieldId}"]`);
        if (wrap) {
          wrap.classList.add('is-invalid');
          wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      showToast('Осталось заполнить ещё пару обязательных полей');
      return;
    }
    nextBtn.disabled = true;
    nextBtn.textContent = 'Отправляем…';
    submitBrief();
    return;
  }

  goToScreen(state.currentIndex + 1);
});

downloadBtn.addEventListener('click', downloadReport);
restartBtn.addEventListener('click', restartBrief);

// ============================================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================================
(function init() {
  const draft = loadDraft();
  if (draft && hasAnyAnswer(draft.answers)) {
    state.answers = draft.answers || {};
    state.currentIndex = Math.min(draft.currentIndex || 0, SCREENS.length - 1);
    screenIntro.hidden = true;
    screenForm.hidden = false;
    renderScreen(state.currentIndex);
    showToast('Черновик восстановлен');
  }
})();
