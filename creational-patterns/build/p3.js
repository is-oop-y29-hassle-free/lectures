const { md, esc, icon, box, mono, small, bullets, srcBook, srcBookShort, srcCourse } = S;
// ===== Block 4 =====
S.block(4);
S.sep({ t: 'Прототип', sub: 'и рекурсивные дженерики', label: '4 · Прототип' });
S.A({ n: 70, t: 'Прототип', sub: 'Также известен как „Клон“. Формулировкой курса: логика клонирования — внутри самих клонируемых объектов.' });
S.C({ n: 71, t: 'Скопировать «извне» не всегда возможно', key: 'часть состояния приватная, а копирующий код привязан к конкретному классу (книга, с. 119).',
  items: ['Объект, известный только по интерфейсу, так не скопировать', 'Аналогия книги (с. 122): деление клетки — оригинал сам участвует в создании копии'] });
S.C({ n: 72, t: 'Почему не вызвать конструктор', key: 'три причины по нарастающей.', kind: 'num',
  items: ['Дублирование вызовов — решается методом расширения', 'Данные сокрыты или преобразованы конструктором — лишние операции и аллокации', 'Объект в иерархии — без знания типа не вызвать нужный конструктор: единственный выход'] });
S.B({ n: 73, t: '`Clone` у типа-прототипа', key: 'клонирует тот, у кого есть все данные — Information Expert.' });
S.A({ n: 74, t: 'Единственный минус прототипа по книге', sub: 'Как именно сложно — в книге не разобрано. Дальше — формулировки курса.' });
{
  const nb = (x, y, w, t, acc) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:84px;border:${acc ? '4px solid var(--ac)' : '3px solid var(--ink)'};border-radius:16px;background:#fff;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:600;${acc ? 'color:var(--ac)' : ''}"><span>${t}</span></div>`;
  const head = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 22, W = 11; const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a); return `<path d="M${x1} ${y1} L${bx.toFixed(1)} ${by.toFixed(1)}"></path><polygon points="${x2},${y2} ${(bx - W * Math.sin(a)).toFixed(1)},${(by + W * Math.cos(a)).toFixed(1)} ${(bx + W * Math.sin(a)).toFixed(1)},${(by - W * Math.cos(a)).toFixed(1)}" fill="var(--ink)" stroke="none"></polygon>`; };
  const svg = inner => `<svg width="1100" height="230" viewBox="0 0 1100 230" style="position:absolute;left:0;top:0" fill="none" stroke="var(--ink)" stroke-width="3">${inner}</svg>`;
  S.A({ n: 75, t: 'Поверхностная копия', below:
`<div style="position:relative;width:1100px;height:230px">${svg(head(280, 42, 660, 100) + head(280, 188, 660, 130))}${nb(0, 0, 280, 'оригинал')}${nb(0, 146, 280, 'копия')}${nb(660, 73, 360, 'коллекция', 1)}</div>` });
  S.A({ n: 76, t: 'Глубокая копия', below:
`<div style="position:relative;width:1100px;height:230px">${svg(head(280, 42, 660, 42) + head(280, 188, 660, 188))}${nb(0, 0, 280, 'оригинал')}${nb(0, 146, 280, 'копия')}${nb(660, 0, 400, 'коллекция')}${nb(660, 146, 400, 'копия коллекции', 1)}</div>` });
}
S.B({ n: 77, t: 'Глубокая копия в коде', key: 'каждый элемент коллекции клонируется сам.', hl: [['_values.Select(x => x.Clone()).ToList()', 'ac']],
  side: ['`set` здесь намеренно — иначе глубокая копия не нужна', 'В ЛР так не пишем: Do 10, Don\'t 20'] });
S.C({ n: 78, t: 'У неизменяемых поверхностная копия безопасна', key: 'менять общую часть некому.', keyBig: true,
  items: ['Лекция 1: классы — ссылочные типы, присваивание копирует ссылку', 'Неизменяемые модели ЛР1 — копируйте поверхностно'] });
