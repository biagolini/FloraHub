import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private storageKey = 'theme';
  private darkClass = 'dark-theme';
  private lightClass = 'light-theme';

  private themeSubject = new BehaviorSubject<'light-theme' | 'dark-theme'>(
    this.getInitialTheme()
  );
  theme$ = this.themeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.applyStoredTheme();

    // Monitorar mudanças no tema do sistema em tempo real
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (localStorage.getItem(this.storageKey) === 'system') {
          this.setTheme('system');
        }
      });
  }

  setTheme(theme: 'light-theme' | 'dark-theme' | 'system'): void {
    const appliedTheme =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark-theme'
          : 'light-theme'
        : theme;

    localStorage.setItem(this.storageKey, theme); // Armazena "system" se for o caso
    this.themeSubject.next(appliedTheme);
    this.applyTheme(appliedTheme);
  }

  getTheme(): 'light-theme' | 'dark-theme' | 'system' {
    return (
      (localStorage.getItem(this.storageKey) as
        | 'light-theme'
        | 'dark-theme'
        | 'system') || 'light-theme'
    );
  }

  applyStoredTheme(): void {
    const storedTheme = this.getTheme();
    const appliedTheme =
      storedTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark-theme'
          : 'light-theme'
        : storedTheme;

    this.themeSubject.next(appliedTheme);
    this.applyTheme(appliedTheme);
  }

  private applyTheme(theme: 'light-theme' | 'dark-theme'): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    this.renderer.addClass(document.body, theme);
  }

  isDarkTheme(): boolean {
    return this.themeSubject.value === 'dark-theme';
  }

  private getInitialTheme(): 'light-theme' | 'dark-theme' {
    const storedTheme = this.getTheme();
    return storedTheme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark-theme'
        : 'light-theme'
      : storedTheme;
  }
}
