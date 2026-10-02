const { md, esc, icon, box, mono, small, bullets, srcBook, srcBookShort, srcCourse } = S;
// ===== Block 0 =====
S.block(0);
S.title();
S.C({ n: 2, t: 'Основной референс', key: 'все паттерны курса читаем по одной книге.',
  items: ['А. Швец, «Погружение в паттерны проектирования», Refactoring.Guru, 2018', 'Веб-версия с примерами на C#: refactoring.guru/ru/design-patterns'],
  right: `<div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start"><image-slot id="qr-ref-site" shape="rounded" radius="24" placeholder="QR-код на сайт (вставит лектор)" style="width:420px;height:420px;border:3px dashed #8A8A8A;border-radius:24px;box-sizing:border-box"></image-slot></div>` });
S.A({ n: 3, t: 'Что такое паттерн' });
S.D({ n: 4, t: 'Паттерн — чертёж, а не рецепт', key: 'паттерн не копируют в код — его подстраивают под свою программу.', body:
  `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px;max-width:1500px">
<div style="border:3px solid #A8A8A8;border-radius:28px;padding:44px 48px;display:flex;flex-direction:column;gap:18px"><div style="font-size:44px;font-weight:700"><span>Алгоритм</span></div><div style="font-size:34px;line-height:1.35"><span>кулинарный рецепт: чёткие шаги</span></div></div>
<div style="border:4px solid var(--ac);border-radius:28px;padding:44px 48px;display:flex;flex-direction:column;gap:18px"><div style="font-size:44px;font-weight:700;color:var(--ac)"><span>Паттерн</span></div><div style="font-size:34px;line-height:1.35"><span>инженерный чертёж: решение нарисовано, шаги — нет</span></div></div>
</div><div style="margin-top:28px">${srcBookShort('аналогия А. Швеца, с. 23')}</div>` });
S.C({ n: 5, t: 'Gang of Four', key: '23 паттерна объектно-ориентированного дизайна в одной книге.',
  items: ['Эрих Гамма, Ричард Хелм, Ральф Джонсон, Джон Влиссидес', '*Design Patterns: Elements of Reusable Object-Oriented Software*', 'По-русски: «Приёмы объектно-ориентированного проектирования. Паттерны проектирования»'] });
S.C({ n: 6, t: 'Зачем знать паттерны', key: 'нашли паттерн в коде — быстро получили больше информации о коде.',
  items: ['Стандартные решения проще поддерживать: понятнее чужой код', 'Паттерн виден по неймингу: `PaymentFactory`, `EmailBuilder`', 'Знание применимости ускоряет поиск решения'] });
S.A({ n: 7, t: 'Три категории', layout: 'row', lab: true,
  under: `<div style="font-size:var(--t-body);line-height:1.35"><span style="color:var(--ac);font-weight:700">Порождающие — сегодня и ЛР3</span><span> · структурные — ЛР2 · поведенческие — ЛР4</span></div>` });
S.A({ n: 8, t: 'Порождающие паттерны', sub: 'Формулировкой курса: отделяют абстракцией логику создания объектов от логики, эти объекты использующей' });
S.D({ n: 9, t: 'Пять паттернов — пять ситуаций', key: 'каждый паттерн отвечает на свою ситуацию создания объекта.', mt: 72, body:
  `<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:20px;row-gap:28px">
${['Фабричный метод', 'Фабрика', 'Строитель', 'Прототип', 'Одиночка'].map(p => `<div style="height:120px;border-radius:28px;background:var(--ac);color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700"><span>${p}</span></div>`).join('')}
<div style="grid-column:span 2;border-top:4px solid var(--ac);padding-top:24px;font-size:32px;line-height:1.3;text-align:center"><span>создаваемый тип меняется</span></div>
<div style="border-top:4px solid var(--ac);padding-top:24px;font-size:32px;line-height:1.3;text-align:center"><span>аргументов много или они собираются по шагам</span></div>
<div style="border-top:4px solid var(--ac);padding-top:24px;font-size:32px;line-height:1.3;text-align:center"><span>нужна копия</span></div>
<div style="border-top:4px solid var(--ac);padding-top:24px;font-size:32px;line-height:1.3;text-align:center"><span>нужен ровно один объект</span></div>
</div>` });
S.C({ n: 10, t: 'Создание — место, где проверяется инвариант', key: 'порождающие паттерны — способы не потерять гарантию корректности, когда создание усложняется.',
  items: ['Лекция 1: конструктор приводит объект в безопасное состояние', 'Лекция 3: паттерн — готовый ответ на „кто за что отвечает“', 'Каждый паттерн проверяем: какую ответственность отделяет, не нарушает ли SOLID'] });