S.B({ n: 79, t: 'Прототипы в иерархии', key: '`Clone` объявлен у вершины иерархии.', half: 1 });
S.B({ n: 79, t: 'Прототипы в иерархии', key: '`Clone` объявлен у вершины иерархии.', half: 2, cont: true, side: ['Стратегия копирования у типов иерархии может различаться'] });
{
  const row = (k, hl) => `<div style="display:flex;align-items:center;gap:20px;height:84px;padding:0 28px;border-top:2px solid var(--ln);font-size:30px;${hl ? 'background:var(--ac-t)' : ''}"><span style="font-family:var(--mono)">${k}</span>${icon('arrow', 30, 'var(--ink2)')}<span style="width:44px;height:44px;border-radius:14px;border:3px solid var(--ink);box-sizing:border-box;background:#fff"></span><span>прототип</span></div>`;
  S.D({ n: 80, t: 'Хранилище прототипов', key: 'заранее настроенные эталоны вместо кучи подклассов (книга, с. 124, 128).', mt: 64, body:
`<div style="display:flex;align-items:center;gap:40px"><div style="border:3px solid var(--ink);border-radius:20px;overflow:hidden;width:560px;background:#fff"><div style="padding:20px 28px;font-size:30px;font-weight:700"><span>имя → прототип</span></div>${row('"эталон 1"')}${row('"эталон 2"', 1)}${row('"эталон 3"')}</div><div style="display:flex;flex-direction:column;align-items:center;gap:8px"><span style="font-family:var(--mono);font-size:30px;color:var(--ac);font-weight:600">Clone()</span>${icon('arrow', 120, 'var(--ac)', 'stroke-width:1.5')}</div><div style="border:4px solid var(--ac);border-radius:20px;padding:28px 40px;font-size:32px;font-weight:600;color:var(--ac)"><span>новый объект</span></div></div>` });
}
S.C({ n: 81, t: 'Тип клона теряется', key: '`Clone` возвращает базовый интерфейс — получаем лишние касты.',
  items: ['Don\'t 6, 7 — касты и down casting', 'Два способа вернуть тип — дальше'] });
S.B({ n: 82, t: 'Решение 1: ковариантный возвращаемый тип', key: 'переопределение возвращает более конкретный тип.', hl: [['public override ClassPrototype Clone()', 'ac']],
  sideWarn: 'Минус — в иерархии появляется наследование', cpp: 'как ковариантный возвращаемый тип виртуальной функции в C++; в C# — с версии 9.' });
S.B({ n: 83, t: 'Решение 2: явная реализация интерфейса', key: 'через интерфейс — один метод, через конкретный тип — другой, типизированный.', hl: [['IPrototype IPrototype.Clone()', 'ac']],
  side: ['Есть наследники — неявный `Clone` сделать `virtual`'], cpp: '`IPrototype IPrototype.Clone()` — явная реализация: вызывается только через ссылку типа `IPrototype`.' });
S.C({ n: 84, t: 'Оба решения не спасают', key: 'нельзя параметризовать методы, которые клонируют прототип.',
  items: ['Решение 1 — наследование', 'Решение 2 — синтаксическая нагрузка', 'Метод работает с абстракцией — клон выходит абстракцией'] });
S.B({ n: 85, t: 'Наследование: модель', key: 'у наследника есть своё поведение `DoOtherStuff`.' });
S.B({ n: 86, t: 'Наследование: сценарий не компилируется', key: 'у `Prototype` нет `DoOtherStuff`.', warn: true, hl: [['clone.DoOtherStuff();', 'wr', 'не компилируется']] });
S.B({ n: 87, t: 'Чтобы заработало — каст', key: 'каст возвращает тип, но компилятор больше ничего не гарантирует.', hl: [['(ClassPrototype)', 'wr']] });
S.B({ n: 88, t: 'Интерфейсы: модель', key: 'та же картина с интерфейсом.', cpp: '`void DoSomeStuff() { }` в интерфейсе — метод с реализацией по умолчанию.' });
S.B({ n: 89, t: 'Интерфейсы: сценарий не компилируется', key: 'у `IPrototype` нет `DoOtherStuff`.', warn: true, hl: [['clone.DoOtherStuff();', 'wr', 'не компилируется']] });
S.B({ n: 90, t: 'И снова каст', hl: [['(InterfacePrototype)', 'wr']] });
S.C({ n: 91, t: 'Каст — симптом', key: 'компилятор разрешит вернуть не клон, а объект другого типа — и будет `InvalidCastException` в рантайме.',
  items: ['Это глупая ошибка — лекция 4', 'Глупые ошибки хочется ловить при компиляции'],
  foot: 'Надеюсь, к этому моменту уже всем захотелось добавить тип-параметр в сигнатуру метода `CloneAndDoSomeStuff` :)' });
