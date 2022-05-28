import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;
  constructor(private loadingBar: LoadingBarService) {}

  ngOnInit(): void {
    this.loadingBar.value$.subscribe((value) => {
      this.isLoading = value > 0;
    });
  }
}
