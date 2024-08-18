import { TypewriterService } from '@shared/services';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'cf-home-hero',
  template: `
    <div class="relative flex h-screen">
      <div class="absolute inset-x-0 -top-80 transform-gpu blur-3xl">
        <div
          class="relative left-[calc(50%-30rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
          style="
        clip-path: polygon(
          74.1% 44.1%,
          100% 61.6%,
          97.5% 26.9%,
          85.5% 0.1%,
          80.7% 2%,
          72.5% 32.5%,
          60.2% 62.4%,
          52.4% 68.1%,
          47.5% 58.3%,
          45.2% 34.5%,
          27.5% 76.7%,
          0.1% 64.9%,
          17.9% 100%,
          27.6% 76.8%,
          76.1% 97.7%,
          74.1% 44.1%
        );
      "
        ></div>
      </div>

      <div class="m-auto max-w-2xl">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-white/10 hover:ring-white/20"
          >
            Frontend Team 2024 inc.
          </div>
        </div>
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
            {{ typedText$ | async }}
          </h1>
          <p class="mt-6 text-lg leading-8">
            A curated collection of essential libraries and tools designed to
            streamline and enhance the workflow of frontend and fullstack
            developers.
          </p>
          <div class="mt-10 flex items-center justify-center">
            <button
              class="flex items-center gap-3 rounded-3xl shadow-lg shadow-accent"
              (click)="scrollToMain()"
              hlmButton
              size="lg"
            >
              I'm ready
              <hlm-icon name="Heart" size="15" />
            </button>
          </div>
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-30rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
            style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
          ></div>
        </div>
      </div>
    </div>
  `,
})
export class HomeHeroComponent {
  private readonly _typewriterService = inject(TypewriterService);

  private readonly _titles = [
    'Your Next Project',
    'Your Next Idea',
    'Your Next Startup',
    'Your Next Business',
  ];

  public readonly typedText$ = this._typewriterService.getTypewriterEffect(
    this._titles,
  );

  public scrollToMain(): void {
    const main = document.getElementById('main');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