S.B({ n: 92, t: 'Тип-параметр, ссылающийся на себя', key: 'реализация передаёт аргументом-типом саму себя.', hl: [['where T : IPrototype<T>', 'ac'], [': IPrototype<Prototype>', 'ac']],
  cpp: '`where T : IPrototype<T>` — ограничение на параметр, проверяемое компилятором (в C++ — концепты C++20). `Prototype : IPrototype<Prototype>` — тот же приём, что CRTP.' });
S.B({ n: 93, t: 'Сценарий без кастов', key: 'вернуть «не тот тип» компилятор не даст.', hl: [['Prototype clone = CloneAndDoSomeStuff(prototype);', 'ac'], ['clone.DoOtherStuff();', 'ac']] });
S.A({ n: 94, t: 'Рекурсивный параметр-тип' });
S.B({ n: 95, t: 'Наследник прототипа', key: 'наследник дополнительно реализует интерфейс со своим типом.',
  side: ['У `FirstPrototype` метод `Clone` — `virtual`', 'Ковариантный возвращаемый тип — из решения 1'] });
S.B({ n: 96, t: 'Как хранить прототип без параметризации', key: 'тип поля в C# — только закрытый; нужен необобщённый интерфейс.', hl: [['out T', 'ac']] });
S.B({ n: 97, t: 'Ковариантность `out`', key: '`IPrototype<Prototype>` приводится к `IPrototype<IPrototype>` — просто без доступа к членам конкретного типа.',
  side: ['Объекты аргумента-типа только возвращаются — поэтому ковариантность безопасна', 'Клонирование не нужно — принимайте `IPrototype`'],
  cpp: 'в C++ у шаблонов такого нет: `vector<Derived*>` не приводится к `vector<Base*>`.' });
S.C({ n: 98, t: 'Прототип, встроенный в язык', key: '`record` + `with` — это прототип: `var copy = original with { };`',
  items: ['Компилятор генерирует копирующий конструктор и виртуальный клон — ровно шаги из книги (с. 129)', 'Копия поверхностная', '`with` по ссылке базового типа копирует реальный тип наследника — проблема иерархии решена'] });
S.C({ n: 99, t: '`ICloneable` — не использовать', warnTitle: true, key: 'возвращает `object` и не говорит, глубокая копия или поверхностная.',
  items: ['Каст — Don\'t 6', 'Microsoft Framework Design Guidelines не рекомендуют реализовывать его в публичных API'] });

// ===== Block 5 =====
S.block(5);
S.sep({ t: 'Одиночка', sub: 'и почему его не делать', label: '5 · Одиночка' });
S.A({ n: 101, t: 'Одиночка' });
S.A({ n: 102, t: 'Две проблемы сразу', sub: 'Единственный экземпляр + глобальная точка доступа.' });
S.B({ n: 103, t: 'Double checked lock', key: 'вторая проверка — не создал ли объект другой поток, пока текущий ждал на `lock`.', hl: [['if (_instance is not null)', 'ac']],
  cpp: '`lock (_lock) { … }` — как `std::lock_guard` на мьютексе; в .NET 9+ есть отдельный тип `System.Threading.Lock`.' });
{
  const rows = [['None', 'может несколько', 'одного из потоков — неопределённо'], ['PublicationOnly', 'может несколько', 'созданное первым зашедшим потоком'], ['ExecutionAndPublication', 'ровно один', 'единственное']];
  const th = t => `<div style="padding:0 28px 18px;font-size:28px;font-weight:700;color:var(--ink2)"><span>${t}</span></div>`;
  let g = `<div style="display:grid;grid-template-columns:560px 460px minmax(0,1fr);max-width:1720px">${th('Режим')}${th('Сколько раз вызовется фабрика')}${th('Какое значение останется')}`;
  rows.forEach((r, i) => { const hl = i === 2; const c = (t, m) => `<div style="padding:30px 28px;border-top:2px solid var(--ln);font-size:32px;line-height:1.3;${hl ? 'background:var(--ac-t);font-weight:600;' : ''}${m ? 'font-family:var(--mono);font-size:30px;' : ''}${hl && m ? 'box-shadow:inset 8px 0 0 var(--ac);color:var(--ac);' : ''}"><span>${t}</span></div>`; g += c(r[0], 1) + c(r[1]) + c(r[2]); });
  g += `</div>`;
  S.D({ n: 104, t: 'Режимы `Lazy<T>`', key: 'полную потокобезопасность даёт только `ExecutionAndPublication`.', body: g });
}
S.B({ n: 105, t: 'Одиночка через `Lazy<T>`', key: 'потокобезопасность — забота `Lazy<T>`, не ваша.',
  cpp: '`static Singleton()` — статический конструктор: один раз, потокобезопасно, при первом обращении к типу — как `static`-переменная в функции в C++11.' });
