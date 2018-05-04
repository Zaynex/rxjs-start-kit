import { Observable } from 'rxjs'

const button = <HTMLButtonElement>document.querySelector('button')
Observable.fromEvent(button, 'click')
  .subscribe(() => console.log('Clicked'))
