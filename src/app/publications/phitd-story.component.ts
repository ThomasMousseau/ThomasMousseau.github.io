import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import katex from 'katex';

interface StoryBeat {
  chapter: 'Intro' | 'Approach' | 'Results' | 'Takeaways';
  line?: string;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-phitd-story',
  imports: [RouterLink],
  templateUrl: './phitd-story.component.html',
  styleUrl: './phitd-story.component.css',
})
export class PhitdStoryComponent {
  /** Open phi, same glyph as the paper title. */
  readonly mark: SafeHtml;

  readonly paperUrl = 'https://arxiv.org/abs/2611.25208';
  readonly venueUrl = 'https://neurips.cc/virtual/2026/loc/paris/poster/154745';
  readonly codeUrl =
    'https://github.com/adaptive-agents-lab/Distributional-Reinforcement-Learning-using-Characteristic-Functions';

  readonly chapters = ['Intro', 'Approach', 'Results', 'Takeaways'] as const;

  readonly beats: StoryBeat[] = [
    {
      chapter: 'Intro',
      src: '/assets/publications/phitd/title.png',
      alt: 'Title slide for Distributional Reinforcement Learning using Characteristic Functions.',
    },
    {
      chapter: 'Intro',
      line: 'An agent acts, gets a reward, and has to decide what to do next.',
      src: '/assets/publications/phitd/choose.png',
      alt: 'Agent and environment loop, asking whether an action should be chosen by its mean return.',
    },
    {
      chapter: 'Intro',
      line: 'Two actions can share the same expected return while carrying different risks.',
      src: '/assets/publications/phitd/tie.png',
      alt: 'Bar chart where actions a0 and a1 both have expected return 4, and a2 has 2.',
    },
    {
      chapter: 'Intro',
      line: 'The return distribution keeps the shape that a single mean throws away.',
      src: '/assets/publications/phitd/distributions.png',
      alt: 'Return densities for three actions, with a note that richer information is available in distributions.',
    },
    {
      chapter: 'Intro',
      line: 'Distributional RL learns the full return distribution.',
      src: '/assets/publications/phitd/learn.png',
      alt: 'Mean returns on the left, and the corresponding return distributions on the right.',
    },
    {
      chapter: 'Intro',
      line: 'Categorical and quantile methods stay tractable by staying inside a discrete family.',
      src: '/assets/publications/phitd/families.png',
      alt: 'Categorical atoms with fixed locations, and quantile atoms with learned locations.',
    },
    {
      chapter: 'Intro',
      line: 'When a target value falls between grid points, categorical projection splits its probability mass between its neighbors.',
      src: '/assets/publications/phitd/categorical-target.png',
      alt: 'The target places mass 0.5 at return 0.5. Projection splits it equally between returns 0 and 1.',
    },
    {
      chapter: 'Intro',
      line: 'Putting the Bellman target back on the grid changes the distribution and introduces error.',
      src: '/assets/publications/phitd/categorical-projection.png',
      alt: 'A categorical distribution, its Bellman target, and the projected target split across neighboring atoms.',
    },
    {
      chapter: 'Intro',
      line: 'The update leaves the family. A projection operator pulls the target back in.',
      src: '/assets/publications/phitd/projection.png',
      alt: 'Diagram of a Bellman update leaving the family, then a projection back onto it.',
    },
    {
      chapter: 'Intro',
      line: 'Can we learn richer return distributions without that explicit projection?',
      src: '/assets/publications/phitd/question.png',
      alt: 'Research question: can we learn richer return distributions without explicit projection?',
    },
    {
      chapter: 'Approach',
      line: 'One sound can be read as a wave in time, or as a set of frequencies.',
      src: '/assets/publications/phitd/sound.png',
      alt: 'A waveform and its Fourier transform into frequencies at 220 Hz and 440 Hz.',
    },
    {
      chapter: 'Approach',
      line: 'A characteristic function is the same idea for a distribution: all of its frequencies.',
      src: '/assets/publications/phitd/characteristic.png',
      alt: 'A return density beside the real and imaginary parts of its characteristic function.',
    },
    {
      chapter: 'Approach',
      line: 'In frequency space, the target stays in the same function space. No projection step.',
      src: '/assets/publications/phitd/frequency.png',
      alt: 'Current and target characteristic functions, real and imaginary parts.',
    },
    {
      chapter: 'Approach',
      line: 'The distance between two distributions has a closed form there. In practice, sample frequencies.',
      src: '/assets/publications/phitd/distance.png',
      alt: 'Return-space CDFs matched with characteristic functions, and the frequency-space distance.',
    },
    {
      chapter: 'Results',
      line: 'The family that matches the target is the one with the lowest error.',
      src: '/assets/publications/phitd/inductive-bias-results.png',
      alt: 'Table of extra error when the predicted family does not match the target distribution.',
    },
    {
      chapter: 'Results',
      line: 'The same idea, trained on Craftax for a billion steps.',
      src: '/assets/publications/phitd/craftax.png',
      alt: 'Craftax learning curves for several characteristic-function families and PQN-RNN.',
    },
    {
      chapter: 'Takeaways',
      line: 'Distributional RL, without explicit projection error, from a frequency-domain view.',
      src: '/assets/publications/phitd/takeaways.png',
      alt: 'Three takeaways: no explicit projection error, a frequency-domain view, and flexible families.',
    },
  ];

  constructor(sanitizer: DomSanitizer) {
    this.mark = sanitizer.bypassSecurityTrustHtml(
      katex.renderToString('\\varphi\\text{TD}', {
        throwOnError: false,
        displayMode: false,
      }),
    );
  }

  chapterId(chapter: string): string {
    return chapter.toLowerCase();
  }

  showChapter(index: number): boolean {
    return index === 0 || this.beats[index].chapter !== this.beats[index - 1].chapter;
  }
}
