import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Import RouterLink and RouterLinkActive

@Component({
  selector: 'app-home',
  standalone: true, // Make the component standalone
  imports: [RouterLink, RouterLinkActive], // Import the router directives
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
