import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, switchMap, retry, tap, share, takeUntil, Subject, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollingService {

  private dataToSend$: Observable<any>;
  private stopPolling = new Subject();
  private interval: number = 3000;

  constructor(private http: HttpClient) {
    this.dataToSend$ = timer(1, this.interval).pipe(
      switchMap(() => this.verifyAndRequest()),
      map((res: any) => res ? res['results'] : []),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );
  }

  verifyAndRequest(){
    console.log('Focus? ', document.hasFocus());
    if(document.hasFocus()) {
      const data: any = this.http.get('https://randomuser.me/api/');
      return data;
    } else {
      return of(null);
    }
  }

  getData(): Observable<String> {
    return this.dataToSend$.pipe(   
      tap((value) => console.log(value))
    );
  }

  ngOnDestroy(): void {
    this.stopPolling.next(null);
  }
}
