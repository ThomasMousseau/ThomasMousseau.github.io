import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../services/animation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedName = '';
  displayedDescription = '';
  displayedCv = '';
  displayedAbout = '';
  displayedPublications = '';
  showNav = false;
  showNameCursor = true;
  showDescCursor = false;
  showCvCursor = false;
  showAboutCursor = false;
  showPublicationsCursor = false;
  animationsEnabled = true;
  private animationInProgress = false;
  private animationSubscription: Subscription | null = null;
  
  private readonly fullName = 'Thomas Mousseau';
  private readonly fullDescription = 'Student Researcher | Software Engineer';
  private readonly fullCv = 'CV';
  private readonly fullAbout = 'About Me';
  private readonly fullPublications = 'Publications';
  private readonly typeSpeed = 100; // milliseconds per character
  private readonly pauseBetweenLines = 500; // pause between name and description
  private readonly pauseBeforeNav = 800; // pause before showing navigation
  private readonly pauseBetweenNavItems = 300; // pause between navigation items

  constructor(private cdr: ChangeDetectorRef, private animationService: AnimationService) {}

  ngOnInit() {
    // Subscribe to animation changes from the service
    this.animationSubscription = this.animationService.animationsEnabled$.subscribe(enabled => {
      // Stop any ongoing animation immediately
      this.animationInProgress = false;
      
      this.animationsEnabled = enabled;
      this.resetState();
      
      // Small delay to ensure state is cleared before starting new animation
      setTimeout(() => {
        if (this.animationsEnabled) {
          this.startTypewriterEffect();
        } else {
          this.showAllContent();
        }
      }, 10);
    });
  }

  ngOnDestroy() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
  }

  private resetState() {
    // Stop any ongoing animation first
    this.animationInProgress = false;
    
    // Reset displayed text completely
    this.displayedName = '';
    this.displayedDescription = '';
    this.displayedCv = '';
    this.displayedAbout = '';
    this.displayedPublications = '';
    
    // Reset navigation and cursors
    this.showNav = false;
    this.showNameCursor = true;
    this.showDescCursor = false;
    this.showCvCursor = false;
    this.showAboutCursor = false;
    this.showPublicationsCursor = false;
    
    // Force change detection to ensure UI is updated
    this.cdr.detectChanges();
  }

  private showAllContent() {
    // Show all content immediately without animation
    this.displayedName = this.fullName;
    this.displayedDescription = this.fullDescription;
    this.displayedCv = this.fullCv;
    this.displayedAbout = this.fullAbout;
    this.displayedPublications = this.fullPublications;
    this.showNav = true;
    this.showNameCursor = false;
    this.showDescCursor = false;
    this.showCvCursor = false;
    this.showAboutCursor = false;
    this.showPublicationsCursor = false;
  }

  private async startTypewriterEffect() {
    // Double-check animations are still enabled before starting
    if (!this.animationsEnabled) return;
    
    this.animationInProgress = true;
    
    // Type the name
    await this.typeText(this.fullName, (char) => this.displayedName += char);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    
    // Hide name cursor
    this.showNameCursor = false;
    
    // Pause between name and description
    await this.delay(this.pauseBetweenLines);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    
    // Show description cursor and type the description
    this.showDescCursor = true;
    await this.typeText(this.fullDescription, (char) => this.displayedDescription += char);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    
    // Hide description cursor
    this.showDescCursor = false;
    
    // Pause before showing navigation
    await this.delay(this.pauseBeforeNav);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    
    // Show navigation container and start typing navigation items
    this.showNav = true;
    
    // Type CV
    this.showCvCursor = true;
    await this.typeText(this.fullCv, (char) => this.displayedCv += char);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    this.showCvCursor = false;
    await this.delay(this.pauseBetweenNavItems);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    
    // Type About Me
    this.showAboutCursor = true;
    await this.typeText(this.fullAbout, (char) => this.displayedAbout += char);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    this.showAboutCursor = false;
    await this.delay(this.pauseBetweenNavItems);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    
    // Type Publications
    this.showPublicationsCursor = true;
    await this.typeText(this.fullPublications, (char) => this.displayedPublications += char);
    if (!this.animationInProgress || !this.animationsEnabled) return;
    this.showPublicationsCursor = false;
    
    this.animationInProgress = false;
  }

  private async typeText(text: string, callback: (char: string) => void): Promise<void> {
    for (let i = 0; i < text.length; i++) {
      if (!this.animationInProgress || !this.animationsEnabled) return;
      callback(text[i]);
      await this.delay(this.typeSpeed);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
