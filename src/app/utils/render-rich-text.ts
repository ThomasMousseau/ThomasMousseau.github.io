import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import katex from 'katex';

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
}).use(texmath, {
  engine: katex,
  delimiters: 'dollars',
});

/**
 * Renders Markdown + `$inline$` / `$$display$$` math (KaTeX) to HTML.
 * Markdown-it runs with `html: false`; only edit publication strings in source code you trust.
 */
export function renderRichText(source: string): string {
  return md.render(source ?? '');
}
