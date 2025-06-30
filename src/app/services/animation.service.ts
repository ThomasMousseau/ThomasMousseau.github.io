import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animationsEnabledSubject: BehaviorSubject<boolean>;
  public animationsEnabled$;

  constructor() {
    // Get the initial value synchronously if possible
    let initialValue = true; // default
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedPreference = localStorage.getItem('homeAnimationsEnabled');
      initialValue = savedPreference !== null ? JSON.parse(savedPreference) : true;
    }
    
    // Initialize the subject with the correct value from the start
    this.animationsEnabledSubject = new BehaviorSubject<boolean>(initialValue);
    this.animationsEnabled$ = this.animationsEnabledSubject.asObservable();
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
