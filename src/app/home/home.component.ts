import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  
  private readonly fullName = 'Thomas Mousseau';
  private readonly fullDescription = 'Student Researcher | Software Engineer';
  private readonly fullCv = 'CV';
  private readonly fullAbout = 'About Me';
  private readonly fullPublications = 'Publications';
  private readonly typeSpeed = 100; // milliseconds per character
  private readonly pauseBetweenLines = 500; // pause between name and description
  private readonly pauseBeforeNav = 800; // pause before showing navigation
  private readonly pauseBetweenNavItems = 300; // pause between navigation items

  ngOnInit() {
    this.startTypewriterEffect();
  }

  private async startTypewriterEffect() {
    // Type the name
    await this.typeText(this.fullName, (char) => this.displayedName += char);
    
    // Hide name cursor
    this.showNameCursor = false;
    
    // Pause between name and description
    await this.delay(this.pauseBetweenLines);
    
    // Show description cursor and type the description
    this.showDescCursor = true;
    await this.typeText(this.fullDescription, (char) => this.displayedDescription += char);
    
    // Hide description cursor
    this.showDescCursor = false;
    
    // Pause before showing navigation
    await this.delay(this.pauseBeforeNav);
    
    // Show navigation container and start typing navigation items
    this.showNav = true;
    
    // Type CV
    this.showCvCursor = true;
    await this.typeText(this.fullCv, (char) => this.displayedCv += char);
    this.showCvCursor = false;
    await this.delay(this.pauseBetweenNavItems);
    
    // Type About Me
    this.showAboutCursor = true;
    await this.typeText(this.fullAbout, (char) => this.displayedAbout += char);
    this.showAboutCursor = false;
    await this.delay(this.pauseBetweenNavItems);
    
    // Type Publications
    this.showPublicationsCursor = true;
    await this.typeText(this.fullPublications, (char) => this.displayedPublications += char);
    this.showPublicationsCursor = false;
  }

  private async typeText(text: string, callback: (char: string) => void): Promise<void> {
    for (let i = 0; i < text.length; i++) {
      callback(text[i]);
      await this.delay(this.typeSpeed);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