// ===== Block 1 =====
S.block(1);
S.sep({ t: 'Фабричный метод', sub: 'и почему курс считает его почти антипаттерном', label: '1 · Фабричный метод' });
S.A({ n: 12, t: 'Фабричный метод', sub: 'Также известен как „Виртуальный конструктор“' });
S.C({ n: 13, t: 'Когда применим', key: 'сценарий одинаковый — различаются только типы создаваемых в нём объектов.',
  items: ['Вместо дублирования сценария', 'Создание выносится в абстрактный метод', 'Его реализуют наследники'], course: true });
{
  const B = (x, y, w, h, inner, st = '') => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:3px solid var(--ink);border-radius:16px;background:#fff;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:0 28px;gap:6px;${st}">${inner}</div>`;
  const nm = (t, st = '') => `<div style="font-size:32px;font-weight:700;${st}"><span>${t}</span></div>`;
  const ster = t => `<div style="font-size:24px;color:var(--ink2)"><span>${t}</span></div>`;
  const svg = `<svg width="1720" height="560" viewBox="0 0 1720 560" style="position:absolute;left:0;top:0" fill="none" stroke="var(--ink)" stroke-width="3">
<path d="M60 199 V490 M60 330 H120 M60 490 H120"></path><polygon points="60,172 46,199 74,199" fill="#fff"></polygon>
<path d="M1660 199 V490 M1660 330 H1600 M1660 490 H1600"></path><polygon points="1660,172 1646,199 1674,199" fill="#fff"></polygon>
<path d="M640 330 H1062 M640 490 H1062" stroke-dasharray="12 10" stroke="var(--ac)"></path>
<polygon points="1080,330 1058,318 1058,342" fill="var(--ac)" stroke="none"></polygon><polygon points="1080,490 1058,478 1058,502" fill="var(--ac)" stroke="none"></polygon>
</svg>`;
  const lbl = y => `<div style="position:absolute;left:640px;width:440px;top:${y}px;text-align:center;font-size:26px;color:var(--ac);font-weight:600"><span>создаёт</span></div>`;
  S.D({ n: 14, t: 'Структура', key: 'две иерархии — создатели и продукты.', mt: 48, body:
`<div style="position:relative;width:1720px;height:560px">${svg}
${B(0, 0, 560, 172, ster('абстрактный класс') + nm('Создатель') + `<div style="font-size:28px;font-style:italic;font-family:var(--mono);border-top:2px solid var(--ln);padding-top:8px;margin-top:4px"><span>createProduct(): Продукт</span></div>`)}
${B(120, 280, 520, 100, nm('Конкретный создатель A', 'font-size:30px'))}${B(120, 440, 520, 100, nm('Конкретный создатель B', 'font-size:30px'))}
${B(1160, 0, 560, 172, ster('интерфейс') + nm('Продукт'))}
${B(1080, 280, 520, 100, nm('Конкретный продукт A', 'font-size:30px'))}${B(1080, 440, 520, 100, nm('Конкретный продукт B', 'font-size:30px'))}
${lbl(286)}${lbl(446)}</div>` });
}
S.A({ n: 15, t: 'Роли', layout: 'stack' });
S.C({ n: 16, t: 'Создание — не главная функция создателя', key: 'обычно создатель содержит и другой код работы с продуктом (по книге, с. 74).',
  items: ['Запомните эту фразу', 'На ней держится критика паттерна дальше'] });
{
  const st = (t, s = '') => `<div style="border:3px solid var(--ink);border-radius:16px;padding:22px 30px;font-size:32px;line-height:1.25;background:#fff;${s}"><span>${t}</span></div>`;
  const ar = icon('arrow', 44, 'var(--ink)');
  const row = (lab, inner) => `<div style="display:grid;grid-template-columns:200px minmax(0,1fr);gap:32px;align-items:center"><div style="font-size:34px;font-weight:700;color:var(--ink2)"><span>${lab}</span></div><div style="display:flex;align-items:center;gap:24px">${inner}</div></div>`;
  S.D({ n: 17, t: 'Задача: платежи в магазине', key: 'логика расчёта не изменилась, но банковскому платежу нужен счёт получателя.', coin: true, mt: 72, body:
`<div style="display:flex;flex-direction:column;gap:56px">${row('Было', st('расчёт') + ar + st('платёж наличными'))}${row('Стало', st('расчёт') + ar + `<div style="display:flex;align-items:center;gap:20px">${st('платёж наличными')}<span style="font-size:40px;color:var(--ink2)">|</span><div style="border:4px solid var(--ac);border-radius:16px;padding:18px 30px;font-size:32px;line-height:1.25;display:flex;flex-direction:column;gap:4px"><span>банковский платёж</span><span style="color:var(--ac);font-weight:700">+ счёт получателя</span></div></div>`)}</div>` });
}
S.B({ n: 18, t: 'Продукты', key: 'общий интерфейс продукта и две реализации.', coin: true,
  cpp: '`record CashPayment(decimal Amount) : IPayment` — позиционный `record` реализует интерфейс своим свойством `Amount`.' });
