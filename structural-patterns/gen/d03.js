DIV(5,'Заместитель','Обёртка, которая контролирует доступ к объекту',[4]);
C({title:'Декоратор за одну минуту',m:{chip:'если начинаем второе занятие'},key:'вспоминаем, с чем будем сравнивать.',items:['Тот же интерфейс','Всегда передаёт вызов, добавляет до или после — не вместо','Цепочку собирает клиент'],right:wrapSvg('decorator',620)});
A({title:'Заместитель',defs:[{t:'Заместитель — это структурный паттерн проектирования, который позволяет подставлять вместо реальных объектов специальные объекты-заменители. Эти объекты перехватывают вызовы к оригинальному объекту, позволяя сделать что-то до или после передачи вызова оригиналу.',s:'book',p:'с. 231'}],after:'Также известен как Proxy'});
A({title:'Почти как декоратор — но про контроль',defs:[{t:'Данный паттерн направлен на реализацию логики контроля доступа к объекту, без внесения этой логики в сам тип объекта.',s:'course'}],after:'Логика заместителя инвазивна: может вызвать, не вызвать, вызвать позже или вернуть своё',right:wrapSvg('proxy',600),rw:600});
A({title:'Роли',defs:[{t:'Интерфейс сервиса определяет общий интерфейс для cервиса и заместителя. Благодаря этому, объект заместителя можно использовать там, где ожидается объект сервиса.',s:'book',p:'с. 235'},{t:'Заместитель хранит ссылку на объект сервиса. После того как заместитель заканчивает свою работу (например, инициализацию, логирование, защиту или другое), он передаёт вызовы вложенному сервису. Заместитель может сам отвечать за создание и удаление объекта сервиса.',s:'book',p:'с. 235'}]});
D({title:'Банковский чек',key:'интерфейс общий — платить можно и тем, и другим; но чек сам решает, когда обратиться к деньгам.',body:`<div style="display:flex;align-items:center;gap:60px"><div style="display:flex;flex-direction:column;align-items:center;gap:16px"><svg width="300" height="200" viewBox="0 0 300 200" fill="none" stroke="${K.ink}" style="stroke-width:4;stroke-linejoin:round;display:block"><rect x="40" y="20" width="240" height="130" rx="14"/><rect x="28" y="36" width="240" height="130" rx="14" fill="#FFFFFF"/><rect x="16" y="52" width="240" height="130" rx="14" fill="#FFFFFF"/><circle cx="136" cy="117" r="30"/><path d="M40 82 v0" style="stroke-width:8;stroke-linecap:round"/><path d="M232 152 v0" style="stroke-width:8;stroke-linecap:round"/></svg><span style="font-size:30px">наличные</span></div>
<div style="display:flex;flex-direction:column;align-items:center;gap:10px"><span style="font-size:80px;font-weight:800;color:${K.acc};line-height:1">=</span><span style="font-size:26px;font-weight:600;color:${K.acc};text-align:center;max-width:260px">общий интерфейс: оплатить</span></div>
<div style="display:flex;flex-direction:column;align-items:center;gap:16px"><svg width="340" height="200" viewBox="0 0 340 200" fill="none" stroke="${K.ink}" style="stroke-width:4;stroke-linecap:round;stroke-linejoin:round;display:block"><rect x="10" y="30" width="320" height="150" rx="14"/><path d="M36 70 h140"/><path d="M36 104 h200"/><path d="M226 66 h80"/><path d="M36 146 h120"/><path d="M200 152 c14 -26 24 -26 30 0 s18 22 30 -4 s16 -10 34 0"/></svg><span style="font-size:30px">чек</span></div></div>${note('аналогия книги, с. 233–234')}`});
D({title:'Четыре вида',key:'вид заместителя — это то, что именно он контролирует.',body:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;width:100%;max-width:1400px">${card('Виртуальный','когда создать',{fs:34})}${card('Защищающий','кого пустить',{fs:34})}${card('Кеширующий','вызывать ли вообще',{fs:34})}${card('Удалённый','где выполнить',{fs:34})}</div>`});
C({title:'Виртуальный заместитель',key:'отложить тяжёлую инициализацию, которая может и не понадобиться.',items:['Объект создаётся при первом вызове','Книга, с. 239: “Ленивая инициализация (виртуальный прокси)”']});
B({title:'Сервис и его фабрика',m:'gear',key:'создание отдаём фабрике из лекции 5.',code:`
public record OperationArgs;

public interface IService
{
    void DoOperation(OperationArgs args);
}

public class Service : IService
{
    public void DoOperation(OperationArgs args) { }
}

public interface IServiceFactory
{
    IService Create();
}
`});
B({title:'Виртуальный заместитель',m:'gear',key:'заместитель решает только **когда** создавать, но не **что**.',hl:['_service = new Lazy<IService>(factory.Create);'],code:`
public class VirtualService : IService
{
    private readonly Lazy<IService> _service;

    public VirtualService(IServiceFactory factory)
    {
        _service = new Lazy<IService>(factory.Create);
    }

    public void DoOperation(OperationArgs args)
    {
        _service.Value.DoOperation(args);
    }
}
`,notes:['`Lazy<T>` — из лекции 5: фабрика вызовется ровно один раз, даже из нескольких потоков','Сервис создаётся внутри — ассоциация'],cpp:'`factory.Create` без скобок — ссылка на метод, передаётся как функция, примерно как лямбда `[&]{ return factory.Create(); }`.'});
B({title:'Защищающий заместитель',m:'gear',key:'пропускает вызов, только если пользователь авторизован.',hl:['if (_userInfoProvider.GetUserInfo().IsAuthenticated)'],code:`
public record UserInfo(bool IsAuthenticated);

public interface IUserInfoProvider
{
    UserInfo GetUserInfo();
}

public class ServiceAuthorizationProxy : IService
{
    private readonly IService _service;
    private readonly IUserInfoProvider _userInfoProvider;

    public ServiceAuthorizationProxy(IService service, IUserInfoProvider userInfoProvider)
    {
        _service = service;
        _userInfoProvider = userInfoProvider;
    }

    public void DoOperation(OperationArgs args)
    {
        if (_userInfoProvider.GetUserInfo().IsAuthenticated)
            _service.DoOperation(args);
    }
}
`});
C({title:'Вопрос к этому коду',warn:true,key:'пользователь не авторизован — что узнает вызывающий код? Ничего.',items:[{t:'Метод молча вернётся, будто операция прошла',i:'warn'},"Бросить исключение? Отказ — ожидаемый сценарий, а исключения для бизнес-ошибок не используем (Don't 22)",{t:'Заложить отказ в контракт — Result-тип из лекции 4',i:'check'}]});
B({title:'Отказ как часть контракта',m:'gear',key:'отдельный пример — у сервиса другой интерфейс.',code:`
public abstract record OperationResult
{
    private OperationResult() { }

    public sealed record Completed : OperationResult;

    public sealed record AccessDenied : OperationResult;
}

public interface IService
{
    OperationResult DoOperation(OperationArgs args);
}
`});
B({title:'Заместитель с Result-типом',m:'gear',key:'вызывающий обязан обработать отказ.',hl:['return new OperationResult.AccessDenied();'],code:`
public class ServiceAuthorizationProxy : IService
{
    private readonly IService _service;
    private readonly IUserInfoProvider _userInfoProvider;

    public ServiceAuthorizationProxy(IService service, IUserInfoProvider userInfoProvider)
    {
        _service = service;
        _userInfoProvider = userInfoProvider;
    }

    public OperationResult DoOperation(OperationArgs args)
    {
        if (_userInfoProvider.GetUserInfo().IsAuthenticated is false)
            return new OperationResult.AccessDenied();

        return _service.DoOperation(args);
    }
}
`,notes:['Guard clause (Do 14)','Если заместитель может не выполнить вызов, интерфейс должен уметь это выразить']});
B({title:'Кеширующий заместитель: сервис',m:'gear',key:'долгая операция, результат которой можно запомнить.',code:`
public record OperationArgs;

public record OperationResult;

public interface IService
{
    OperationResult DoOperation(OperationArgs args);
}

public class Service : IService
{
    public OperationResult DoOperation(OperationArgs args) { ... }
}
`});
B({title:'Кеширующий заместитель',m:'gear',key:'при попадании в кеш сервис не вызывается вовсе — декоратор так не может.',hl:['return result;'],code:`
public class CachingServiceProxy : IService
{
    private readonly IService _service;
    private readonly Dictionary<OperationArgs, OperationResult> _cache = new();

    public CachingServiceProxy(IService service)
    {
        _service = service;
    }

    public OperationResult DoOperation(OperationArgs args)
    {
        if (_cache.TryGetValue(args, out var result))
            return result;

        return _cache[args] = _service.DoOperation(args);
    }
}
`,cpp:'`TryGetValue(args, out var result)` — поиск без исключения: `true` и значение в `result`, если ключ есть, как `find` + проверка `!= end()`. `return _cache[args] = …` — присваивание в C# тоже выражение, как в C++.'});
C({title:'Почему `record` подходит как ключ',key:'`record` сравнивается по значению — одинаковые аргументы дают один ключ.',items:['С `class` каждый новый объект аргументов — промах кеша','Сравнение по значению — лекция 1',{t:'Коллекция внутри `record` сравнивается по ссылке',i:'warn'}]});
C({title:'Чего этот кеш не умеет',warn:true,key:'учебный кеш — не рабочий.',items:['Растёт бесконечно','Никогда не устаревает','`Dictionary` не потокобезопасен']});
D({title:'Удалённый заместитель — прокси-адаптер',key:'в памяти нет объекта, который он замещает, — только средства до него дотянуться.',left:['Примеры: клиент по описанию gRPC-сервиса · типизированный HTTP-клиент'],lw:380,body:`<div style="display:flex;align-items:center;gap:18px">${bx('клиент',{c:'ink'})}${ar('r',56)}<div style="border:3px solid ${K.acc};border-radius:22px;padding:18px 24px;display:flex;flex-direction:column;align-items:center;gap:8px"><span style="font-size:28px;font-weight:600">заместитель</span><span style="font-size:24px">реализует <code style="font-family:${MONO}">IService</code></span><span style="font-size:24px;color:${K.ink2}">HTTP-клиент / канал gRPC</span></div>${ar('r',56)}<div style="display:flex;flex-direction:column;align-items:center"><svg width="190" height="120" viewBox="0 0 190 120" fill="none" stroke="${K.ink}" style="stroke-width:4;stroke-linejoin:round;display:block"><path d="M46 104 h104 a32 32 0 0 0 0-64 a44 44 0 0 0-84-6 a36 36 0 0 0-20 70z"/></svg><span style="font-size:26px;margin-top:-6px">сеть</span></div>${ar('r',56)}${bx('удалённый сервис',{c:'line',w:220})}</div>${note('«заместитель транслирует запросы клиента в вызовы по сети» — с. 240',true)}`});
F({title:'Книга и курс: что считать заместителем',key:'если обёртка не контролирует вызов — это не заместитель.',book:{p:'с. 240–241',quote:'«Логирование запросов (логирующий прокси). Когда требуется хранить историю обращений к сервисному объекту.»',after:'Сервисный объект чаще всего создаёт сам заместитель (с. 241)'},course:['Логирование только добавляет поведение — это декоратор','Сервис — через конструктор (Do 13)','Сам создаёт только виртуальный — через фабрику'],rule:'Перед тем как назвать обёртку прокси — найдите, что она контролирует'});
D({title:'Что пишет книга',key:'три плюса и два минуса (с. 242).',ba:'stretch',bj:'flex-start',body:twoCol([{t:'Позволяет контролировать сервисный объект незаметно для клиента',i:'check'},{t:'Может работать, даже если сервисный объект ещё не создан',i:'check'},{t:'Может контролировать жизненный цикл служебного объекта',i:'check'}],[{t:'Усложняет программу за счёт дополнительных классов',i:'warn'},{t:'Увеличивает время отклика от сервиса',i:'warn'}])});

DIV(6,'Декоратор или заместитель?','Основа одна — композиция; назначение разное',[3,4]);
D({title:'В чём путаница',key:'структура одинаковая, поэтому многие не знают различий.',body:`<div style="display:flex;gap:110px;align-items:flex-start">${[['decorator','Декоратор'],['proxy','Заместитель']].map(([v,n])=>`<div style="display:flex;flex-direction:column;align-items:center;gap:24px">${wrapSvg(v,640)}<span style="font-size:34px;font-weight:700">${n}</span></div>`).join('')}</div>`});
D({title:'Три различия',key:'декоратор расширяет, заместитель контролирует.',body:tbl(['Критерий','Декоратор','Заместитель'],[['Вид композиции','всегда агрегация: обёрнутый объект приходит извне, никакого контроля над ним','агрегация или ассоциация: может получить объект извне, а может создать сам (виртуальный заместитель) и управлять им'],['Вызов обёрнутого','**Extended Dispatch:** только добавляет поведение, вызов не блокирует никогда','**Controlled Dispatch:** может заблокировать вызов или заменить его возвратом кешированных данных'],['Наличие обёрнутого объекта','всегда есть','может не быть (удалённый заместитель)']],{fs:27,fb:true,cw:['20%','38%','42%']})});
A({title:'Что говорит книга',defs:[{t:'Адаптер предоставляет классу альтернативный интерфейс. Декоратор предоставляет расширенный интерфейс. Заместитель предоставляет тот же интерфейс.',s:'book',p:'с. 157, 203, 242'},{t:'Декоратор и Заместитель имеют похожие структуры, но разные назначения. Они похожи тем, что оба построены на композиции и делегировании работы другому объекту. Паттерны отличаются тем, что Заместитель сам управляет жизнью сервисного объекта, а обёртывание Декораторов контролируется клиентом.',s:'book',p:'с. 205'}]});
C({title:'Итог сравнения',bigKey:'«Декоратор — про расширение логики без изменения существующей. Заместитель — про контроль над обёрнутым объектом»',items:['Удалённое выполнение — одна из вариаций заместителя, на деле самая популярная']});
E({m:'lr2',q:'Декоратор или заместитель?',hint:'Может ли обёртка не вызвать сервис — или вызвать его не один раз?',table:`<div style="display:flex;flex-direction:column;gap:14px"><div style="font-size:26px;color:${K.ink2}">У всех обёрток тот же интерфейс, что у сервиса</div>${tbl(null,[['1. Пишет в лог аргументы и вызывает сервис.'],['2. Замеряет время вызова.'],['3. Возвращает сохранённый результат, если такие аргументы уже были.'],['4. Не пускает неавторизованного пользователя.'],['5. Создаёт сервис при первом вызове.'],['6. При ошибке повторяет вызов до трёх раз.']],{fs:30,pad:11,w:'1200px'})}</div>`});
(function(){const d={h:`<span style="color:${K.acc};font-weight:700">декоратор</span>`},z={h:`<span style="color:${K.ink2};font-weight:700">заместитель</span>`};
D({title:'Ответы',key:'повтор выглядит как добавка, но решает, сколько раз пойдёт вызов, — это контроль.',body:tbl(['Обёртка','Ответ','Почему'],[['Пишет в лог аргументы и вызывает сервис',d,'только добавляет «до»'],['Замеряет время вызова',d,'добавляет «до» и «после»'],['Возвращает сохранённый результат',z,'может не вызвать сервис'],['Не пускает неавторизованного',z,'может заблокировать вызов'],['Создаёт сервис при первом вызове',z,'управляет жизнью сервиса'],['Повторяет вызов до трёх раз',z,'решает, сколько раз вызвать']],{fs:28,pad:12,cw:['46%','20%','34%']})});})();

DIV(7,'Фасад','Простой вход в сложную подсистему — на один сценарий',[5]);
A({title:'Фасад',defs:[{t:'Фасад — это структурный паттерн проектирования, который предоставляет простой интерфейс к сложной системе классов, библиотеке или фреймворку.',s:'book',p:'с. 206'}],after:'Формулировка курса: простая абстракция над сложной логикой. Ничего не напоминает? Похоже на мост'});
A({title:'Урезанный, но нужный интерфейс',defs:[{t:'Фасад — это простой интерфейс работы со сложной подсистемой, содержащей множество классов. Фасад может иметь урезанный интерфейс, не имеющий 100% функциональности, которую можно достичь, используя сложную подсистему напрямую. Но он предоставляет именно те фичи, которые нужны клиенту, и скрывает все остальное.',s:'book',p:'с. 207'}],rw:520,
right:`<div style="display:flex;align-items:center;gap:20px"><svg width="110" height="150" viewBox="0 0 110 150" fill="none" stroke="${K.ink}" style="stroke-width:5;stroke-linejoin:round;stroke-linecap:round;display:block"><path d="M30 10 h26 v34 h-14 c0 22 6 44 18 62 l10 -8 l20 22 c-10 12 -24 22 -38 14 c-26 -16 -48 -64 -44 -110 c1 -8 10 -14 22 -14z"/></svg><div style="display:flex;flex-direction:column;gap:18px;border-left:3px solid ${K.acc};padding-left:0">${['склад','оплата','доставка'].map(t=>`<div style="display:flex;align-items:center"><div style="width:40px;height:3px;background:${K.acc}"></div>${bx(t,{c:'ink',fs:28,w:220})}</div>`).join('')}</div></div>${note('аналогия книги — заказ по телефону, с. 208')}`});
A({title:'Роль фасада',defs:[{t:'Фасад предоставляет быстрый доступ к определённой функциональности подсистемы. Он «знает», каким классам нужно переадресовать запрос, и какие данные для этого нужны.',s:'book',p:'с. 209'}],after:'Классы подсистемы не знают о фасаде и работают друг с другом напрямую (с. 210)',rw:600,right:`${wrapSvg('facade',600)}<span style="font-size:24px;color:${K.ink2}">справа внутри — классы подсистемы</span>`});
C({title:'Фасад на курсе',key:'фасад — сервис, который оркестрирует одну операцию несколькими модулями.',items:['Клиент не знает деталей реализации сложной логики','Одна операция — один фасад']});
B({title:'Запрос и ответ',m:'box',key:'сценарий «оформить заказ» — вход и все возможные исходы.',hl:['public sealed record Placed(OrderId OrderId) : PlaceOrderResponse;','public sealed record OutOfStock(ProductId ProductId) : PlaceOrderResponse;'],code:`
public sealed record CustomerId(Guid Value);

public sealed record ProductId(Guid Value);

public sealed record OrderId(Guid Value);

public sealed record OrderLine(ProductId ProductId, int Quantity);

public sealed record Order(OrderId Id, CustomerId CustomerId, IReadOnlyCollection<OrderLine> Lines);

public sealed record PlaceOrderRequest(CustomerId CustomerId, IReadOnlyCollection<OrderLine> Lines);

public abstract record PlaceOrderResponse
{
    private PlaceOrderResponse() { }

    public sealed record Placed(OrderId OrderId) : PlaceOrderResponse;

    public sealed record OutOfStock(ProductId ProductId) : PlaceOrderResponse;
}
`});
B({title:'Подсистема и интерфейс фасада',m:'box',key:'три части подсистемы и одна точка входа.',hl:['PlaceOrderResponse PlaceOrder(PlaceOrderRequest request);'],code:`
public interface IInventory
{
    ProductId? FindUnavailable(IReadOnlyCollection<OrderLine> lines);

    void Reserve(IReadOnlyCollection<OrderLine> lines);
}

public interface IOrderRepository
{
    Order Add(CustomerId customerId, IReadOnlyCollection<OrderLine> lines);
}

public interface INotificationSender
{
    void SendOrderPlaced(CustomerId customerId, OrderId orderId);
}

public interface IPlaceOrderFacade
{
    PlaceOrderResponse PlaceOrder(PlaceOrderRequest request);
}
`,cpp:'`ProductId?` у ссылочного типа — пометка «может быть `null`»; компилятор предупредит, если использовать без проверки. Как `T*`, который может быть `nullptr`, против ссылки `T&`.'});
B({title:'Фасад: зависимости',m:'box',key:'подсистема приходит в конструктор — фасад её не создаёт.',code:`
public class PlaceOrderFacade : IPlaceOrderFacade
{
    private readonly IInventory _inventory;
    private readonly IOrderRepository _orders;
    private readonly INotificationSender _notifications;

    public PlaceOrderFacade(IInventory inventory, IOrderRepository orders, INotificationSender notifications)
    {
        _inventory = inventory;
        _orders = orders;
        _notifications = notifications;
    }
`,notes:['Do 13 — зависимости аргументами']});
B({title:'Фасад: сценарий',m:'box',key:'порядок шагов спрятан в фасаде; клиент знает только «запрос → ответ».',cont:true,hl:['_inventory.Reserve(request.Lines);','Order order = _orders.Add(request.CustomerId, request.Lines);','_notifications.SendOrderPlaced(request.CustomerId, order.Id);'],code:`
    public PlaceOrderResponse PlaceOrder(PlaceOrderRequest request)
    {
        ProductId? unavailable = _inventory.FindUnavailable(request.Lines);

        if (unavailable is not null)
            return new PlaceOrderResponse.OutOfStock(unavailable);

        _inventory.Reserve(request.Lines);
        Order order = _orders.Add(request.CustomerId, request.Lines);
        _notifications.SendOrderPlaced(request.CustomerId, order.Id);

        return new PlaceOrderResponse.Placed(order.Id);
    }
}
`,notes:["“Не найдено” — `null` (Don't 5)","Отказ — вариант ответа, не исключение (Don't 22)"]});
A({title:'Главная опасность',defs:[{t:'Фасад рискует стать божественным объектом, привязанным ко всем классам программы.',s:'book',p:'с. 214'}],list:[{t:'зависит от всех типов системы — нарушение SRP',i:'warn'},{t:'сильная связанность, проблемы с рефакторингом и расширяемостью',i:'warn'},{t:'общая приватная логика вместо переиспользуемых абстракций',i:'warn'}]});
B({title:'Как выглядит фасад-бог',warn:true,m:'box',key:'восемь зависимостей, и каждому методу нужна лишь часть.',wl:['private decimal RecalculateTotal(Order order) { ... }','private bool CanBeModified(Order order) { ... }'],code:`
public class OrderFacade
{
    public OrderFacade(
        IInventory inventory,
        IOrderRepository orders,
        INotificationSender notifications,
        IPaymentCalculator payments,
        IDeliveryService delivery,
        IRefundService refunds,
        ICustomerRepository customers,
        IDiscountPolicy discounts) { ... }

    public PlaceOrderResponse PlaceOrder(PlaceOrderRequest request) { ... }
    public CancelOrderResponse CancelOrder(CancelOrderRequest request) { ... }
    public ReturnItemResponse ReturnItem(ReturnItemRequest request) { ... }
    public ChangeAddressResponse ChangeAddress(ChangeAddressRequest request) { ... }
    public OrderHistoryResponse GetHistory(OrderHistoryRequest request) { ... }

    private decimal RecalculateTotal(Order order) { ... }
    private bool CanBeModified(Order order) { ... }
}
`,notes:['Приватная общая логика заперта внутри — другим модулям её не переиспользовать']});
D({title:'Один фасад — один сценарий',key:'узкий фасад заставляет выносить общую логику в отдельные абстракции.',left:['Request-response модель','Один фасад — один юзкейс слоя'],body:`<div style="display:flex;align-items:center;gap:40px">${bx('`OrderFacade`',{c:'warn',pad:'90px 40px',fs:30,fw:600})}${ar('r',90)}<div style="display:flex;flex-direction:column;align-items:flex-start;gap:20px">${['PlaceOrderFacade','CancelOrderFacade','ReturnItemFacade'].map((t,i)=>`<div style="display:flex;align-items:center;gap:16px">${bx('`'+t+'`',{c:'acc',fs:28,w:380})}${i<2?`<span style="font-size:24px;color:${K.acc}">→ <code style="font-family:${MONO}">CanBeModified</code></span>`:''}</div>`).join('')}<div style="margin-top:10px">${bx('`CanBeModified`',{c:'ink',fs:28})}</div></div></div>`});
D({title:'Фасад и контроллер из GRASP',key:'контроллер — часть представления, фасад — часть бизнес-логики; живут бок о бок.',left:['use-case-group контроллеры','use-case фасады'],body:`<div style="display:flex;flex-direction:column;gap:0;width:100%;max-width:1100px">${[['представление',`<div style="border:3px solid ${K.ink};border-radius:20px;padding:16px 24px;display:flex;align-items:center;gap:28px;font-family:${MONO};font-size:26px"><span style="font-weight:700">OrdersController</span>${['Place','Cancel','Return'].map(m=>`<span style="border:2px solid ${K.line};border-radius:10px;padding:4px 14px">${m}</span>`).join('')}</div>`],['',`<div style="display:flex;gap:120px;padding-left:330px">${[0,1,2].map(()=>ar('d',60,K.acc)).join('')}</div>`],['бизнес-логика',`<div style="display:flex;gap:20px">${['PlaceOrderFacade','CancelOrderFacade','ReturnItemFacade'].map(t=>bx('`'+t+'`',{c:'acc',fs:24,pad:'14px 18px'})).join('')}</div>`]].map(([l,c])=>l?`<div style="border:2px solid ${K.line};border-radius:26px;padding:20px 28px;display:flex;flex-direction:column;gap:14px"><span style="font-size:24px;font-weight:600;color:${K.ink2}">слой «${l}»</span>${c}</div>`:`<div style="padding:10px 0">${c}</div>`).join('')}</div>`});
F({title:'Книга и курс: фасад',key:'фасад не создаёт подсистему, не бывает одиночкой и с самого начала узкий.',book:{items:['«Фасад должен будет позаботиться о том, чтобы правильно инициализировать объекты подсистемы» (с. 213–214)','«Фасад можно сделать Одиночкой, так как обычно нужен только один объект-фасад» (с. 215)','При размывании ответственности — «подумайте о введении дополнительных фасадов» (с. 214)']},course:['Подсистема — через конструктор (Do 13)','Одиночку не делаем — лекция 5','Один сценарий — один фасад с самого начала'],rule:'Назовите сценарий, за который отвечает ваш фасад, одной фразой'});
A({title:'Фасад и адаптер',defs:[{t:'Фасад задаёт новый интерфейс, тогда как Адаптер повторно использует старый. Адаптер оборачивает только один класс, а Фасад оборачивает целую подсистему.',s:'book',p:'с. 157, 214'}]});

DIV(8,'Легковес','Используйте память грамотно',[6]);
A({title:'Легковес',defs:[{t:'Легковес — это структурный паттерн проектирования, который позволяет вместить бóльшее количество объектов в отведённую оперативной память за счёт экономного разделения общего состояния объектов между собой, вместо хранения одинаковых данных в каждом объекте.',s:'book',p:'с. 217'}],after:'Также известен как “Приспособленец”, “Кэш”, Flyweight'});
C({title:'Ещё один фундаментальный паттерн',key:'экономия памяти через декомпозицию.',items:['Много объектов с одинаковым набором данных','Этот набор — в отдельную модель','Один её объект — во множестве других']});
A({title:'Внутреннее и внешнее состояние',defs:[{t:'Неизменяемые данные объекта принято называть «внутренним состоянием». Все остальные данные — это «внешнее состояние».',s:'book',p:'с. 219'}]});
A({title:'Легковес неизменяем',defs:[{t:'Так как объекты легковесов будут использованы в разных контекстах, вы должны быть уверены в том, что их состояние невозможно изменять после создания. Всё внутреннее состояние легковес должен получать через параметры конструктора. Он не должен иметь сеттеров и публичных полей.',s:'book',p:'с. 222'}],after:'Неизменяемость (Do 10) здесь — условие корректности: изменили общий объект — изменились тысячи объектов сразу'});
D({title:'Считаем',m:'target',key:'24 ГБ против 768 КБ.',body:tbl(['','Без легковеса','С легковесом'],[['Объектов на поле','100 000','100 000'],['Тяжёлые данные (текстура + модель)','у каждого своя копия, ≈ 256 КБ','3 общих объекта — по одному на вид'],['Итого тяжёлых данных','100 000 × 256 КБ ≈ **24 ГБ**',{h:`<span>3 × 256 КБ = </span><strong style="font-weight:800;color:${K.acc}">768 КБ</strong>`}],['У каждого объекта','позиция, скорость','позиция, скорость + ссылка на вид']],{fs:28,pad:16,fb:true,cw:['30%','34%','36%']})+note('256 КБ — условная цифра; важен порядок · пример курса и книги, с. 218')});
B({title:'Легковес и контекст',m:'target',key:'вид — общий и неизменяемый, у каждого объекта — только своё и ссылка на вид.',hl:['public sealed record BulletKind(string Name, Texture Texture, Mesh Mesh);'],code:`
public sealed class Texture { ... }

public sealed class Mesh { ... }

public sealed record BulletKind(string Name, Texture Texture, Mesh Mesh);

public readonly record struct Position(float X, float Y, float Z);

public readonly record struct Velocity(float X, float Y, float Z);

public sealed record Bullet(BulletKind Kind, Position Position, Velocity Velocity);
`,notes:['`BulletKind` — легковес, внутреннее состояние','`Bullet` — контекст, внешнее состояние'],cpp:'`readonly record struct` — неизменяемый тип-значение: копируется целиком, как `struct` в C++, не создаёт отдельного объекта в куче.'});
B({title:'Где взять легковес: интерфейсы',m:'target',key:'легковесы выдаёт фабрика — точка кеширования и создания.',code:`
public interface IAssetLoader
{
    Texture LoadTexture(string name);

    Mesh LoadMesh(string name);
}

public interface IBulletKindFactory
{
    BulletKind Get(string name);
}
`});
B({title:'Кеширующая фабрика',m:'target',key:'уже созданный вид отдаём повторно, новый — грузим один раз.',hl:['return kind;'],code:`
public class CachingBulletKindFactory : IBulletKindFactory
{
    private readonly IAssetLoader _assets;
    private readonly Dictionary<string, BulletKind> _cache = new();

    public CachingBulletKindFactory(IAssetLoader assets)
    {
        _assets = assets;
    }

    public BulletKind Get(string name)
    {
        if (_cache.TryGetValue(name, out var kind))
            return kind;

        return _cache[name] = new BulletKind(name, _assets.LoadTexture(name), _assets.LoadMesh(name));
    }
}
`});
(function(){const sil=`<div style="background:${K.code};border-radius:16px;padding:18px 22px;font-family:${MONO};font-size:24px;line-height:1.45"><div>есть в словаре?</div><div style="padding-left:2ch">верни</div><div style="padding-left:2ch">: создай и запомни</div></div>`;
D({title:'Та же форма — другая задача',key:'паттерн — это проблема, а не форма кода.',body:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;width:100%">${[['Кеширующий заместитель','экономит **время** повторных вызовов'],['Фабрика легковесов','экономит **память** на одинаковых данных']].map(([h,b])=>`<div style="border:2px solid ${K.line};border-radius:24px;padding:30px 34px;display:flex;flex-direction:column;gap:20px">${sil}<div style="font-size:34px;font-weight:700">${h}</div><div style="font-size:32px;line-height:1.35">${md(b)}</div></div>`).join('')}</div>`});})();
F({title:'Книга и курс: статическая фабрика',key:'кеш легковесов — обычный объект, не глобальное состояние.',book:{p:'с. 223',quote:'«Обычно этот метод добавляют в контейнер легковесов либо создают отдельный класс-фабрику. Его даже можно сделать статическим и поместить в класс легковесов.»'},course:['Статический кеш живёт всё время работы и доступен отовсюду (Do 7)','Те же претензии, что к одиночке в лекции 5','Фабрика — объект с зависимостями через конструктор (Do 13)'],rule:'Никакой статики в фабрике легковесов'});
C({title:'Легковес уже есть в .NET',key:'платформа сама делит неизменяемые данные.',items:['Интернирование строк: одинаковые строковые литералы — один объект в памяти','`Array.Empty<T>()` — один общий пустой массив на каждый тип']});
D({title:'Когда применять',key:'только когда выполнены **все** условия — иначе это преждевременная оптимизация (Do 21).',ba:'stretch',bj:'flex-start',body:twoCol(['большое число объектов','из-за этого высоки расходы памяти','большую часть состояния можно вынести','много групп заменяются небольшим числом разделяемых'],[{t:'Расходует процессорное время на поиск/вычисление контекста',i:'warn'},{t:'Усложняет код программы за счёт множества дополнительных классов',i:'warn'}],{heads:['Условия из книги (с. 228)','Минусы (с. 229)']})});

blk(9,null);
D({title:'Обёртки: что делают с вызовом',key:'различаем по интерфейсу и по тому, что происходит с вызовом.',body:tbl(['Паттерн','Интерфейс относительно обёрнутого','Что делает с вызовом'],[['adapter','Адаптер','другой','переводит'],['decorator','Декоратор','тот же (или расширенный)','всегда передаёт, добавляет до/после'],['proxy','Заместитель','тот же','может не передать, передать позже, заменить'],['facade','Фасад','новый, на один сценарий','оркестрирует несколько объектов']].map(([v,n,a,b])=>[{h:`<div style="display:flex;align-items:center;gap:20px">${wrapSvg(v,150,false)}<span style="font-weight:700">${n}</span></div>`},a,b]),{fs:28,pad:10,va:'middle',cw:['34%','30%','36%']})});
D({title:'Остальные три',key:'два фундаментальных паттерна и одно дерево.',body:tbl(['Паттерн','Задача','Что делает'],[['Мост','абстракции разного уровня','высокий уровень делегирует низкому; проектируется заранее'],['Компоновщик','дерево как один объект','раздаёт вызов детям и агрегирует результат'],['Легковес','память на одинаковых данных','делит неизменяемые данные; не обёртка']],{fs:30,pad:20,fb:true,cw:['22%','32%','46%']})});
C({title:'Что спросят на защите ЛР2',m:'lr2',key:'вопросы о решениях, а не о синтаксисе.',items:['Почему это адаптер, а не декоратор? Какой интерфейс он меняет?','Ваша обёртка может не вызвать обёрнутый объект? Тогда что это?','Кто создаёт обёрнутый объект и почему не сама обёртка?']});
C({title:'Что спросят на защите ЛР2, продолжение',m:'lr2',key:'будьте готовы показать это в своём коде.',items:['Где мост — какие абстракции верхнего и нижнего уровня?','За какой сценарий отвечает ваш фасад? Почему у него столько зависимостей?','Может ли дерево вашего компоновщика измениться после создания?']});
D({title:'Книга и курс: сводка',key:'читаете книгу — помните, где на курсе иначе.',body:tbl(['Тема','Курс'],[['Связи между объектами','композиция = агрегация + ассоциация (лекция 1)'],['Мост','без терминов «абстракция / реализация»'],['Компоновщик','никаких `Add` в интерфейсе компонента'],['Декоратор','без базового класса'],['Заместитель','логирование — это декоратор; сервис через конструктор'],['Фасад и легковес','без одиночек и статики; фасад — на один сценарий']],{fs:28,pad:12,fb:true,cw:['30%','70%']})});
frame('Вопросы',`<div style="display:flex;flex-direction:column;justify-content:center;flex:1;gap:32px"><h1 style="margin:0;font-size:160px;line-height:1;font-weight:800;letter-spacing:-0.035em">Вопросы?</h1></div><div style="font-size:30px;color:${K.ink2}">Следующая тема — поведенческие паттерны</div>`,{noInd:true});
