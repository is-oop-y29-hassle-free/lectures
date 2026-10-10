blk(0,null);
frame('Титул',`<div style="display:flex;flex-direction:column;justify-content:center;flex:1;gap:36px"><div style="font-size:34px;font-weight:700;color:${K.acc};letter-spacing:0.14em;text-transform:uppercase">Лекция 6</div><h1 style="margin:0;font-size:150px;line-height:1;font-weight:800;letter-spacing:-0.035em">Структурные паттерны</h1><div style="font-size:40px;font-weight:500;color:${K.ink2}">Дисциплина «ООП и проектирование»</div></div>${bigInd(null)}`,{noInd:true});
C({title:'Референс',key:'все паттерны курса читаем по одной книге.',items:['А. Швец, «Погружение в паттерны проектирования», Refactoring.Guru, 2018','Веб-версия с примерами на C#: refactoring.guru/ru/design-patterns'],rw:460,
right:`<div style="width:420px;height:420px;border:3px dashed ${K.line};border-radius:28px;display:flex;align-items:center;justify-content:center;text-align:center;padding:40px;box-sizing:border-box;font-size:26px;color:${K.ink2}">QR-код на сайт (вставит лектор)</div>`});
A({title:'Структурные паттерны',defs:[{t:'Структурные паттерны показывают различные способы построения связей между объектами.',s:'book',p:'с. 25'},{t:'Эти паттерны отвечают за построение удобных в поддержке иерархий классов.',s:'book',p:'с. 142'}],after:'Порождающие — лекция 5 · структурные — сегодня и ЛР2 · поведенческие — дальше'});
C({title:'Другой вопрос',key:'порождающие отвечали «кто создаёт объект», структурные — «как объекты держат друг друга».',items:['Через какой интерфейс общаются','Кто кого оборачивает','Кто управляет жизнью вложенного объекта']});
(function(){const pc=(ru,en,t)=>`<div style="border:2px solid ${K.line};border-radius:22px;padding:22px 26px;display:flex;flex-direction:column;gap:10px;min-width:0;box-sizing:border-box;background:#FFFFFF"><div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap"><span style="font-size:30px;font-weight:700">${ru}</span><span style="font-size:24px;color:${K.ink2}">${en}</span></div><div style="font-size:24px;line-height:1.32;text-wrap:pretty">${esc(t)}</div></div>`;
const c=[pc('Адаптер','Adapter','Позволяет объектам с несовместимыми интерфейсами работать вместе.'),pc('Мост','Bridge','Разделяет один или несколько классов на две отдельные иерархии — абстракцию и реализацию, позволяя изменять их независимо друг от друга.'),pc('Компоновщик','Composite','Позволяет сгруппировать объекты в древовидную структуру, а затем работать с ними так, если бы это был единичный объект.'),pc('Декоратор','Decorator','Позволяет динамически добавлять объектам новую функциональность, оборачивая их в полезные «обёртки».'),pc('Заместитель','Proxy','Позволяет подставлять вместо реальных объектов специальные объекты-заменители. Эти объекты перехватывают вызовы к оригинальному объекту, позволяя сделать что-то до или после передачи вызова оригиналу.'),pc('Фасад','Facade','Предоставляет простой интерфейс к сложной системе классов, библиотеке или фреймворку.'),pc('Легковес','Flyweight','Позволяет вместить бóльшее количество объектов в отведённую оперативной память за счёт экономного разделения общего состояния объектов между собой, вместо хранения одинаковых данных в каждом объекте.')];
const body=`<div style="display:flex;flex-direction:column;gap:22px;width:100%"><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">${c[0]}${c[1]}${c[2]}</div><div style="display:flex;gap:20px;align-items:stretch"><div style="flex:2.6;min-width:0;position:relative;border:3px solid ${K.acc};border-radius:30px;padding:10px;display:grid;grid-template-columns:1fr 1.25fr;gap:12px">${c[3]}${c[4]}<div style="position:absolute;top:-20px;left:28px;background:#FFFFFF;padding:0 12px;font-size:24px;font-weight:700;color:${K.acc}">чаще всего путают</div></div><div style="flex:0.8;min-width:0;display:flex;padding:10px 0">${c[5]}</div><div style="flex:1.3;min-width:0;display:flex;padding:10px 0">${c[6]}</div></div>${src('book','с. 142–144')}</div>`;
D({title:'Семь паттернов',key:'порядок на лекции: адаптер, мост, компоновщик, декоратор, заместитель, фасад, легковес.',body,bj:'flex-start'});})();
A({title:'Общий приём',defs:[{t:'Мост, Стратегия и Состояние (а также слегка и Адаптер) имеют схожие структуры классов — все они построены на принципе «композиции», то есть делегирования работы другим объектам. Тем не менее, они отличаются тем, что решают разные проблемы. Помните, что паттерны — это не только рецепт построения кода определённым образом, но и описание проблем, которые привели к данному решению.',s:'book',p:'с. 157'}]});
C({title:'Различаем по задаче',key:'по коду обёртки похожи; различаем по тому, что обёртка делает с вызовом.',items:['Реализует интерфейс','Держит в поле другой объект','Остальное решает задача — это главный навык лекции']});
D({title:'Обёртка и вызов',key:'весь день будем смотреть, что происходит с этой стрелкой.',body:wrapSvg('base',940)});
A({title:'Композиция: агрегация и ассоциация',pre:'повтор лекции 1',defs:[{t:'Композиция — создание одних типов, на основе других, используя хранение их данных, как непосредственную часть описываемого объекта (композитный – состоящий из нескольких частей).',s:'course'},{t:'При агрегирующей композиции, значения получаются извне, их время жизни никак не привязано к объекту, частью которого они являются.',s:'course'},{t:'При ассоциативной композиции значения создаются непосредственно при инициализации объекта, соответственно, время жизни таких объектов привязано к объекту, частью которого они являются.',s:'course'}]});
(function(){const wr=(inner,st='')=>`<div style="border:3px solid ${K.ink};border-radius:30px;padding:56px 40px 36px;position:relative;display:flex;align-items:center;justify-content:center;${st}"><span style="position:absolute;top:14px;left:26px;font-size:24px;color:${K.ink2}">обёртка</span>${inner}</div>`;
const capt=t=>`<div style="font-size:34px;font-weight:700;color:${K.acc}">${t}</div>`;
const left=`<div style="display:flex;flex-direction:column;align-items:center;gap:28px"><div style="display:flex;align-items:center;gap:20px">${bx('объект',{c:'ink'})}${ar('r',110,K.acc,'в конструктор')}${wr(bx('объект',{c:'ink',dash:true}))}</div>${capt('агрегация')}</div>`;
const right=`<div style="display:flex;flex-direction:column;align-items:center;gap:28px">${wr(`<div style="border:3px dashed ${K.acc};border-radius:22px;padding:18px 22px 22px;display:flex;flex-direction:column;align-items:center;gap:12px"><span style="font-size:24px;color:${K.acc};font-weight:600">живёт, пока живёт обёртка</span>${bx('объект',{c:'ink'})}</div>`)}${capt('ассоциация')}</div>`;
const body=`<div style="display:flex;flex-direction:column;align-items:stretch;gap:20px"><div style="display:flex;flex-direction:column;align-items:center;gap:8px"><span style="font-size:30px;font-weight:700;color:${K.acc}">композиция</span><div style="width:100%;height:26px;border:3px solid ${K.acc};border-bottom:none;border-radius:14px 14px 0 0;box-sizing:border-box"></div></div><div style="display:flex;gap:110px;align-items:flex-end">${left}${right}</div></div>`;
D({title:'Откуда обёртка берёт объект',key:'передали снаружи — агрегация; создала сама — ассоциация; оба случая — композиция.',body});})();
F({title:'Книга и курс: слова про связи',key:'читая книгу, помните — на курсе эти слова устроены иначе.',book:{p:'с. 20–21',items:['Ассоциация, композиция и агрегация — три отдельных вида отношений','«Композиция» в книге — владение временем жизни']},course:['Композиция — общее понятие','Её виды — агрегация (значения извне) и ассоциация (значения создаются при инициализации)'],rule:'На защите — термины лекции 1'});

