# Rxjs

> 一组处理 **异步** 、 **事件** 的 js 库

- 异步 ajax、promise、setTimeout...
- 事件 Dom 事件 css 动画 websocket...

---

**Observable (可观察对象)**: 这个概念是一个可调用的请求值或事件的集合

- Observable.of(1,2,3)
- Observable.from([2,3,4])
- Observable.from(fetch('url'))
- Observable.ajax('url')
- Observable.fromEvent(DOM,'click')
- Observable.interval(200)

**Observer (观察者)**: 一个回调函数的集合，它知道如何去监听由 `Observable` 提供的值。(函数)

**Subscription (订阅)**: 表示 `Observable` 的执行，主要用于取消 `Observable` 的执行。表示`Observer` 观察 `Observable` 的这个事件的执行过程，取消之后 `Observer` 不会对 `Observable` 进行观测

**Operators (操作符)**: 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。

**Subject (主体)**: 相当于 `EventEmitter`，并且是将值或事件（即`Observable`产生的）推送给多个 `Observer` 的唯一方式，一对多，避免多次订阅。

**Schedulers (调度器)**: 用来控制并发并且是中央集权的调度员（多个 Observable 产生的资料进行调度），允许我们在发生计算时进行协调，控制并发，例如 setTimeout 或 requestAnimationFrame 或其他。

---

## 官网案例

```javascript
rxjs
  .interval(500) //建立一个定时器（Observable）
  .pipe(rxjs.operators.take(4)) //将每秒的值通过 take 操作符只取前四个
  .subscribe(console.log); //订阅函数执行观测 （Observer）

/*
var sub = rxjs
  .interval(500)
  .pipe(rxjs.operators.take(4))
  .subscribe(console.log);

返回一个 Subscription 可用于取消订阅
如果 var sub = rxjs...
则 sub 就可以调用unsubscribe取消订阅
*/
```

---

## 案例

- 使用

```javascript
//建立可观测的Observable 用于事件监听
let click$ = rxjs.fromEvent(document, "click");
//建立观测者observer 可以是func、也可以以next为健的函数对象
let observer = { next: arg => console.log(arg.type) };
//建立Subject
let sub$ = click$.subscribe(observer);
//取消订阅
sub$.unsubscribe();
```

- 使用 operators

```javascript
//建立可观测的Observable 用于事件监听
let click$ = rxjs.fromEvent(document, "click");
//建立观测者observer 可以是func、也可以以next为健的函数对象
let observer = { next: arg => console.log(arg.type) };

//使用rxjs下operators中的filter进行过滤，满足过滤条件才进行监听
let sub$ = click$
  .pipe(rxjs.operators.filter(i => i.clientX % 2))
  .subscribe(observer);
//取消订阅
sub$.unsubscribe();
```

- 使用 Subject

```javascript
//建立（主体）Subject用于多次订阅
let subject = new rxjs.Subject();
//建立可观测的Observable 用于事件监听
let click$ = rxjs.fromEvent(document, "click");
//建立观测者observer 可以是func、也可以以next为健的函数对象
let observer = { next: arg => console.log(arg.type) };
//使用rxjs下operators中的filter进行过滤，且只取前四，满足多重过滤条件才进行监听
let subject = new rxjs.Subject();
//此时将执行过程订阅到生成的实例对象subject（主体）上
click$
  .pipe(
    rxjs.operators.filter(i => i.clientX % 2),
    rxjs.operators.take(4)
  )
  .subscribe(subject);
//由主体进行分发到不同的订阅事件上
let sub1$ = subject.subscribe(e => console.log("test2", e));
let sub2$ = subject.subscribe(e => console.log("test2", e.clientX));
//依次取消订阅
sub1$.unsubscribe();
sub2$.unsubscribe();
```

---

## rxjs 的应用

**滚动加载**

```javascript
let isRequesting = false; // flag

scrollView.addEventListener("scroll", event => {
  const Dom = event.target;
  if (hasScrolled(Dom) > 1 && !isRequesting) {
    isRequesting = true;
    fetch("url").then(res => {
      //change view
      isRequesting = false;
    });
  }
});
```

两个异步行为，ajax、滚动事件，Promise 并没有解决多个异步的问题

- 我们要使用 flag 去判断状态
- 如果我们需要判断请求的次数，还需要更多的 flag 在外层来记录

例如：

```javascript
let isRequesting = false; // flag1
let requestCount = 0; // flag2

scrollView.addEventListener("scroll", event => {
  const Dom = event.target;
  if (hasScrolled(Dom) > 1 && !isRequesting) {
    isRequesting = true;
    fetch("url").then(res => {
      //change view
      isRequesting = false;
      requestCount = requestCount + 1;
      if (requestCount == 5) {
        scrollView.removeEventListener("scroll", xxx);
      }
    });
  }
});
```

如果使用 rxjs 可读性会增加很多

```javascript
Observable.fromEvent(scrollView, "scroll")
  .pipe(
    map(event => event.target),
    map(hasScrolled),
    filter(i => i > 1),
    exhaustMap(() => fetch("url")),
    take(3),
    retry(4),
    catch(()=>rxjs.of({ success:false , status:-1 }))
  )
  .subscribe(res => {
    //change view
  });
```

---

## Observable 的思想

首先我们想执行一个函数

```javascript
function behavior() {
  console.log("hello");
}

behavior();
```

我们将函数产生的行为通过参数进行传入，可以进行 同步/异步 的触发

```javascript
function behavior(cb) {
  cb();
  setTimeout(() => cb(), 1000);
}

behavior(() => console.log("hello"));
```

将多种行为通过对象传入，执行时调用不同的状态触发不同的函数

```javascript
function behavior(cb) {
  cb.next(1);
  cb.complete(2);
}

behavior({
  next: e => console.log("hello", e),
  error: e => console.log("error", e),
  complete: e => console.log("complete", e),
});
```

尝试用 class 来实现这个功能

```javascript
class Trigget {
  behavior(cb) {
    cb.next(1);
    cb.complete(2);
  }
}
let trigget = new Trigget();

trigget.behavior({
  next: e => console.log("hello", e),
  error: e => console.log("error", e),
  complete: e => console.log("complete", e),
});
```

此时我们的 behavior 方法是写死的，我们想以动态的方式将逻辑注入到 behavior 中

```javascript
class Trigget {
  constructor(arg) {
    this.arg = arg;
  }
  behavior(cb) {
    this.arg(cb);
  }
}
let trigget = new Trigget(cb => {
  cb.next(1);
  cb.complete(2);
});

trigget.behavior({
  next: e => console.log("hello", e),
  error: e => console.log("error", e),
  complete: e => console.log("complete", e),
});
```

重命名

```javascript
class Observable {
  constructor(arg) {
    this.arg = arg;
  }
  subscribe(cb) {
    this.arg(cb);
  }
}
//Observable的行为逻辑...
let obs$ = new Observable(cb => {
  cb.next(1);
  cb.err();
});

// observer 接收到 Observable 的行为
let observer = {
  next: s => console.log("hello", s),
  err: v => console.log("err", v),
  success: () => console.log("success"),
};

obs$.subscribe(observer);
```

**_Programming is thinking, not typing. —  Casey Patton_**
