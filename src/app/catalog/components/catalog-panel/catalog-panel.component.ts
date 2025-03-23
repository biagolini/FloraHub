import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AppConfig, Plant, Icons } from 'src/app/shared/models/models';

@Component({
  selector: 'app-catalog-panel',
  templateUrl: './catalog-panel.component.html',
  styleUrls: ['./catalog-panel.component.scss'],
})
export class CatalogPanelComponent implements OnInit, OnDestroy {
  plants: Plant[] = [];
  icons: Icons = {};
  currentLanguage: string = 'pt'; // Default language
  markdownVisible: boolean = true; // Controls Markdown re-rendering
  private subscriptions: Subscription = new Subscription(); // Manages multiple subscriptions

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // Set the initial language
    this.currentLanguage = this.translateService.currentLang || 'pt';

    // Listen for language changes and update dynamically
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this.currentLanguage = event.lang;
        this.refreshMarkdown();
      })
    );

    // Load plant data from JSON
    this.subscriptions.add(
      this.http.get<AppConfig>('assets/data.json').subscribe((data) => {
        this.icons = data.app.icons;

        // Convert plant object into an array and include the key
        this.plants = Object.entries(data.plantas).map(([key, value]) => ({
          ...value,
          key,
        }));
      })
    );
  }

  // Forces Markdown component to re-render on language change
  refreshMarkdown(): void {
    this.markdownVisible = false;
    setTimeout(() => {
      this.markdownVisible = true;
    }, 0);
  }

  ngOnDestroy(): void {
    // Prevent memory leaks by unsubscribing from all active subscriptions
    this.subscriptions.unsubscribe();
  }
}
