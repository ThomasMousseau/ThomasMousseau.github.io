import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import katex from 'katex';

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

  readonly milaUrl = 'https://mila.quebec/en';

  readonly supervisorProfileUrl =
    'https://mila.quebec/en/directory/amir-massoud-farahmand';

  readonly profileImageSrc = '/assets/photos/new_profile_photo.jpg';

  /**
   * Newest first. Date is year then a three-letter month, e.g. "2026 Nov".
   * `leadTex` is KaTeX. Use `\varphi` (open phi), not `\phi`.
   */
  readonly news: {
    date: string;
    leadTex?: string;
    leadLink?: string;
    leadFragment?: string;
    beforeHighlight?: string;
    highlight?: string;
    afterHighlight?: string;
    text?: string;
  }[] = [
    {
      date: '2026 Nov',
      leadTex: '\\varphi\\text{TD}',
      leadLink: '/publications',
      leadFragment: 'phitd',
      beforeHighlight: ' has been ',
      highlight: 'accepted',
      afterHighlight: ' to NeurIPS, see you in Paris 🇫🇷',
    },
  ];

  posts: BlogPostSummary[] = [];
  postsLoadError = false;

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  /** Inline KaTeX. `\varphi` is the open phi used in the paper title. */
  leadMath(tex: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      katex.renderToString(tex, { throwOnError: false, displayMode: false }),
    );
  }

  publicationHref(item: (typeof this.news)[number]): string {
    const path = item.leadLink ?? '/publications';
    return item.leadFragment ? `${path}#${item.leadFragment}` : path;
  }

  openPublication(event: MouseEvent, item: (typeof this.news)[number]): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    void this.router.navigate([item.leadLink ?? '/publications'], {
      fragment: item.leadFragment,
    });
  }

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