DIV(1,'Адаптер','Привести несовместимые типы к общему интерфейсу',[0]);
A({title:'Адаптер',defs:[{t:'Адаптер — это структурный паттерн проектирования, который позволяет объектам с несовместимыми интерфейсами работать вместе.',s:'book',p:'с. 145'}],after:'Также известен как “Обёртка”',rw:560,
right:`<svg width="540" height="220" viewBox="0 0 540 220" fill="none" stroke="${K.ink}" style="stroke-width:4;stroke-linecap:round;stroke-linejoin:round;display:block">
<rect x="10" y="60" width="110" height="100" rx="20"/><path d="M120 88 H162"/><path d="M120 132 H162"/>
<rect x="190" y="50" width="140" height="120" rx="24" stroke="${K.acc}"/><rect x="200" y="80" width="18" height="16" rx="3" stroke="${K.acc}"/><rect x="200" y="124" width="18" height="16" rx="3" stroke="${K.acc}"/><path d="M330 92 H368" stroke="${K.acc}" style="stroke-width:10"/><path d="M330 128 H368" stroke="${K.acc}" style="stroke-width:10"/>
<rect x="390" y="30" width="140" height="160" rx="40"/><circle cx="414" cy="92" r="9"/><circle cx="414" cy="128" r="9"/></svg>
<div style="display:flex;gap:0;width:540px;font-size:24px;color:${K.ink2};justify-content:space-between"><span>вилка</span><span style="color:${K.acc};font-weight:600">переходник</span><span>розетка</span></div>${note('аналогия книги, с. 148–149')}`});
A({title:'Роли: клиент и клиентский интерфейс',defs:[{t:'Клиент — это класс, который содержит существующую бизнес-логику программы.',s:'book',p:'с. 150'},{t:'Клиентский интерфейс описывает протокол, через который клиент может работать с другими классами.',s:'book',p:'с. 150'}]});
A({title:'Роли: сервис и адаптер',defs:[{t:'Сервис – это какой-то полезный класс, обычно сторонний. Клиент не может использовать этот класс напрямую, так как сервис имеет непонятный ему интерфейс.',s:'book',p:'с. 150'},{t:'Адаптер — это класс, который может одновременно работать и с клиентом, и с сервисом. Он реализует клиентский интерфейс и содержит ссылку на объект сервиса.',s:'book',p:'с. 150'}]});
D({title:'Имена ролей в книге и в курсе',key:'в документации и коде встречаются оба набора имён.',ba:'stretch',body:`<div style="display:flex;gap:56px;align-items:center"><div style="flex:1;min-width:0">${tbl(['Книга','Курс (и GoF)','Что это'],[['Клиентский интерфейс','`Target` — целевой интерфейс','абстракция, через которую система хочет работать'],['Сервис','`Adaptee` — адаптируемый тип','тип, который этот интерфейс не реализует'],['Адаптер','`Adapter` — тип-обёртка','реализует `Target`, держит `Adaptee`, переводит вызовы']],{fs:27,fb:true,cw:['22%','34%','44%']})}</div>${wrapSvg('adapter',520)}</div>`});
C({title:'Кого адаптируют',key:'адаптер даёт полиморфизм типам, которые не лежат в одной иерархии.',items:['`Adaptee` — чаще всего тип сторонней библиотеки','Или свой инфраструктурный тип, в который не хотим тащить чужой интерфейс','Обёртки — склеивающая прослойка между интерфейсами']});
(function(){const q=bx('?<br>',{});const qb=`<div style="border:3px dashed ${K.line};border-radius:18px;padding:12px 26px;display:flex;align-items:center;gap:14px;flex:none"><span style="font-size:44px;font-weight:800;color:${K.acc}">?</span><span style="font-size:26px;color:${K.ink2}">как подключить?</span></div>`;
const branch=lib=>`<div style="display:flex;align-items:center;gap:18px">${ar('r',60,K.ink)}${qb}${ar('r',60,K.ink)}${bx(lib,{c:'line',w:330})}</div>`;
const body=`<div style="display:flex;align-items:center;gap:22px">${bx('наш код',{c:'ink'})}${ar('r',70,K.ink)}${bx('`ILogStorage`',{c:'acc',fw:600})}<div style="display:flex;flex-direction:column;gap:44px;border-left:3px solid ${K.ink};padding:10px 0 10px 0;margin-left:16px">${branch('Postgres-библиотека')}${branch('Elastic-библиотека')}</div></div>`;
D({title:'Задача: хранить логи',m:'log',key:'хранилище будет меняться, а писать его самим не будем — есть готовые библиотеки.',body});})();
B({title:'Сторонние типы',m:'log',key:'эти классы чужие — менять их мы не можем.',chip:'сторонняя библиотека',code:`
public class PostgresLogStorage
{
    public void Save(string message, DateTime timeStamp, int severity) { ... }
}

public class ElasticSearchLogStorage
{
    public void Save(ElasticLogMessage message) { ... }
}

public record ElasticLogMessage(string Level, string Message, DateTimeOffset Timestamp);
`,notes:['Postgres хочет три параметра и `int`','Elastic хочет свой объект-сообщение']});
B({title:'Наша модель и наш интерфейс',m:'log',key:'клиент знает только `ILogStorage` и `LogMessage`.',hl:['void Save(LogMessage message);'],code:`
public sealed record LogMessage(string Message, DateTimeOffset Timestamp, LogSeverity Severity);

public abstract record LogSeverity
{
    private LogSeverity() { }

    public sealed record Information : LogSeverity;

    public sealed record Warning : LogSeverity;

    public sealed record Error : LogSeverity;
}

public interface ILogStorage
{
    void Save(LogMessage message);
}
`,notes:['Уровень — иерархия `record`, как Result-тип в лекции 4','Время — `DateTimeOffset`'],cpp:'`private LogSeverity() { }` — наследников может объявить только сам тип, внутри себя; набор уровней закрыт, как у `std::variant`.'});
B({title:'Адаптер для Postgres',m:'log',key:'адаптер реализует наш интерфейс и вызывает чужой.',hl:['_storage.Save(message.Message, message.Timestamp.UtcDateTime, ToSeverityCode(message.Severity));'],code:`
public class PostgresLogStorageAdapter : ILogStorage
{
    private const int InformationCode = 0;
    private const int WarningCode = 1;
    private const int ErrorCode = 2;

    private readonly PostgresLogStorage _storage;

    public PostgresLogStorageAdapter(PostgresLogStorage storage)
    {
        _storage = storage;
    }

    public void Save(LogMessage message)
    {
        _storage.Save(message.Message, message.Timestamp.UtcDateTime, ToSeverityCode(message.Severity));
    }
`,notes:['Сервис приходит в конструктор',"Коды — константы, не магические числа (Don't 2)"]});
B({title:'Адаптер для Postgres: перевод уровня',m:'log',key:'вся трансляция — внутри адаптера; наша модель не знает кодов Postgres.',cont:true,code:`
    private static int ToSeverityCode(LogSeverity severity)
    {
        return severity switch
        {
            LogSeverity.Information => InformationCode,
            LogSeverity.Warning => WarningCode,
            LogSeverity.Error => ErrorCode,
            _ => throw new ArgumentOutOfRangeException(nameof(severity)),
        };
    }
}
`,cpp:'`severity switch { LogSeverity.Warning => … }` — выбор ветки по типу объекта, аналог `std::visit`. Ветка `_ =>` нужна компилятору: он не знает, что наследников ровно три.'});
B({title:'Адаптер для Elastic',m:'log',key:'тот же интерфейс — другой перевод.',hl:['_storage.Save(new ElasticLogMessage(ToLevel(message.Severity), message.Message, message.Timestamp));'],code:`
public class ElasticLogStorageAdapter : ILogStorage
{
    private readonly ElasticSearchLogStorage _storage;

    public ElasticLogStorageAdapter(ElasticSearchLogStorage storage)
    {
        _storage = storage;
    }

    public void Save(LogMessage message)
    {
        _storage.Save(new ElasticLogMessage(ToLevel(message.Severity), message.Message, message.Timestamp));
    }
`,notes:['Здесь адаптер собирает чужую модель из нашей']});
B({title:'Адаптер для Elastic: перевод уровня',m:'log',key:'у каждого хранилища свой язык уровней.',cont:true,code:`
    private static string ToLevel(LogSeverity severity)
    {
        return severity switch
        {
            LogSeverity.Information => "info",
            LogSeverity.Warning => "warn",
            LogSeverity.Error => "error",
            _ => throw new ArgumentOutOfRangeException(nameof(severity)),
        };
    }
}
`});
D({title:'Что адаптер переводит',key:'клиентский код видит только `ILogStorage` и не знает, куда пишутся логи.',body:tbl(['Что переводим','Было (наше)','Стало (их)'],[['Форму вызова','один параметр-объект','три параметра (Postgres)'],['Типы','`DateTimeOffset`, `LogSeverity`','`DateTime` в UTC, `int` или `string`'],['Модель','`LogMessage`','`ElasticLogMessage`']],{fs:30,fb:true,pad:22,w:'1400px'})});
C({title:'Какие принципы это реализует',key:'хранилище меняется прозрачно для кода, который пишет логи.',items:['OCP через Protected Variations (лекция 3)','Новое хранилище — новый адаптер, старый код не меняется','DIP — клиент зависит от своей абстракции, а не от библиотеки']});
(function(){const zone=(lab,inner,c,r)=>`<div style="border:3px solid ${c};border-radius:30px;padding:64px 44px 40px;position:relative;display:flex;align-items:center;gap:22px"><span style="position:absolute;top:16px;${r?'right':'left'}:30px;font-size:26px;font-weight:700;color:${c}">${lab}</span>${inner}</div>`;
const body=`<div style="display:flex;align-items:center">${zone('наш код',`${bx('наш домен',{c:'ink'})}${ar('r',60)}${bx('наш интерфейс',{c:'ink'})}${ar('r',60)}<div style="width:150px"></div>`,K.acc)}<div style="margin:0 -125px;position:relative;z-index:1">${bx('адаптер',{c:'acc',fw:700,sw:4,pad:'22px 34px',fs:32})}</div>${zone('библиотека',`<div style="width:150px"></div>${ar('r',60)}${bx('библиотека',{c:'line'})}`,K.line,true)}</div>${note('«если интерфейс сервиса вдруг изменится, например, после выхода новой версии сторонней библиотеки» — с. 151',true)}`;
D({title:'Изоляция объектной модели',key:'граница чужой библиотеки проходит через один класс.',body});})();
A({title:'Адаптер классов — только для C++',defs:[{t:'Адаптер классов не нуждается во вложенном объекте, так как он одновременно наследует и существующий и сервисный интерфейс.',s:'book',p:'с. 151'}],after:"В C# класс наследует только один класс — такой адаптер невозможен. И не нужен: наследование для переиспользования не используем (Don't 11)",afterIcon:'cpp'});
(function(){const stack=(lab)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:14px"><div style="font-size:24px;color:${K.ink};text-align:center;max-width:380px">${md(lab)}</div><div style="border:3px solid ${K.warn};border-radius:24px;padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px">${Array.from({length:8}).map(()=>`<div style="width:130px;height:36px;border:2px solid ${K.ink};border-radius:10px"></div>`).join('')}</div></div>`;
const body=`<div style="display:flex;flex-direction:column;align-items:center;gap:24px"><div style="display:flex;align-items:center;gap:12px;font-size:32px;font-weight:700;color:${K.warn}">${ic('warn',38,K.warn)}<span>один огромный коммит</span></div><div style="display:flex;align-items:center;gap:30px">${stack('код, который вызывает `ILogStorage`')}${ar('r',70)}${bx('`ILogStorage`',{c:'ink',fw:600})}${ar('l',70)}${stack('реализации `ILogStorage`')}</div></div>`;
D({title:'Адаптивный рефакторинг: задача',key:'сделать логирование асинхронным — значит переписать сразу всех, кто вызывает, и всех, кто реализует.',body});})();
B({title:'Адаптер из старого интерфейса в новый',m:'log',key:'адаптер позволяет менять использования и реализации по отдельности.',hl:['_storage.Save(message);','return Task.CompletedTask;'],code:`
public interface IAsyncLogStorage
{
    Task SaveAsync(LogMessage message);
}

public class AsyncLogStorageAdapter : IAsyncLogStorage
{
    private readonly ILogStorage _storage;

    public AsyncLogStorageAdapter(ILogStorage storage)
    {
        _storage = storage;
    }

    public Task SaveAsync(LogMessage message)
    {
        _storage.Save(message);
        return Task.CompletedTask;
    }
}
`,cpp:'`Task` — аналог `std::future<void>`; `Task.CompletedTask` — уже завершённая задача, как `std::future`, у которого результат готов сразу.'});
(function(){const ok=`<div style="display:flex;align-items:center;gap:12px;font-size:26px;font-weight:600;color:${K.acc}">${ic('check',34,K.acc)}<span>система работает</span></div>`;
const step=(n,t,extra='')=>`<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:22px"><div style="border:2px solid ${K.line};border-radius:24px;padding:28px 30px;display:flex;flex-direction:column;gap:16px;flex:1"><div style="display:flex;align-items:center;justify-content:space-between"><span style="width:56px;height:56px;border-radius:18px;background:${K.acc};color:#FFFFFF;font-size:32px;font-weight:800;display:flex;align-items:center;justify-content:center">${n}</span>${extra}</div><div style="font-size:28px;line-height:1.35;text-wrap:pretty">${md(t)}</div></div>${ok}</div>`;
const crossed=`<div style="position:relative;width:200px;height:100px">${wrapSvg('adapter',200,false)}<svg width="200" height="100" viewBox="0 0 140 70" style="position:absolute;inset:0"><line x1="8" y1="62" x2="132" y2="8" stroke="${K.warn}" style="stroke-width:7;stroke-linecap:round"/></svg></div>`;
const body=`<div style="display:flex;gap:24px;align-items:stretch;width:100%">${step(1,'Вводим `IAsyncLogStorage`, все использования переводим на него; старые реализации — через `AsyncLogStorageAdapter`.')}<div style="align-self:center">${ar('r',50)}</div>${step(2,'Переводим реализации на `IAsyncLogStorage` по одной.')}<div style="align-self:center">${ar('r',50)}</div>${step(3,'Удаляем адаптер и `ILogStorage`.',crossed)}</div>`;
D({title:'Рефакторинг в три шага',key:'адаптер — строительные леса; его цель — исчезнуть.',body});})();
C({title:'Что пишет книга',key:'один плюс и один минус (с. 156).',items:[{t:'Отделяет и скрывает от клиента подробности преобразования различных интерфейсов',i:'check'},{t:'Усложняет код программы за счёт дополнительных классов',i:'warn'}]});
