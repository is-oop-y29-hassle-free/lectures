const { md, esc, icon, box, mono, small, bullets, srcBook, srcBookShort, srcCourse } = S;
// ===== Block 3 =====
S.block(3);
S.sep({ t: 'Строитель', label: '3 · Строитель' });
S.A({ n: 38, t: 'Строитель' });
S.C({ n: 39, t: 'Абстракция над конструктором', key: 'строитель настраивает аргументы, которые уйдут в конструктор.',
  items: ['Как и любой порождающий паттерн — абстракция над конструктором'], course: true });
{
  const sigs = ['Pizza(int size, bool cheese, bool pepperoni, bool tomato, bool bacon)', 'Pizza(int size, bool cheese, bool pepperoni, bool tomato)', 'Pizza(int size, bool cheese, bool pepperoni)', 'Pizza(int size, bool cheese)', 'Pizza(int size)'];
  const cw = 16.8, sp = 80, x0 = 32, top = 40;
  const end0 = x0 + sigs[0].length * cw;
  let paths = '';
  for (let i = 1; i < 5; i++) {
    const y = top + i * sp, X = end0 + 40 + i * 40, e = x0 + sigs[i].length * cw + 18;
    paths += `<path d="M${e} ${y} H${X} V${top + 22}"></path><polygon points="${X},${top + 12} ${X - 10},${top + 32} ${X + 10},${top + 32}" fill="var(--ac)" stroke="none"></polygon>`;
  }
  const lines = sigs.map((s, i) => `<div style="position:absolute;left:${x0}px;top:${top + i * sp - 20}px;height:40px;font-family:var(--mono);font-size:28px;line-height:40px;white-space:nowrap;${i === 0 ? 'font-weight:600' : ''}"><span>${esc(s)}</span></div>`).join('');
  S.D({ n: 40, t: 'Телескопический конструктор', key: 'десять конструкторов, каждый передаёт вызов главному со значениями по умолчанию.', mt: 48, body:
`<div style="position:relative;width:1460px;height:420px;background:var(--code);border-radius:20px"><svg width="1460" height="420" viewBox="0 0 1460 420" style="position:absolute;left:0;top:0" fill="none" stroke="var(--ac)" stroke-width="3">${paths}</svg>${lines}</div>
<div style="margin-top:32px;max-width:1460px">${srcBookShort('такого монстра можно создать только в языках с перегрузкой — например, в C# (книга, с. 113)')}</div>` });
}
S.A({ n: 41, t: 'Параметр и аргумент', layout: 'codes' });
S.C({ n: 42, t: 'Главная идея', key: 'отделение логики агрегации аргументов от самой логики создания объектов.', keyBig: true, course: true });
S.C({ n: 43, t: 'Зачем строитель, 1', key: 'объект остаётся неизменяемым, даже когда аргументов много.',
  items: ['Нет мутабельности ради сбора данных', 'Проще валидация в конструкторе', 'Пошаговое создание'] });
S.C({ n: 44, t: 'Зачем строитель, 2', key: 'клиент не видит «битых» объектов — строитель не отдаёт объект, пока тот не готов (книга, с. 115).',
  items: ['Значения по умолчанию — внутри строителя', 'Разные типы — общими вызовами строителя', 'Do 3, Do 10'] });
S.C({ n: 45, t: 'Главное правило реализации', key: 'строитель ни в какой момент не хранит готовый объект собираемого типа.', keyBig: true,
  items: ['Атрибуты строителя повторяют параметры конструктора', 'Иначе в объект встраивается мутабельность ради строителя', 'Это самая частая ошибка — вернёмся к ней'] });
{
  const card = (name, rows) => `<div style="border:3px solid var(--ink);border-radius:28px;padding:40px 44px;display:flex;flex-direction:column;gap:24px"><div style="font-size:44px;font-weight:700;font-family:var(--sans)"><span>${name}</span></div>${rows.map(([k, v]) => `<div style="display:flex;flex-direction:column;gap:6px"><div style="font-size:24px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink2)"><span>${k}</span></div><div style="font-size:32px;line-height:1.3"><span>${v}</span></div></div>`).join('')}</div>`;
  S.D({ n: 46, t: 'Два вида строителей', key: 'различаются тем, где живёт валидация.', body:
`<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px;max-width:1600px">${card('Convenience', [['валидация', 'в конструкторе создаваемого типа'], ['строитель', 'снаружи']])}${card('Stateful Constructor', [['валидация', 'в строителе'], ['строитель', 'вложенный, конструктор модели приватный']])}</div>` });
}
S.C({ n: 47, t: 'Convenience builder', key: 'упрощает создание объектов с большими конструкторами.',
  items: ['Можно определить отдельно от типа', 'Только тривиальная валидация', 'Вся настоящая валидация — в конструкторе создаваемого типа'] });
