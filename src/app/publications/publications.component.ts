import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichHtmlPipe } from '../pipes/rich-html.pipe';

export interface PublicationItem {
  /** Markdown + `$math$` supported */
  titleMd: string;
  abstractMd: string;
  /** Optional thumbnail; defaults to the same placeholder as the technical blog */
  imageUrl?: string;
  /** External paper link (arXiv, OpenReview, etc.) */
  href: string;
  /** Conference / journal; omit or leave empty while not published → shown as “Preprint” */
  venue?: string;
}

@Component({
  selector: 'app-publications',
  imports: [CommonModule, RichHtmlPipe],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css',
})
export class PublicationsComponent {
  /** Same asset as the blog list when a post has no hero image */
  readonly placeholderThumb = '/blog/images/placeholder.svg';

  /**
   * Add one object per paper. Entire card opens `href` in a new tab.
   */
  readonly publications: PublicationItem[] = [
    {
      titleMd: '$\\varphi\\text{TD}$',
      abstractMd: 'Abstract coming soon …',
      href: '#',
    },
  ];

  venueLabel(pub: PublicationItem): string {
    const v = pub.venue?.trim();
    return v ? v : 'Preprint';
  }

  thumbSrc(pub: PublicationItem): string {
    const u = pub.imageUrl?.trim();
    return u ? u : this.placeholderThumb;
  }

  /** Draft entries use `href: '#'` and stay in-tab; real papers open in a new tab. */
  linkTarget(pub: PublicationItem): '_blank' | null {
    const h = pub.href.trim();
    return h && h !== '#' ? '_blank' : null;
  }

  linkRel(pub: PublicationItem): string | null {
    return this.linkTarget(pub) ? 'noopener noreferrer' : null;
  }
}
