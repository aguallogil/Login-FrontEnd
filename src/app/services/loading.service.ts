import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//ESTE SERVICIO ES EL QUE SE INYECTA PARA MANEJAR EL LOADDING EN EL APP COMPONENT
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  showLoading() {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  hideLoading() {
    this.loadingCount--;
    if (this.loadingCount === 0) {
      this.loadingSubject.next(false);
    }
  }
}