S.B({ n: 48, t: 'Convenience: тип и начало строителя', key: 'значения по умолчанию — в конструкторе строителя.',
  hl: [['_one = null;', 'ac'], ['_two = new Dependency2();', 'ac'], ['_three = new Dependency3();', 'ac']],
  cpp: '`IDependency1?` — ссылка, которая может быть `null`; компилятор это отслеживает.' });
S.B({ n: 49, t: 'Convenience: шаги и `Build`', key: '`Build` вызывает конструктор, а не заполняет готовый объект.', cont: true,
  hl: [['return new Service(', 'ac']], side: ['`InvalidOperationException` — глупое исключение по лекции 4: строитель используют неправильно'],
  cpp: '`x ?? throw …` — «если `null`, бросить»; `return this` — для цепочки вызовов.' });
S.C({ n: 50, t: 'Stateful Constructor builder', key: 'конструктор с состоянием — когда данные собираются по шагам.',
  items: ['Пример: коллекция, значения которой приходят из разных мест (разные View в UI)', 'Валидация — в строителе', 'Обычно — для моделей'] });
S.C({ n: 51, t: 'Модель нельзя создать в обход строителя', key: 'раз валидация в строителе, конструктор модели должен быть недоступен снаружи.',
  items: ['Иначе валидацию придётся дублировать', 'Решение: строитель — вложенный класс', 'Конструктор модели — приватный'] });
S.B({ n: 52, t: 'Stateful: код', key: '`Build` передаёт в модель копию списка.', half: 1,
  hl: [['private Model(', 'ac']], cpp: 'вложенный класс видит приватные члены внешнего — как вложенный класс в C++.' });
S.B({ n: 52, t: 'Stateful: код', key: '`Build` передаёт в модель копию списка.', cont: true, half: 2,
  hl: [['_data.ToArray()', 'ac']], side: ['Без `ToArray()` модель и строитель делят один `List` — `AddData` после `Build` изменит готовую модель'] });
S.B({ n: 53, t: 'Как это вызывают', key: 'статическое свойство создаёт новый строитель при каждом обращении.',
  side: ['Статика — допустимое исключение из Do 7', 'Оставьте комментарий, почему здесь она лучше'] });
S.C({ n: 54, t: 'Смешение строителей', key: 'строитель стал смесью Convenience и Stateful — в типе слишком много зависимостей.',
  items: ['Выделите пошаговую часть в отдельную модель со своим строителем', 'Реализация строителя зависит от типа — **не наоборот**', 'В рамках лаб такое разделение валидно'] });
S.C({ n: 55, t: 'Полиморфизм строителей', key: 'полиморфные строители в реальности редкость — обычно строитель пишется для одного типа.',
  items: ['Книга показывает их прямо в определении: „разные представления объектов“', 'Не закладывайте абстракцию строителя заранее', 'YAGNI, Do 21'] });
S.B({ n: 56, t: 'Шаблонная ошибка', key: 'строитель хранит созданный объект — это первое, что проверят на защите.', warn: true, lab: true,
  hl: [['private Model _model = new Model();', 'wr'], ['public void AddValue', 'wr']] });
S.C({ n: 57, t: 'Почему это плохо', key: 'в модель вносится мутабельность ради строителя — Do 10.',
  items: ['Строитель — примитивный посредник', 'Код изменения модели дублируется', 'Логика инициализации всё равно в модели — разделение теряет смысл'] });
