import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  waitingRequests: any[] = [
    {
      status: 1,
      statusText: 'Bekleyen talep',
      icon: 'time-outline',
      date: '30.11.2021',
    },
    {
      status: 2,
      statusText: 'Dostumuza yardım edildi.',
      icon: 'checkmark-outline',
      date: '27.11.2021',
    },
    {
      status: 3,
      statusText: 'Talep zaman aşımına uğradı',
      icon: 'close-outline',
      date: '27.11.2021',
    },
  ];
  constructor() {}
}
