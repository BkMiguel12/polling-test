import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PollingService } from './services/polling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public listenData$: Observable<any>;

  constructor(private pollingService: PollingService) {
    this.listenData$ = this.pollingService.getData();
  }

  ngOnInit(): void {}
}
