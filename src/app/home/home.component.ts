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
  showNav = false;
  
  private readonly fullName = 'Thomas Mousseau';
  private readonly fullDescription = 'Student Researcher | Software Engineer';
  private readonly typeSpeed = 100; // milliseconds per character
  private readonly pauseBetweenLines = 500; // pause between name and description
  private readonly pauseBeforeNav = 800; // pause before showing navigation

  ngOnInit() {
    this.startTypewriterEffect();
  }

  private async startTypewriterEffect() {
    // Type the name
    await this.typeText(this.fullName, (char) => this.displayedName += char);
    
    // Pause between name and description
    await this.delay(this.pauseBetweenLines);
    
    // Type the description
    await this.typeText(this.fullDescription, (char) => this.displayedDescription += char);
    
    // Pause before showing navigation
    await this.delay(this.pauseBeforeNav);
    
    // Show navigation
    this.showNav = true;
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
