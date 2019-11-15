import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.page.html',
  styleUrls: ['./image-cropper.page.scss'],
})
export class ImageCropperPage implements OnInit {

  constructor(
    private helper: HelperService,
    private userService: UserService,
  ) { }
  dataUrl;
  failedLoad = false;
  ngOnInit() {
  }
  ionViewWillEnter() {
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  ionViewDidEnter(){
    if(!this.dataUrl){
      this.failedLoad = true;
    }
  }
  doRefresh(event){
    this.dataUrl = this.userService.cropImage;
    event.target.complete();
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    this.failedLoad = true;
  }

  close() {
    this.helper.closeModal()
  }
  save() {
    this.userService.photoURL = this.croppedImage;
    this.close();
  }
}
