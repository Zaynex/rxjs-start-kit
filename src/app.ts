import { Observable, Observer, Subject, Subscription, BehaviorSubject, ReplaySubject, AsyncSubject, ObjectUnsubscribedError } from 'rxjs'
import { subscribeOn } from 'rxjs/operator/subscribeOn'
import { debounce } from 'rxjs/operators'

const renderUI = (data: any): void => {
  const span = document.createElement('span')
  span.classList.add('demo')
  span.innerHTML = `${data}`
  document.querySelector('.main').appendChild(span)
}
const input = <HTMLInputElement>document.querySelector('#auto-complete')
const button = <HTMLButtonElement>document.querySelector('button')
// Observable.fromEvent(button, 'click')
//   .subscribe(() => renderUI('clicked'))

// observable.fromEvent(button, 'click')
//   .throttleTime(1000)
//   .scan(count => count + 1, 0)
//   .subscribe(count => renderUI(count))

// const observable = Observable.create((observer: any) => {
//   const id = setInterval(() => {
//     observer.next('hi')
//   }, 1000)
// })

// const subscription = observable.subscribe((x: string) => renderUI(x))

// setTimeout(() => {
//   subscription.unsubscribe()
// }, 4000)

// subject
// const subject = new Subject()
// subject.next(1)

// // 多播，传递给多个观察者
// subject.subscribe({
//   next: (v) => renderUI('observableA:' + v)
// })

// subject.subscribe({
//   next: (v) => renderUI('observableB' + v)
// })




// How subject work
// const source = Observable.from([1, 2, 3])
// const newSubject = new Subject()
// newSubject.subscribe({
//   next: (v) => renderUI('observableA:' + v)
// })
// newSubject.subscribe({
//   next: (v) => renderUI('observableB:' + v)
// })
// source.subscribe(newSubject)


// const multicasted = source.multicast(newSubject)

// multicasted.subscribe((v) => renderUI('observableA:' + v))
// multicasted.subscribe((v) => renderUI('observableB:' + v))

// multicasted.connect()



// RefCount 自动引用计数，对于手动开启 connect和取消订阅
// 当有第一个订阅者时，多播 Observable 会自动地启动执行，而当最后一个订阅者离开时，多播 Observable 会自动地停止执行。


// const source = Observable.interval(500)
// const subject = new Subject()
// const refCounted = source.multicast(subject).refCount()
// let  subscription1: Subscription = null
// let  subscription2: Subscription = null

// console.log('observerA subscribed')
// subscription1 = refCounted.subscribe({
//   next: (v) => renderUI('observerA:' + v)
// })

// setTimeout(() => {
//   console.log(`observerB subscribed`)
//   subscription2 = refCounted.subscribe({
//     next: (v) => renderUI('observerB:' + v)
//   })
// }, 600)

// setTimeout(() => {
//   console.log('observerA unsubscribed')
//   subscription1.unsubscribe()
// }, 1200)

// setTimeout(() => {
//   console.log('observerB unsubscribed')
//   subscription2.unsubscribe()
// }, 2000)


// BehaviorSubject
// 它有一个“当前值”的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”。
// const subject = new BehaviorSubject(0)
// subject.subscribe({
//   next: (v) => renderUI(`observableA:` + v)
// })

// subject.next(1)
// subject.next(2)


// subject.subscribe({
//   next: v => renderUI('observableB:' + v)
// })

// subject.next(3)


// ReplySubject 用来缓存observable
// const subject = new ReplaySubject(3)

// subject.subscribe({
//   next: (v) => renderUI(`observableA: ${v}`)
// })

// subject.next(1)
// subject.next(2)
// subject.next(3)
// subject.next(4)

// // 会从 replySubject 中读取之前的三个数据
// subject.subscribe({
//   next: v => renderUI(`observableB: ${v}`)
// })

// subject.next(5)


// AsyncSubject 是另一个 Subject 变体，只有当 Observable 执行完成时(执行 complete())，它才会将执行的最后一个值发送给观察者。
// const subject = new AsyncSubject()

// subject.subscribe({
//   next: v => renderUI(`observableA: ${v}`)
// })

// subject.next(1)
// subject.next(2)
// subject.next(3)
// subject.next(4)

// subject.subscribe({
//   next: v => renderUI(`observable: ${v}`)
// })

// subject.next(5)
// subject.complete()


// function multiplyByTen(inputarr: any) {
//   const output =  Observable.create( (observer: any) => {
//     inputarr.subscribe({
//       next: (v: any) => observer.next(10 * v),
//       error: (err: any) => observer.error(err)
//     })
//   })
//   return output
// }

// const input = Observable.from([1, 2, 3, 4])
// const outputSubp = multiplyByTen(input)
// outputSubp.subscribe((x: any) => renderUI(x))


// combineLatset 自如其名，返回的是一个数组，是每个 observable 里最新的值
// const firstTimer = Observable.timer(0, 1000)
// const secondTimer = Observable.timer(500, 1000)

// const combinedTimes = Observable.combineLatest(firstTimer, secondTimer)
// combinedTimes.subscribe(value => renderUI(value))


