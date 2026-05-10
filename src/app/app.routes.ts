import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component'; // Import the AboutComponent
import { HomeComponent } from './home/home.component'; // Import the HomeComponent
import { CvComponent } from './cv/cv.component';
import { PublicationsComponent } from './publications/publications.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Add the route for the HomeComponent at the root
    { path: 'about', component: AboutComponent }, // Add the route for the AboutComponent
    { path: 'publications', component: PublicationsComponent},
    { path: 'cv', component: CvComponent }, // Add the route for the CvComponent
    { path: '**', redirectTo: '' } // Redirect any unknown paths to the HomeComponent - THIS MUST BE LAST
];
