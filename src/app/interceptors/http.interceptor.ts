import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { ToastrService } from '../services/toastr/toastr.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private loadingService: LoadingBarService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handle(request, next)).pipe(
      catchError((err) => {
        if (err.error.message) {
          this.toastService.showErrorMessage(err.error.message);
        }
        return throwError(err);
      })
    );
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.start();
    let token = await this.authService.getToken();
    if (token) {
      let newRequest: HttpRequest<any>;
      newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next
        .handle(newRequest)
        .toPromise()
        .finally(() => {
          this.loadingService.complete();
        });
    }
    return next
      .handle(req)
      .toPromise()
      .finally(() => {
        this.loadingService.complete();
      });
  }
}
