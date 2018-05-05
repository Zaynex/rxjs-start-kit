import { Observable, Observer, Subject, Subscription, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs'
import { subscribeOn } from 'rxjs/operator/subscribeOn'

const renderUI = (data: any): void => {
  const span = document.createElement('span')
  span.classList.add('demo')
  span.innerHTML = `${data}`
  document.querySelector('.main').appendChild(span)
}
const button = <HTMLButtonElement>document.querySelector('button')
Observable.fromEvent(button, 'click')
  .subscribe(() => renderUI('clicked'))

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
