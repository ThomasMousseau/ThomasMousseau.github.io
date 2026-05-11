import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { renderRichText } from '../utils/render-rich-text';

@Pipe({
  name: 'richHtml',
  standalone: true,
})
export class RichHtmlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | undefined | null): SafeHtml {
    const html = renderRichText(value ?? '');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
