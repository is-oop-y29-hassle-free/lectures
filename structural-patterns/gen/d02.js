DIV(2,'Мост','Самый непонятый паттерн — и самый простой',[1]);
A({title:'Мост',defs:[{t:'Мост — это структурный паттерн проектирования, который разделяет один или несколько классов на две отдельные иерархии — абстракцию и реализацию, позволяя изменять их независимо друг от друга.',s:'book',p:'с. 158'}]});
C({title:'Почему его не понимают',key:'описания делают паттерн с виду сложнее и важнее, чем он есть.',items:['“Отделение абстракции от реализации”','“Две иерархии”','Сегодня — без этих слов']});
D({title:'Взрыв комбинаций',key:'наследование сразу в двух независимых направлениях даёт классы-комбинации.',body:`<div style="display:flex;gap:90px;align-items:flex-start;width:100%;justify-content:center"><div style="display:flex;flex-direction:column;align-items:center;gap:22px">${tree('Фигура',['КрасныйКруг','СинийКруг','КрасныйКвадрат','СинийКвадрат'],{c:'warn',mono:true,gap:14,kfs:22,fs:26})}<div style="display:flex;align-items:center;gap:10px;font-size:26px;font-weight:600;color:${K.warn}">${ic('warn',30,K.warn)}<span>+ фигура = +2 класса, + цвет = +3</span></div></div><div style="display:flex;align-items:flex-start;gap:16px">${tree('Фигура',['Круг','Квадрат'],{c:'acc',mono:true,gap:14,kfs:24,fs:26})}<div style="margin-top:8px">${ar('r',110,K.acc,'мост')}</div>${tree('Цвет',['Красный','Синий'],{c:'acc',mono:true,gap:14,kfs:24,fs:26})}</div></div>${note('пример книги, с. 159–160 · та же проблема, что у фабричного метода в лекции 5')}`});
F({title:'Книга и курс: о терминах',key:'термины «абстракция» и «реализация» путают — даже автор книги так считает.',book:{p:'с. 161',quote:'«Эти термины были введены в книге GoF при описании Моста. На мой взгляд, они выглядят слишком академичными, делая описание паттерна сложнее, чем он есть на самом деле.»'},course:['Термины не используем','“Реализация” — тоже абстракция','Говорим: абстракция высокого уровня и абстракция низкого уровня'],rule:'На защите объясняйте мост через уровни абстракций'});
A({title:'Где мост',defs:[{t:'Мостом называются реализации абстракций более высокого уровня, которые используют абстракции более низкого уровня.',s:'course'}]});
D({title:'Пульты и приборы',m:'remote',key:'пульт — высокий уровень, прибор — низкий; связь между ними и есть мост.',body:`<div style="display:flex;flex-direction:column;align-items:center;gap:10px">${tree('IControl',['Control','FaultyControl'],{mono:true,gap:40})}<div style="display:flex;align-items:center;gap:30px;margin:6px 0"><span style="font-size:24px;color:${K.ink2}">использует</span>${ar('d',70,K.acc)}<span style="font-size:30px;font-weight:800;color:${K.acc}">мост</span></div>${tree('IDevice',['Tv','Radio'],{mono:true,gap:40})}</div>${note('тот же пример есть в книге, с. 166–167')}`});
B({title:'Абстракции низкого уровня',m:'remote',key:'прибор умеет только хранить состояние.',code:`
public interface IDevice
{
    public bool IsEnabled { get; set; }

    public int Channel { get; set; }

    public int Volume { get; set; }
}

public class Tv : IDevice
{
    public bool IsEnabled { get; set; }
    public int Channel { get; set; }
    public int Volume { get; set; }
}

public class Radio : IDevice
{
    public bool IsEnabled { get; set; }
    public int Channel { get; set; }
    public int Volume { get; set; }
}
`});
B({title:'Абстракция высокого уровня',m:'remote',key:'пульт описывает действия пользователя, а не устройство прибора.',code:`
public interface IControl
{
    void ToggleEnabled();

    void ChannelForward();

    void ChannelBackward();

    void VolumeUp();

    void VolumeDown();
}
`});
B({title:'Обычный пульт',m:'remote',key:'пульт делегирует работу прибору через `IDevice`.',hl:['private readonly IDevice _device;'],code:`
public class Control : IControl
{
    private readonly IDevice _device;

    public Control(IDevice device)
    {
        _device = device;
    }

    public void ToggleEnabled()
        => _device.IsEnabled = _device.IsEnabled is false;

    public void ChannelForward()
        => _device.Channel += 1;

    public void ChannelBackward()
        => _device.Channel -= 1;

    public void VolumeUp()
        => _device.Volume += 10;

    public void VolumeDown()
        => _device.Volume -= 10;
}
`,cpp:'`=> выражение` — тело метода из одного выражения; `x is false` — то же, что `!x`, на курсе так читаемее.'});
B({title:'«Сломанный» пульт',m:'remote',key:'другая абстракция высокого уровня поверх тех же приборов.',hl:['TryFault();'],code:`
public class FaultyControl : IControl
{
    private readonly IDevice _device;

    public FaultyControl(IDevice device)
    {
        _device = device;
    }

    public void ToggleEnabled()
    {
        TryFault();
        _device.IsEnabled = _device.IsEnabled is false;
    }

    public void ChannelForward()
    {
        TryFault();
        _device.Channel += 1;
    }

    public void ChannelBackward()
    {
        TryFault();
        _device.Channel -= 1;
    }
`});
B({title:'«Сломанный» пульт: громкость и сбой',m:'remote',key:'шаг громкости другой, и иногда пульт сам переключает питание.',cont:true,code:`
    public void VolumeUp()
    {
        TryFault();
        _device.Volume += 5;
    }

    public void VolumeDown()
    {
        TryFault();
        _device.Volume -= 5;
    }

    private void TryFault()
    {
        _device.IsEnabled = Random.Shared.NextDouble() < 0.5
            ? _device.IsEnabled
            : _device.IsEnabled is false;
    }
}
`,notes:[{t:'`Random.Shared` — статическое состояние, тест недетерминирован (Do 7, Do 13)',c:K.ink2},{t:'Инвариантов нет: громкость уйдёт в минус — в ЛР так нельзя (Do 11)',c:K.ink2}]});
(function(){const ok={h:`<div style="display:flex;align-items:center;gap:12px;color:${K.acc};font-weight:600">${ic('check',34,K.acc)}<span>работает</span></div>`};
D({title:'Что получили — обычную декомпозицию',key:'четыре комбинации из четырёх классов, а не четыре подкласса-комбинации.',left:['SRP: часть реализации — в отдельную абстракцию','Любой пульт с любым прибором'],lw:520,body:tbl(['','`Tv`','`Radio`'],[['`Control`',ok,ok],['`FaultyControl`',ok,ok]],{fs:30,pad:26,w:'820px',va:'middle',cw:['40%','30%','30%']})});})();
D({title:'Мост раскладывается на известное',key:'ничего нового — только принципы, которые мы уже прошли.',body:tbl(['Мост — это…','Откуда мы это знаем'],[['один из способов реализации OCP','лекция 2, SOLID'],['один из способов реализации Protected Variations','лекция 3, GRASP'],['подвид адаптера, только спроектированный заранее','блок 1'],['полиморфный строитель + директор','лекция 5']],{fs:30,pad:20,w:'1300px',cw:['62%','38%']})});
A({title:'Книга здесь согласна',defs:[{t:'Мост проектируют загодя, чтобы развивать большие части приложения отдельно друг от друга. Адаптер применяется постфактум, чтобы заставить несовместимые классы работать вместе.',s:'book',p:'с. 156, 172'},{t:'Паттерн Строитель может быть построен в виде Моста: директор будет играть роль абстракции, а строители — реализации.',s:'book',p:'с. 173'}]});
C({title:'Мост и стратегия',key:'по коду похожи, различаются задачей; главная задача моста — структурная.',items:['Нижнюю абстракцию можно менять даже во время выполнения','Книга: “из-за этого пункта Мост часто путают со Стратегией” (с. 170)','Стратегию разберём с поведенческими паттернами']});
C({title:'Фундаментальный паттерн',key:'делили класс на два по SRP и связали через интерфейс — вы уже делали мост.',items:['Не что-то особенное','Базовая идея: декомпозиция и выделение абстракций']});

