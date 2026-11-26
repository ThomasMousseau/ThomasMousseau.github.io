import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RichHtmlPipe } from '../pipes/rich-html.pipe';

export interface PublicationItem {
  /** Markdown + `$math$` supported */
  titleMd: string;
  /** Optional author line (Markdown supported) */
  authorsMd?: string;
  abstractMd: string;
  /** Optional thumbnail; defaults to the same placeholder as the technical blog */
  imageUrl?: string;
  /** Stable id for in-page links, e.g. news → `/publications#phitd`. */
  id?: string;
  /** On-site story. The card title and thumbnail open this. */
  storyHref?: string;
  /** Paper link (arXiv, OpenReview, local PDF, etc.) */
  href: string;
  /** Conference / journal; omit or leave empty while not published → shown as “Preprint” */
  venue?: string;
  /** Optional conference / journal page */
  venueHref?: string;
  /** Optional code repository */
  codeHref?: string;
  /** Optional note under the venue (e.g. paper not yet available) */
  statusNote?: string;
}

@Component({
  selector: 'app-publications',
  imports: [CommonModule, RouterLink, RichHtmlPipe],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css',
})
export class PublicationsComponent {
  /** Same asset as the blog list when a post has no hero image */
  readonly placeholderThumb = '/blog/images/placeholder.svg';

  /**
   * Add one object per paper. Title links to `href` (use `#` until a paper URL exists).
   */
  readonly publications: PublicationItem[] = [
    {
      titleMd:
        '$\\varphi\\text{TD}$: Distributional Reinforcement Learning using Characteristic Functions',
      authorsMd:
        '**Thomas Mousseau**, Tyler Kastner, Davide Baldelli, Amir-massoud Farahmand',
      id: 'phitd',
      abstractMd: '',
      imageUrl: '/assets/publications/phitd-question.png',
      storyHref: '/publications/phitd',
      venue: 'NeurIPS 2026',
      venueHref: 'https://neurips.cc/virtual/2026/loc/paris/poster/154745',
      href: 'https://arxiv.org/abs/2611.25208',
      codeHref:
        'https://github.com/adaptive-agents-lab/Distributional-Reinforcement-Learning-using-Characteristic-Functions',
    },
  ];

  /** News links here as `/publications#phitd`. */
  anchorId(pub: PublicationItem): string | null {
    const id = pub.id?.trim();
    if (id) {
      return id;
    }
    const match = /\/([^/]+)\.pdf$/i.exec(pub.href.trim());
    return match?.[1] ?? null;
  }

  venueLabel(pub: PublicationItem): string {
    const v = pub.venue?.trim();
    return v ? v : 'Preprint';
  }

  statusNote(pub: PublicationItem): string {
    return pub.statusNote?.trim() ?? '';
  }

  onTitleClick(event: MouseEvent, pub: PublicationItem): void {
    if (pub.href.trim() === '#') {
      event.preventDefault();
    }
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
