import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CarlosBiagolini';

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.themeService.applyStoredTheme();
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Verifica se existe um idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('language');

    // Se não houver idioma salvo, usa 'pt' como padrão
    const languageToUse = savedLanguage ? savedLanguage : 'pt';

    // Define o idioma inicial
    this.translateService.use(languageToUse);
  }
}