// const observables = [1, 5, 10].map(
//   n => Observable.of(n).delay(n * 1000).startWith(0)
// )

// const combined = Observable.combineLatest(observables)
// combined.subscribe(value => renderUI(value))

// const weight = Observable.of(70, 72, 76, 79, 75)
// const height = Observable.of(1.76, 1.77, 1.78)

// const bmi = Observable.combineLatest(weight, height, (w, h) => w / (h * h))

// bmi.subscribe(x => renderUI(`bmi is ${x}`))

// const stream$ = Observable.of(1, 2, 3, 4, 5)
//   .do(value => {
//     console.log(value + 1)
//   })
//   .filter(value => value % 2 === 0)
// stream$.subscribe(value => renderUI(`${value}`))



// const person$ = Observable.ajax({
//   url: 'https://swapi.co/api/people/1/',
//   crossDomain: true,
//   createXHR: function() {
//     return new XMLHttpRequest()
//   }
// }).map(e => e.response)


// const subscriptionPerson = person$.subscribe(res => {
//   renderUI(res.name)
// })


// const fetchSubscription = Observable.from(fetch('https://swapi.co/api/people/1/'))
//   .flatMap(res => Observable.from(res.json()))
//   .subscribe(fetchRes => renderUI(fetchRes.name))


// 并发操作
// const merged$ = Observable.merge(
//   Observable.of(1).delay(5000),
//   Observable.of(3, 2, 5)
// )

const observer = {
  next: (data: any) => renderUI(data)
}

// merged$.subscribe(observer)


// 以 observable 中的数量来取第几个值，比如 Observable 里面最短长度是 1 那就取第一个值  1  3 7
// const stream$ = Observable.zip(
//   Observable.of(1, 10),
//   Observable.of(2, 3, 4),
//   Observable.of(7)
// )

// 这里面最短数量是2 那就取第二个值   10  3  10
// const stream$ = Observable.zip(
//   Observable.of(1, 10),
//   Observable.of(2, 3, 4),
//   Observable.of(7, 10, 100)
// )

// 数量为3，取最后一个值
// const stream$ = Observable.zip(
//   Observable.of(1, 10, 100),
//   Observable.of(2, 3, 4),
//   Observable.of(7, 10, 100)
// )

// stream$.subscribe(observer)


// const stream$ = Observable.of(1, 2, 3, 4)
//   .reduce((acc, curr) => acc + curr, 0)


// 用 Object.assign 和 reduce 做 average
// const stream$ = Observable.of(3, 6, 9)
//   .map(x => { return { sum : x, counter: 1 }})
//   .reduce((acc, curr) => {
//     return Object.assign({}, acc, { sum: acc.sum + curr.sum, counter: acc.counter + curr.counter })
//   })
//   .do(console.log)
//   .map(x => x.sum / x.counter)

// stream$.subscribe(renderUI)



// const threeStream$ = Observable.interval(1000).take(3)
// threeStream$.subscribe(renderUI)



// sampleTime 也是2s内的最后一秒发出的
// const start = new Date()

// const button$ = Observable
//   .fromEvent(button, 'click')
//   .sampleTime(2000)

// button$.subscribe(val => {
//   console.log(val, new Date() - start)
// })




// 判断用户点击了几次， 然后通过 filer 操作符就可以取得具体的 observable 了
// const click$ = Observable.fromEvent(button, 'click')

// const scissor$ = Observable.interval(400)
// click$.buffer(scissor$)
//   // .filter(value => value.length > 2)
//   .subscribe(value => {
//     if (value.length === 1) {
//       renderUI('single click')
//     } else if (value.length === 2) {
//       renderUI('double click')
//     } else if (value.length === 3) {
//       renderUI('tripple click')
//     } else if (value.length === 4) {
//       renderUI('4 click')
//     }
//   })


// const input$ = Observable.fromEvent(input, 'keyup')
// const debounceBreak$ = input$.debounceTime(300)

// const stream$ = input$
//   .map((ev: any) => ev.key)
//   .buffer(debounceBreak$)
//   .switchMap((allKeyes) => {
//     console.log(`everyThing that happened during 2 sec`, allKeyes)
//     return Observable.of(`ajax based on` + input.value)
//   })
// stream$.subscribe(data => console.log('values', data))


// 以 1s 为时间片段持续记录所发生的 key 值
// const bufferTime$ = Observable.fromEvent(input, 'keyup')
//   .map( (ev: any) => ev.key)
//   .bufferTime(1000)
//   .take(3)
//   .groupBy(value => value)

// bufferTime$.subscribe(data => console.log(data))

/**
 * 如果你想要记录该网站上的其它用户正在做什么，
 * 并希望重播他们曾经做过的所有交互，或者当他们开始输入，
 * 你希望通过 socket 发送此信息的话，那么上面的示例会非常有用。
 * 最后一个是当下的标准功能，
 * 你看见一个人在另一个终端上打字。所以确实有这样的业务案例。
 */


const stream$ = Observable.of(1, 2, 3)
.map(value => {
   if (value > 2) { throw 'error' }
})
.retry(5)


stream$.subscribe(data => console.log(data), err => console.log(err))