S.F({ n: 58, t: 'Книга и курс: строитель с готовым продуктом', key: 'откроете книгу — увидите именно такую реализацию.', page: 'с. 110–111', lab: true,
  book: ['`CarBuilder` хранит поле `car: Car`; `reset()` кладёт новый автомобиль; `setSeats`, `setEngine` меняют его', 'Почему так: полиморфные строители собирают разные продукты — автомобиль и руководство; псевдокод, без требования неизменяемости'],
  course: ['Модели неизменяемые — Do 10, ЛР1', 'Строитель, меняющий готовый объект, требует от модели сеттеров'],
  rule: 'Идею берём из книги, реализацию — по правилу: строитель хранит аргументы и создаёт объект один раз в `Build()`.' });
S.A({ n: 59, t: 'Директор', sub: 'По книге там же: отдельный класс директора не является строго обязательным.' });
S.B({ n: 60, t: 'Директор в C# — метод расширения', key: 'директор — набор сценариев использования строителя; отдельный объект не нужен.',
  side: ['Полиморфизм — на уровне строителя'], sideCourse: true,
  cpp: '`this ServiceBuilder builder` — метод расширения: вызывается как `builder.WithDefaultDependencies()`. В C# 14 есть и блоки `extension`.' });
S.C({ n: 61, t: 'Как сделать аргумент обязательным?', key: 'чтобы без него не компилировалось — а не через документацию.',
  items: ['„Обязательно вызовите `WithX`“ в README не работает'] });
S.C({ n: 62, t: 'Наивное решение', key: 'обязательные параметры — в конструктор строителя.',
  items: ['Просто', 'Но это снова вызов конструктора, а не fluent-API', 'С ростом числа параметров сильно выделяется'] });
{
  const bx = (t, acc) => `<div style="border:${acc ? '4px solid var(--ac);background:var(--ac-t)' : '3px solid var(--ink);background:#fff'};border-radius:16px;height:76px;padding:0 28px;display:flex;align-items:center;font-family:var(--mono);font-size:30px;box-sizing:border-box;${acc ? 'color:var(--ac);font-weight:600' : ''}"><span>${t}</span></div>`;
  const conn = t => `<div style="height:64px;display:flex;align-items:stretch;gap:24px;padding-left:60px"><div style="width:3px;background:var(--ink);position:relative"><div style="position:absolute;bottom:-2px;left:-9px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:16px solid var(--ink)"></div></div><div style="display:flex;align-items:center;font-family:var(--mono);font-size:28px;color:var(--ink2)"><span>${t}</span></div></div>`;
  S.D({ n: 63, t: 'Interface Driven Builder', key: 'каждый метод возвращает интерфейс следующего шага.', mt: 40,
    caps: ['Последний интерфейс — необязательные аргументы и создание'], body:
`<div style="display:flex;flex-direction:column;width:640px">${bx('Email.Builder')}${conn('')}${bx('IAddressBuilder')}${conn('WithAddress')}${bx('ISubjectBuilder')}${conn('WithSubject')}<div style="display:flex;align-items:center;gap:24px">${bx('IEmailBuilder', 1)}<div style="display:flex;align-items:center;gap:12px;font-family:var(--mono);font-size:28px;color:var(--ac);white-space:nowrap">${icon('loop', 36, 'var(--ac)')}<span>WithBody</span></div></div>${conn('Build')}${bx('Email')}</div>` });
}
S.B({ n: 64, t: 'Интерфейсы шагов', key: 'обязательные аргументы — по интерфейсу на каждый.' });
S.B({ n: 65, t: 'Модель', key: 'конструктор приватный, точка входа — статическое свойство.',
  hl: [['private Email(', 'ac'], ['public static IAddressBuilder Builder', 'ac']] });
S.B({ n: 66, t: 'Строитель внутри', key: 'один класс реализует все три интерфейса.', cont: true, half: 1 });
S.B({ n: 66, t: 'Строитель внутри', key: 'один класс реализует все три интерфейса.', cont: true, half: 2,
  side: ['`?? throw` — страховка, недостижимая через интерфейсы', '`!` вместо неё нельзя — Don\'t 18'] });
S.B({ n: 67, t: 'Без адреса не скомпилируется', key: '`Build` недоступен, пока не заданы оба обязательных аргумента.',
  side: ['После `Builder` — только `WithAddress`', 'Лекция 4: make illegal states unrepresentable — непредставима последовательность вызовов'] });
S.E({ n: 68, lab: true, q: 'Какой строитель нужен вашей модели — Convenience или Stateful? Где у вас будет валидация?' });
