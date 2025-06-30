import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../services/animation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  animationsEnabled = true;
  private animationSubscription: Subscription | null = null;

  constructor(public animationService: AnimationService) {}

  ngOnInit() {
    // Subscribe to animation state changes
    this.animationSubscription = this.animationService.animationsEnabled$.subscribe(enabled => {
      this.animationsEnabled = enabled;
    });
  }

  ngOnDestroy() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
  }

  toggleAnimations() {
    this.animationService.toggleAnimations();
  }
}
