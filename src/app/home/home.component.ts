import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  heroImage: string | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  /** Opening line of the bio. */
  readonly bioOpening = 'Hi everyone, I am Thomas Mousseau ༼ つ ◕_◕ ༽つ';

  /** Remaining bio paragraphs (after the Mila / supervisor line). */
  readonly bioClosingParagraphs = [
    'I am interested in theoretical RL and large-scale ML systems.',
  ];

  readonly supervisorProfileUrl =
    'https://mila.quebec/en/directory/amir-massoud-farahmand';

  readonly profileImageSrc = '/assets/photos/new_profile_photo.jpg';

  posts: BlogPostSummary[] = [];
  postsLoadError = false;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.http.get<BlogPostSummary[]>('/blog/posts.json').subscribe({
      next: (data) => {
        this.posts = Array.isArray(data) ? data : [];
        this.postsLoadError = false;
      },
      error: () => {
        this.posts = [];
        this.postsLoadError = true;
      },
    });
  }

  postUrl(slug: string): string {
    return `/blog/${slug}/`;
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }
}
