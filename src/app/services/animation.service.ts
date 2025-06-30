import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animationsEnabledSubject = new BehaviorSubject<boolean>(true);
  public animationsEnabled$ = this.animationsEnabledSubject.asObservable();

  constructor() {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedPreference = localStorage.getItem('homeAnimationsEnabled');
      const enabled = savedPreference !== null ? JSON.parse(savedPreference) : true;
      this.animationsEnabledSubject.next(enabled);
    }
  }

  get animationsEnabled(): boolean {
    return this.animationsEnabledSubject.value;
  }

  toggleAnimations(): void {
    const newValue = !this.animationsEnabledSubject.value;
    this.animationsEnabledSubject.next(newValue);
    
    // Only save to localStorage in the browser
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('homeAnimationsEnabled', JSON.stringify(newValue));
    }
  }
}
