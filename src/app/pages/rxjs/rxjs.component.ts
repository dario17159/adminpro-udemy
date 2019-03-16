import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry,map,filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit,OnDestroy {


  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresarObservable().subscribe( 
      numero => console.log("subs", numero),
      error => console.log("Ocurrio un error", error),
      () => console.log('El observador termino')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }

  regresarObservable(): Observable<any>{
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(() => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

      }, 1000);

    }).pipe(
      map( resp => resp.valor ),
      filter( ( valor, index ) => {

        if( (valor % 2) === 1){
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
