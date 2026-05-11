import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CvComponent } from './cv/cv.component';
import { PublicationsComponent } from './publications/publications.component';

/**
 * Main nav only surfaces Home + Publications. `/about` and `/cv` stay registered for old bookmarks.
 * Links to Astro posts must use real URLs (`href="/blog/..."`), not `routerLink`, or the catch-all below sends users home.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'cv', component: CvComponent },
  { path: '**', redirectTo: '' },
];