DIV(3,'Компоновщик','Дерево, с которым работаем как с одним объектом',[2]);
A({title:'Компоновщик',defs:[{t:'Компоновщик — это структурный паттерн проектирования, который позволяет сгруппировать объекты в древовидную структуру, а затем работать с ними так, если бы это был единичный объект.',s:'book',p:'с. 174'}],after:'Также известен как “Дерево”, Composite'});
C({title:'Только для деревьев',key:'паттерн имеет смысл, только если модель предметной области — дерево (книга, с. 175).',items:['Группы слоёв в графическом редакторе','Коробки в коробках','Армия: армия → полки → взводы → солдаты (аналогия книги, с. 178)'],right:wrapSvg('composite',620),rw:640});
A({title:'Роли по книге',defs:[{t:'Компонент определяет общий интерфейс для простых и составных компонентов дерева.',s:'book',p:'с. 179'},{t:'Лист – это простой элемент дерева, не имеющий ответвлений.',s:'book',p:'с. 179'},{t:'Контейнер (или «композит») — это составной элемент дерева. Он содержит набор дочерних компонентов, но ничего не знает об их типах.',s:'book',p:'с. 179'}]});
D({title:'Роли в книге и в курсе',key:'агрегатный узел передаёт вызовы детям по своей логике агрегации.',body:tbl(['Книга','Курс','Что делает'],[['Компонент','компонент','базовый интерфейс, поведения всех объектов структуры'],['Лист','терминальный узел','конкретный компонент без детей'],['Контейнер','агрегатный узел','держит коллекцию компонентов, передаёт им вызовы по логике агрегации']],{fs:30,pad:20,fb:true,cw:['22%','26%','52%']})});
B({title:'Графический редактор: компонент и листья',m:'shapes',key:'у круга и линии один интерфейс.',code:`
public interface IGraphicComponent
{
    void MoveBy(int x, int y);

    void Draw();
}

public class Circle : IGraphicComponent
{
    public void MoveBy(int x, int y) { }

    public void Draw() { }
}

public class Line : IGraphicComponent
{
    public void MoveBy(int x, int y) { }

    public void Draw() { }
}
`});
B({title:'Группа — тоже компонент',m:'shapes',key:'группа реализует тот же интерфейс и передаёт вызов каждому ребёнку.',hl:['_components = components.ToArray();'],code:`
public class GraphicComponentGroup : IGraphicComponent
{
    private readonly IReadOnlyCollection<IGraphicComponent> _components;

    public GraphicComponentGroup(IReadOnlyCollection<IGraphicComponent> components)
    {
        _components = components.ToArray();
    }

    public void MoveBy(int x, int y)
    {
        foreach (var component in _components)
            component.MoveBy(x, y);
    }

    public void Draw()
    {
        foreach (var component in _components)
            component.Draw();
    }
}
`,notes:['`ToArray()` — своя копия: снаружи список не изменить (Do 10, Do 11)','Как `ModelBuilder` в лекции 5'],cpp:'`IReadOnlyCollection<T>` — интерфейс «можно перечислить и узнать количество, нельзя изменить», примерно как передача `std::span<const T>`.'});
(function(){const row=(t,lvl,grp)=>`<div style="display:flex;align-items:center;gap:16px;padding:14px 24px 14px ${24+lvl*56}px;border-bottom:2px solid ${K.line2};font-size:30px;${grp?'font-weight:700;':''}"><span style="display:flex">${ar('r',36,K.acc,null,3)}</span>${grp?`<span style="width:26px;height:22px;border:3px solid ${K.ink};border-radius:6px;box-sizing:border-box"></span>`:''}<span>${t}</span></div>`;
const panel=`<div style="width:620px;border:3px solid ${K.ink};border-radius:24px;overflow:hidden"><div style="padding:14px 24px;font-size:24px;font-weight:600;color:${K.ink2};border-bottom:3px solid ${K.ink}">Слои</div>${row('Группа 1',0,1)}${row('Круг',1)}${row('Линия',1)}${row('Группа 2',1,1)}<div style="border-bottom:none">${row('Круг',2)}</div></div>`;
D({title:'Группа слоёв',m:'shapes',key:'двигаете группу — двигаются все слои, включая вложенные группы.',body:`<div style="display:flex;align-items:flex-start;gap:24px"><div style="margin-top:84px">${ar('r',150,K.acc,'`MoveBy`',4)}</div>${panel}</div>`});})();
(function(){const it=(n,p)=>`<div style="border:2px solid ${K.ink};border-radius:14px;padding:14px 22px;font-size:28px;display:flex;gap:24px;justify-content:space-between;background:#FFFFFF"><span>${n}</span><span style="font-weight:700">${p}</span></div>`;
const boxEl=(lab,inner,big)=>`<div style="border:3px solid ${K.ink};border-radius:26px;padding:56px 28px 28px;position:relative;display:flex;flex-direction:column;gap:16px;${big?'min-width:560px':''}"><span style="position:absolute;top:14px;left:24px;display:flex;align-items:center;gap:10px;font-size:24px;color:${K.ink2}">${ic('box',28,K.ink2)}<span>${lab}</span></span>${inner}</div>`;
const tree_=boxEl('заказ',it('Клавиатура','3 500')+boxEl('коробка',it('Мышь','1 200')+it('Коврик','400')),true);
D({title:'Задача: цена заказа',m:'box',key:'товары лежат в коробках, коробки — в коробках; глубина неизвестна.',body:`<div style="display:flex;align-items:center;gap:72px">${tree_}<div style="font-size:44px;font-weight:800;color:${K.acc};max-width:420px;line-height:1.2">Сколько стоит весь заказ?</div></div>${note('пример книги, с. 175–176')}`});})();
B({title:'Коробка тоже знает цену',m:'box',key:'у коробки логика агрегации — «сложи цены детей».',hl:['public decimal Price => _items.Sum(item => item.Price);'],code:`
public interface IOrderItem
{
    decimal Price { get; }
}

public sealed record Product(string Name, decimal Price) : IOrderItem;

public sealed class Box : IOrderItem
{
    private readonly IReadOnlyCollection<IOrderItem> _items;

    public Box(IReadOnlyCollection<IOrderItem> items)
    {
        _items = items.ToArray();
    }

    public decimal Price => _items.Sum(item => item.Price);
}
`,notes:["Сумма — через LINQ, не циклом (Do 16, Don't 12)"]});
B({title:'Клиенту всё равно, сколько уровней',m:'box',key:'один вызов `Price` — и всё дерево посчитано.',hl:['decimal total = order.Price; // 5100'],code:`
IOrderItem order = new Box([
    new Product("Клавиатура", 3500m),
    new Box([new Product("Мышь", 1200m), new Product("Коврик", 400m)]),
]);

decimal total = order.Price; // 5100
`,cpp:'`[a, b]` — коллекционное выражение, как список инициализации `{a, b}`; `3500m` — литерал типа `decimal`, точного десятичного числа для денег.'});
D({title:'Логика агрегации бывает разной',key:'агрегатный узел решает, как собрать результат детей.',body:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;width:100%">${card('`GraphicComponentGroup.Draw`','передай каждому',{fs:34})}${card('`Box.Price`','сложи результаты',{fs:34})}</div>`});
F({title:'Книга и курс: куда класть добавление детей',key:'дерево собирается при создании и дальше не меняется.',book:{p:'с. 185',quote:'«Имейте в виду, что методы добавления/удаления дочерних элементов можно поместить и в интерфейс компонентов. Да, это нарушит принцип разделения интерфейса, так как реализации методов будут пустыми в компонентах-листьях. Но зато все компоненты дерева станут действительно одинаковыми для клиента.»'},course:['Лист с пустым `Add` нарушает ISP и LSP (лекция 2)','Дерево — через конструкторы (Do 3, Do 10)','Собирать по шагам — строителем: книга сама пишет, что “Строитель позволяет пошагово сооружать дерево Компоновщика” (с. 185)'],rule:'Никаких `Add` в интерфейсе компонента'});
C({title:'Компоновщик и прототип',key:'копирование сложного дерева проще отдать самим узлам.',items:['Каждый узел копирует себя и просит детей скопировать себя','`IPrototype<T>` и глубокая копия — лекция 5','Книга о том же — с. 187']});
C({title:'Минус из книги',key:'«Создаёт слишком общий дизайн классов» (с. 185).',items:['Интерфейс компонента должен иметь смысл и для листа, и для контейнера','Если для какого-то метода это не так — дерево неподходящая модель']});

DIV(4,'Декоратор','Добавить поведение конкретному объекту, не трогая его',[3]);
A({title:'Декоратор',defs:[{t:'Декоратор — это структурный паттерн проектирования, который позволяет динамически добавлять объектам новую функциональность, оборачивая их в полезные «обёртки».',s:'book',p:'с. 188'}],after:'Наследованием расширяем тип, композицией — поведение конкретного объекта',afterAcc:true});
A({title:'Почему не наследование',defs:[{t:'Он статичен. Вы не можете изменить поведение существующего объекта. Для этого вам надо создать новый объект, выбрав другой подкласс.',s:'book',p:'с. 191'}],rw:600,right:`<div style="display:flex;flex-direction:column;align-items:center;gap:20px">${bx('Оповещения',{c:'warn',fw:600})}<div style="display:flex;flex-direction:column;gap:12px;border-left:3px solid ${K.warn};padding-left:28px;align-self:center">${['SMS','Slack','SMS + Slack','Email + SMS + Slack','…'].map(t=>`<div style="display:flex;align-items:center;gap:0"><div style="width:28px;height:3px;background:${K.warn};margin-left:-28px"></div>${bx(t,{c:'warn',fs:26,pad:'10px 22px'})}</div>`).join('')}</div><div style="font-size:24px;line-height:1.35;color:${K.ink2};text-align:center">вторая проблема — подклассы-комбинации каналов, пример книги, с. 189–191</div></div>`});
D({title:'Одежда слоями',key:'надели свитер, сверху плащ — эффект складывается, а вы остаётесь собой.',body:`<div style="display:flex;align-items:center;gap:56px"><svg width="460" height="520" viewBox="0 0 460 520" fill="none" style="stroke-linecap:round;stroke-linejoin:round;display:block">
<rect x="20" y="20" width="420" height="480" rx="120" stroke="${K.ink}" style="stroke-width:4;stroke-dasharray:14 10"/>
<rect x="80" y="80" width="300" height="370" rx="90" stroke="${K.acc}" style="stroke-width:5"/>
<circle cx="230" cy="175" r="48" stroke="${K.ink}" style="stroke-width:5"/><path d="M150 390 v-60 a80 80 0 0 1 160 0 v60" stroke="${K.ink}" style="stroke-width:5"/></svg>
<div style="display:flex;flex-direction:column;gap:26px;font-size:32px"><div style="display:flex;align-items:center;gap:16px"><span style="width:44px;border-top:4px dashed ${K.ink}"></span><span>плащ</span></div><div style="display:flex;align-items:center;gap:16px;color:${K.acc};font-weight:600"><span style="width:44px;border-top:5px solid ${K.acc}"></span><span>свитер</span></div><div style="display:flex;align-items:center;gap:16px"><span style="width:44px;height:5px;background:${K.ink}"></span><span>вы</span></div></div></div>${note('аналогия книги, с. 195')}`});
D({title:'Три роли',key:'декоратор держит композицией объект той же абстракции.',body:`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;width:100%">${card('Абстракция','интерфейс, определяющий поведения')}${card('Декоратор','реализует абстракцию и держит объект той же абстракции',{acc:true})}${card('Wrappee','оборачиваемый объект')}</div><div style="align-self:flex-start">${src('course')}</div>`});
A({title:'Главное свойство декоратора',defs:[{t:'Ключевая особенность паттерна декоратор заключается в том, что он не имеет контроля над оборачиваемым объектом. Вызов поведения абстракции на объекте декоратора, должен быть обязательно передан оборачиваемому объекту. Декоратор может расширить логику этого объекта, добавив какие-то свои поведения перед или после выполнения поведения wrappee, но никак не вместо.',s:'course'}],fs:30,below:`<div style="display:flex;align-items:flex-end;gap:80px">${wrapSvg('decorator',560)}<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${wrapSvg('instead',340)}</div></div>`});
C({title:'Зачем',key:'добавить логику к операции прозрачно для кода, который её вызывает.',items:['Логирование','Сбор метрик','На результат не влияют, потребителям не важны, но нужны']});
B({title:'Сервис и логгер',m:'gear',key:'сервис занимается только своей работой.',code:`
public interface IService
{
    void DoStuff(DoStuffArgs args);
}

public class Service : IService
{
    public void DoStuff(DoStuffArgs args) { ... }
}

public interface ILogger
{
    void Log(string message);
}
`});
B({title:'Логирующий декоратор',m:'gear',key:'сначала своё, потом обязательно — обёрнутый объект.',hl:['_decoratee.DoStuff(args);'],code:`
public class LoggingServiceDecorator : IService
{
    private readonly IService _decoratee;
    private readonly ILogger _logger;

    public LoggingServiceDecorator(IService decoratee, ILogger logger)
    {
        _decoratee = decoratee;
        _logger = logger;
    }

    public void DoStuff(DoStuffArgs args)
    {
        _logger.Log(ArgsToLogMessage(args));
        _decoratee.DoStuff(args);
    }

    private static string ArgsToLogMessage(DoStuffArgs args) { ... }
}
`,notes:['Тот же интерфейс `IService`','Wrappee приходит в конструктор — агрегация']});
C({title:'Что это даёт',key:'SRP и тесты без лишней инфраструктуры.',items:['Сервис — только бизнес-логика, логирования в нём нет','В тестах сервис не оборачиваем — логгер не нужен']});
B({title:'Декоратор метрик',m:'gear',key:'второй декоратор — по тому же рецепту.',code:`
public interface IMetrics
{
    void RecordDuration(string operation, TimeSpan duration);
}

public class MetricsServiceDecorator : IService
{
    private readonly IService _decoratee;
    private readonly IMetrics _metrics;
    private readonly TimeProvider _timeProvider;

    public MetricsServiceDecorator(IService decoratee, IMetrics metrics, TimeProvider timeProvider)
    {
        _decoratee = decoratee;
        _metrics = metrics;
        _timeProvider = timeProvider;
    }
`,notes:['Время — через `TimeProvider` в конструкторе, не статические часы (Do 13)'],cpp:'`TimeProvider` — абстрактный класс .NET 8+ для «текущего времени» и замеров интервалов.'});
B({title:'Замер «до» и «после»',m:'gear',key:'метрика записывается при любом исходе вызова.',cont:true,hl:['_decoratee.DoStuff(args);'],code:`
    public void DoStuff(DoStuffArgs args)
    {
        long startedAt = _timeProvider.GetTimestamp();

        try
        {
            _decoratee.DoStuff(args);
        }
        finally
        {
            _metrics.RecordDuration(nameof(DoStuff), _timeProvider.GetElapsedTime(startedAt));
        }
    }
}
`,cpp:'`try { … } finally { … }` — блок `finally` выполнится при любом выходе, и при исключении тоже, как деструктор RAII-объекта в C++.'});
var __nest;(function(){const nest=(names,w)=>{let inner=`<div style="border:3px solid ${K.ink};border-radius:18px;padding:16px 22px;font-size:26px;font-family:${MONO};background:#FFFFFF">${names[names.length-1]}</div>`;for(let i=names.length-2;i>=0;i--)inner=`<div style="border:3px solid ${i===0?K.ink:K.ink};border-radius:${24+(names.length-2-i)*6}px;padding:48px 26px 22px;position:relative"><span style="position:absolute;top:10px;left:20px;font-size:24px;font-family:${MONO};color:${K.ink2}">${names[i]}</span>${inner}</div>`;return inner;};
__nest=nest;})();
B({title:'Обёртки складываются',m:'gear',key:'цепочку собирает тот, кто создаёт объекты.',code:`
IService service = new MetricsServiceDecorator(
    new LoggingServiceDecorator(new Service(), logger),
    metrics,
    TimeProvider.System);
`,right:`<div style="display:flex;flex-direction:column;gap:22px;align-items:flex-start"><div style="display:flex;align-items:center;gap:0">${ar('r',70,K.acc,'вызов')}<div style="margin-left:-6px">${__nest(['Metrics','Logging','Service'])}</div></div>${note('В ЛР5 сборку сделает DI-контейнер')}</div>`});
D({title:'Порядок обёрток важен',key:'поменяли местами — метрика измеряет другое.',body:`<div style="display:flex;gap:120px;align-items:flex-start">${[[['Metrics','Logging','Service'],'время сервиса + логирования'],[['Logging','Metrics','Service'],'время только сервиса']].map(([n,c])=>`<div style="display:flex;flex-direction:column;align-items:center;gap:28px">${__nest(n)}<div style="font-size:30px;font-weight:600;color:${K.acc}">${c}</div></div>`).join('')}</div>`});
F({title:'Книга и курс: базовый класс декоратора',key:'декоратор избавлял от наследования — не возвращаем его через базовый класс.',book:{p:'с. 196, 202',quote:'«Базовый Декоратор хранит ссылку на вложенный объект-компонент. Им может быть как конкретный компонент, так и один из конкретных декораторов. Базовый декоратор делегирует все свои операции вложенному объекту. Дополнительное поведение будет жить в конкретных декораторах.»',after:'Конкретные декораторы наследуются от базового (с. 202)'},course:['Базового класса нет','Каждый декоратор сам реализует интерфейс и держит поле',"Наследование ради делегирующих методов — переиспользование кода (Don't 11)"],rule:'Декоратор реализует интерфейс напрямую'});
C({title:'Декоратор-адаптер',key:'канонически интерфейс тот же, но его можно и расширить.',items:['Расширенный интерфейс — наследование интерфейсов, не классов','Старую часть по-прежнему выбираем динамически, логика добавляется к новой','Книга: “Декоратор предоставляет расширенный интерфейс” (с. 157)']});
D({title:'Что пишет книга',key:'четыре плюса и два минуса (с. 203).',ba:'stretch',bj:'flex-start',body:twoCol([{t:'Большая гибкость, чем у наследования',i:'check'},{t:'Позволяет добавлять обязанности на лету',i:'check'},{t:'Можно добавлять несколько новых обязанностей сразу',i:'check'},{t:'Позволяет иметь несколько мелких объектов вместо одного объекта на все случаи жизни',i:'check'}],[{t:'Трудно конфигурировать многократно обёрнутые объекты',i:'warn'},{t:'Обилие крошечных классов',i:'warn'}])});
E({m:'remote',q:'`FaultyControl` перед каждым действием вызывает `TryFault()`, а потом делает то же, что `Control`. Можно ли сделать его декоратором над `IControl`?',hint:'Сравните шаг громкости у двух пультов.',endChip:'конец первой части'});
