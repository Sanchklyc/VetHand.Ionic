import { ChangeDetectorRef, Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private cd: ChangeDetectorRef) {}

  images: string[] = [
    'assets/images/plus-img.png',
    'assets/images/plus-img.png',
    'assets/images/plus-img.png',
    'assets/images/plus-img.png',
  ];
  currentImageIndex = 0;
  lastUploadedFile: any;

  takePhoto(index: number = -1) {
    if (index >= 0 && this.images[index].includes('base64')) {
      return;
    }
    this.takePicture(true, true);
  }
  takePicture(fromCamera: boolean = true, prompt: boolean = false) {
    Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      saveToGallery: false,
      source: prompt ? CameraSource.Prompt : fromCamera ? CameraSource.Camera : CameraSource.Photos,
    }).then((image) => {
      this.images[this.currentImageIndex] = image.dataUrl;
      this.currentImageIndex++;
      this.cd.detectChanges();
    });
  }
  imageUploaded() {
    let includes = false;
    this.images.forEach((item) => {
      if (item.includes('base64')) includes = true;
    });
    return includes;
  }
  imageUploadedTo(index: number) {
    return this.images[index].includes('base64');
  }
  removeImageAt(index: number) {
    this.images[index] = 'assets/images/plus-img.png';
    this.images = this.images.sort((a, b) => {
      return a.length > b.length ? -1 : 1;
    });
    this.currentImageIndex--;
    this.cd.detectChanges();
  }
}
