import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isOpen = false;
  isDark = false;
  space_icon = '2vw';

  languages = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  selectedLanguage: string;

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {
    this.selectedLanguage = this.translateService.currentLang || 'pt';
  }

  ngOnInit(): void {
    this.isDark = this.themeService.isDarkTheme();
  }

  openClose() {
    this.isOpen = !this.isOpen;
  }

  setDarkTheme(): void {
    this.themeService.setTheme('dark-theme');
    this.isDark = true;
  }

  setLightTheme(): void {
    this.themeService.setTheme('light-theme');
    this.isDark = false;
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
    localStorage.setItem('language', language);
    this.selectedLanguage = language;
  }
}