S.F({ n: 106, t: 'Недостатки', key: 'книга и курс согласны — минусов больше, чем плюсов.', page: 'с. 140',
  book: ['Нарушает SRP', 'Маскирует плохой дизайн', 'Проблемы мультипоточности', 'Mock-объекты в каждом юнит-тесте'],
  course: ['Тестирование — конструктор приватный', 'DI — нельзя передать зависимости (Do 13)', 'Время жизни — всё время работы приложения', 'Статический стейт — доступен отовсюду (Do 7)'],
  rule: 'Не делайте синглтон.' });
S.B({ n: 107, t: 'Решение: Singleton-лайфтайм в DI-контейнере', key: '«один на приложение» — настройка, а не свойство класса.', maxFs: 40,
  side: ['Класс обычный: публичный конструктор, зависимости аргументами, тестируется', 'Подробно DI-контейнеры — ЛР5'] });

// ===== Block 6 =====
S.block(6);
{
  const rows = [['Фабричный метод', 'сценарий отличается только создаваемым типом', 'почти антипаттерн', 'наследование, неявное нарушение SRP', 'wr'],
    ['Фабрика', 'то же — через композицию', 'да', 'SRP, OCP, DIP', 'ac'],
    ['Строитель', 'много аргументов или пошаговая сборка', 'да', 'Convenience или Stateful, никогда не храните готовый объект', 'ac'],
    ['Прототип', 'копия объекта, особенно в иерархии', 'да', 'в C# часто достаточно `record` + `with`', 'ac'],
    ['Одиночка', 'один объект на приложение', 'нет', 'Singleton-лайфтайм в DI-контейнере', 'wr']];
  const th = t => `<div style="padding:0 24px 14px;font-size:26px;font-weight:700;color:var(--ink2)"><span>${t}</span></div>`;
  let g = `<div style="display:grid;grid-template-columns:330px 560px minmax(0,1fr)">${th('Паттерн')}${th('Ситуация')}${th('Вердикт')}`;
  rows.forEach(r => { const cs = 'padding:20px 24px;border-top:2px solid var(--ln);font-size:28px;line-height:1.3;'; g += `<div style="${cs}font-weight:700"><span>${r[0]}</span></div><div style="${cs}"><span>${r[1]}</span></div><div style="${cs}display:flex;gap:14px;align-items:flex-start">${icon(r[4] === 'ac' ? 'check' : 'warn', 32, `var(--${r[4]})`, 'margin-top:2px')}<div><span style="font-weight:700;color:var(--${r[4]})">${r[2]}: </span><span>${md(r[3])}</span></div></div>`; });
  g += `</div>`;
  S.D({ n: 108, t: 'Пять паттернов — пять вердиктов', key: 'паттерн — не рецепт; у каждого своя цена.', mt: 44, body: g });
}
S.C({ n: 109, t: 'Что спросят на защите ЛР3', key: 'вопросы из сегодняшней лекции.', kind: 'num', lab: true,
  items: ['Почему фабрика, а не фабричный метод?', 'Где хранится состояние строителя и почему не в создаваемом объекте?', 'Какой у вас строитель — Convenience или Stateful, и где валидация?', 'Глубокая или поверхностная копия — и почему здесь безопасно?', 'Как сделать, чтобы обязательный аргумент нельзя было не указать?'] });
S.C({ n: 110, t: 'Что читать', key: 'все пять паттернов — в книге Швеца, раздел «Порождающие паттерны», с. 67–140.',
  items: ['Читая, помните о трёх местах, где курс решает иначе: фабричный метод, абстрактная фабрика, строитель с готовым продуктом'],
  right: `<image-slot id="qr-ref-end" shape="rounded" radius="24" placeholder="QR-код на refactoring.guru/ru/design-patterns" style="width:420px;height:420px;border:3px dashed #8A8A8A;border-radius:24px;box-sizing:border-box"></image-slot>` });
S.raw({ label: 'Вопросы' }, `<div style="flex:1;display:flex;align-items:center"><h2 style="margin:0;font-size:180px;font-weight:700;letter-spacing:-0.03em;line-height:1"><span>Вопросы?</span></h2></div>`);
