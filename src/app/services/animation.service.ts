import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animationsEnabledSubject: BehaviorSubject<boolean>;
  public animationsEnabled$;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Always start with default value, only load from localStorage on client
    let initialValue = true; // default
    
    // Only access localStorage when running in the browser
    if (isPlatformBrowser(this.platformId)) {
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('homeAnimationsEnabled', JSON.stringify(newValue));
    }
  }
}
