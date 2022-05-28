import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
@Injectable({
  providedIn: 'root',
})
export class CapacitorStorageService {
  constructor() {}

  async storeElement(key: string, element: any) {
    await Storage.set({
      key: key,
      value: JSON.stringify(element),
    });
  }

  async getElement<T>(key: string): Promise<T> {
    const element = await Storage.get({ key: key });
    return JSON.parse(element.value) as T;
  }

  async removeElement(key: string) {
    await Storage.remove({ key: key });
  }
}