S.B({ n: 19, t: 'Создатели', key: '`Calculate` не знает, откуда берутся недостающие данные.', coin: true,
  hl: [['protected abstract IPayment CreatePayment(decimal amount);', 'ac']],
  side: ['Счёт получателя — в конструктор наследника', '`order.TotalCost` — Information Expert, лекция 3'],
  cpp: '`protected abstract` — чисто виртуальный метод, видимый только наследникам.' });
S.A({ n: 20, t: 'Что пишет книга', key: 'у книги четыре плюса и один минус.',
  left: bullets(['избавляет от привязки к конкретным продуктам', 'код производства в одном месте', 'проще добавлять продукты', 'реализует OCP'], { kind: 'check', size: '30px', gap: '20px' }) + srcBook(82) });
{
  const bx = (x, y, w, t, warn) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:90px;border:${warn ? '4px solid var(--wr)' : '3px solid var(--ink)'};border-radius:16px;background:${warn ? 'var(--wr-t)' : '#fff'};box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:25px;${warn ? 'color:var(--wr);font-weight:600' : ''}"><span>${t}</span></div>`;
  const svg = `<svg width="1720" height="560" viewBox="0 0 1720 560" style="position:absolute;left:0;top:0" fill="none" stroke="var(--ink)" stroke-width="3">
<path d="M860 117 V170 M200 170 H1520 M200 170 V250 M630 170 V250 M1095 170 V250 M1520 170 V250"></path><polygon points="860,90 846,117 874,117" fill="#fff"></polygon>
<path d="M1095 340 V420 H200 V362" stroke="var(--wr)" stroke-dasharray="12 10"></path><polygon points="200,342 188,366 212,366" fill="var(--wr)" stroke="none"></polygon>
<path d="M622 392 L678 448 M678 392 L622 448" stroke="var(--wr)" stroke-width="7"></path>
</svg>`;
  S.D({ n: 21, t: 'Акция «Всё по N рублей»', key: 'каждый новый способ расчёта × каждый вид платежа = новый класс.', coin: true, mt: 48, body:
`<div style="position:relative;width:1720px;height:560px">${svg}${bx(610, 0, 500, 'PaymentCalculator')}${bx(0, 250, 400, 'CashPaymentCalculator')}${bx(430, 250, 400, 'BankPaymentCalculator')}${bx(880, 250, 430, 'FixedPriceCashCalculator', 1)}${bx(1320, 250, 400, 'FixedPriceBankCalculator', 1)}
<div style="position:absolute;left:720px;top:434px;font-size:28px;color:var(--ink)"><span>переиспользовать создание платежа</span></div>
<div style="position:absolute;left:0;right:0;top:500px;display:flex;justify-content:center;align-items:center;gap:14px;font-size:32px;font-weight:700;color:var(--wr)">${icon('warn', 38, 'var(--wr)')}<span>наследоваться от двух классов в C# нельзя</span></div></div>` });
}
S.C({ n: 22, t: 'Неявное нарушение SRP', key: 'код разнесён по файлам, но объект-наследник отвечает за два шага сразу.',
  items: ['Шаг 1 — операция расчёта', 'Шаг 2 — выбор создаваемого типа', 'Проблемы с переиспользованием создания — признак, что SRP нарушен'] });
