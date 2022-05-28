import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastController: ToastController) {}

  async showSuccessMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2000,
      cssClass: 'toast-success',
    });
    await toast.present();
  }
  async showErrorMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2000,
      cssClass: 'toast-error',
    });
    await toast.present();
  }
}
