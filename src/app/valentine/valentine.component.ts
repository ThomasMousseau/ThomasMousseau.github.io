import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valentine',
  imports: [CommonModule],
  templateUrl: './valentine.component.html',
  styleUrl: './valentine.component.css'
})
export class ValentineComponent {
  showHearts = false;
  photos = [
    'IMG_0212.JPG',
    'IMG_0619.jpeg',
    'IMG_0651.jpg',
    'IMG_1897.JPG',
    'IMG_2033 3.jpg',
    'IMG_2132.jpg',
    'IMG_2994.jpg',
    'IMG_3187.jpg',
    'IMG_6030.jpg',
    'IMG_9153 2.jpg',
    'P7020388 2.jpg'
  ];
  currentIndex = 0;

  onYes() {
    this.showHearts = true;
  }

  onNo() {
    // Maybe do nothing or show a message
  }

  nextPhoto() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }

  prevPhoto() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
  }
}