S.F({ n: 23, t: 'Книга и курс расходятся в оценке', key: 'книга показывает паттерн; решение о применимости — ваше.', page: 'с. 83',
  book: ['Нормальный паттерн с одним минусом — параллельные иерархии', 'Многие архитектуры начинаются с него и эволюционируют к фабрике, прототипу или строителю'],
  course: ['Минус из книги — следствие наследования, не мелочь', 'Плюс неявное нарушение SRP', 'Почти антипаттерн. Don\'t 11; принцип из той же книги — „Предпочитайте композицию наследованию“, с. 44'],
  rule: 'Фабричный метод без обоснования — вопрос „почему не фабрика?“ „Так в книге“ — не обоснование.' });
S.E({ n: 24, lab: true, q: 'Как добавить акцию „Всё по N рублей“, не создавая новую иерархию калькуляторов?', hint: 'Калькулятор *является* создателем платежей — или *содержит* его?' });

// ===== Block 2 =====
S.block(2);
S.sep({ t: 'Фабрика', sub: 'композиция вместо наследования', label: '2 · Фабрика' });
S.A({ n: 26, t: '«Является» и «содержит»', sub: 'Калькулятор не является создателем платежей — он содержит фабрику платежей.' });
S.A({ n: 27, t: 'Абстрактная фабрика' });
S.A({ n: 28, t: 'Методы абстрактной фабрики' });
{
  const cols = ['Кресло', 'Диван', 'Столик'], rows = ['Ар-деко', 'Викторианский', 'Модерн'];
  const cell = (hl) => `<div style="height:96px;display:flex;align-items:center;justify-content:center;${hl ? 'background:var(--ac-t)' : ''};border-top:2px solid var(--ln)"><span style="width:40px;height:40px;border-radius:13px;background:${hl ? 'var(--ac)' : '#9A9A9A'}"></span></div>`;
  let g = `<div style="display:grid;grid-template-columns:300px repeat(3,220px) 380px;align-items:center">`;
  g += `<div></div>${cols.map(c => `<div style="font-size:32px;font-weight:700;text-align:center;padding-bottom:16px"><span>${c}</span></div>`).join('')}<div></div>`;
  rows.forEach((r, i) => { const hl = i === 2; g += `<div style="height:96px;display:flex;align-items:center;font-size:32px;font-weight:${hl ? 700 : 500};color:${hl ? 'var(--ac)' : 'var(--ink)'};border-top:2px solid var(--ln);${hl ? 'background:var(--ac-t);padding-left:20px;box-shadow:inset 8px 0 0 var(--ac)' : 'padding-left:20px'}"><span>${r}</span></div>${cols.map(() => cell(hl)).join('')}<div style="padding-left:32px;font-size:28px;color:var(--ac);font-weight:600;line-height:1.3">${hl ? '<span>фабрика „Модерн“ создаёт только эту строку</span>' : ''}</div>`; });
  g += `</div>`;
  S.D({ n: 29, t: 'Ключевое слово — семейство', key: 'продукты одной фабрики гарантированно сочетаются.', body: g + `<div style="margin-top:28px">${srcBookShort('пример из книги А. Швеца')}</div>` });
}
S.C({ n: 30, t: 'Фабрика на курсе', key: 'наш пример с платежами — фабрика с одним продуктом.', coin: true,
  items: ['Формулировкой курса: интерфейс из одного и более фабричных методов', 'Реализации создают разные типы — или один тип по-разному', 'Абстрактной по книге станет, когда появится семейство: платёж + чек + уведомление'] });
S.B({ n: 31, t: 'Фабрики платежей', key: 'создание платежа — отдельные независимые типы.', coin: true, hl: [['IPaymentFactory', 'ac']] });
S.B({ n: 32, t: 'Калькуляторы содержат фабрику', key: 'фабрика приходит в конструктор — Do 13, DIP.', coin: true, half: 1, hl: [['private readonly IPaymentFactory _paymentFactory;', 'ac']] });
S.B({ n: 32, t: 'Калькуляторы содержат фабрику', key: 'фабрика приходит в конструктор — Do 13, DIP.', coin: true, cont: true, half: 2, hl: [['private readonly IPaymentFactory _paymentFactory;', 'ac']] });
{
  const ck = `<div style="height:120px;display:flex;align-items:center;justify-content:center;border:3px solid var(--ln);border-radius:20px;background:#fff">${icon('check', 60, 'var(--ac)')}</div>`;
  const hd = t => `<div style="font-size:32px;font-weight:700;text-align:center"><span>${t}</span></div>`;
  const rh = t => `<div style="font-size:32px;font-weight:600"><span>${t}</span></div>`;
  S.D({ n: 33, t: '2 + 2 вместо 2 × 2', key: 'способ расчёта и способ создания платежа — независимые оси.', coin: true,
    caps: ['Новый способ расчёта — +1 класс', 'Новый вид платежа — +1 класс'], body:
`<div style="display:grid;grid-template-columns:380px 260px 260px;gap:20px;align-items:center"><div></div>${hd('Наличные')}${hd('Банк')}${rh('Обычная цена')}${ck}${ck}${rh('Фиксированная цена')}${ck}${ck}</div>
<div style="margin-top:32px;font-size:32px;font-weight:600"><span>классов: 2 калькулятора + 2 фабрики</span></div>
<div style="margin-top:28px;font-family:var(--mono);font-size:26px;background:var(--code);border-radius:16px;padding:18px 24px;display:inline-block"><span>new FixedPricePaymentCalculator(new BankPaymentFactory(account), 100m)</span></div>` });
}
S.F({ n: 34, t: 'Плюсы и минусы', key: 'книга и курс здесь согласны.', page: 'с. 97–98',
  book: ['Гарантирует сочетаемость продуктов', 'Избавляет от привязки к конкретным классам', 'Реализует OCP'], bookMinus: ['больше классов', 'все типы продуктов в каждой вариации'],
  course: ['SRP — каждый тип отвечает за одну операцию', 'OCP — новое через реализацию интерфейсов', 'DIP — калькулятор зависит от абстракции'],
  rule: 'Много фабричных методов в одном классе затуманивают его основную функцию (книга, с. 96) — выносите в фабрику.' });
S.C({ n: 35, t: '«Абстрактная» можно не говорить', key: 'на курсе говорим просто «фабрика» — разница не концептуальная.',
  items: ['Обе отделяют создание композицией', 'Но в книге и на защите не путать: „абстрактная“ у Швеца — про семейства'] });
S.E({ n: 36, lab: true, q: 'Где в вашей ЛР1 создаются объекты, тип которых зависит от условия?', hint: 'Не отвечаем сейчас — держите в голове к ЛР3.' });
