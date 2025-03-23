import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Plant, Idioma } from 'src/app/shared/models/models';

interface LanguageWithAudio extends Idioma {
  hasAudio: boolean;
  descricaoEstendida?: string; // Field to store the loaded text description
}

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.scss'],
})
export class CatalogDetailsComponent implements OnInit {
  plantKey: string = '';
  plant?: Plant;
  sortedLanguages: { id: string; data: LanguageWithAudio }[] = [];
  wikipediaLabels: { [key: string]: string } = {};

  @ViewChildren('audioPlayers') audioPlayers!: QueryList<
    ElementRef<HTMLAudioElement>
  >;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.plantKey = params.get('plantaKey') || '';

      this.http
        .get<{ plantas: { [key: string]: Plant } }>('assets/data.json')
        .subscribe(async (data) => {
          this.plant = data.plantas[this.plantKey];

          if (this.plant) {
            await this.loadLanguages();
            this.loadWikipediaTranslations();
          }
        });
    });

    // Update when global language changes
    this.translateService.onLangChange.subscribe(() => {
      this.loadLanguages();
      this.loadWikipediaTranslations();
    });
  }

  /**
   * Checks if the audio file exists before displaying the player.
   */
  checkAudioExists(languageId: string): Promise<boolean> {
    const audioUrl = `assets/audios/${languageId}/${this.plantKey}.mp3`;
    return this.http
      .head(audioUrl, { observe: 'response' })
      .toPromise()
      .then((response) => response?.status === 200)
      .catch(() => false);
  }

  /**
   * Loads the available languages, verifies if the audio file exists for each,
   * and fetches the description from a .txt file.
   */
  async loadLanguages(): Promise<void> {
    if (!this.plant) return;

    this.sortedLanguages = [];

    for (const [id, data] of Object.entries(this.plant)) {
      if (typeof data !== 'object' || !data) continue;

      const audioExists = await this.checkAudioExists(id);
      const descricaoEstendida = await this.loadDescriptionFromFile(id);

      this.sortedLanguages.push({
        id,
        data: { ...data, hasAudio: audioExists, descricaoEstendida },
      });
    }
  }

  /**
   * Loads the plant description from a .txt file in the assets folder.
   */
  async loadDescriptionFromFile(languageId: string): Promise<string> {
    const filePath = `assets/plant_info/${languageId}/${this.plantKey}.md`;

    return this.http
      .get(filePath, { responseType: 'text' })
      .toPromise()
      .then((response) => response || 'Description not available')
      .catch(() => 'Description not available'); // Fallback if file doesn't exist
  }

  /**
   * Loads translations for "See on Wikipedia" in all languages.
   */
  loadWikipediaTranslations(): void {
    this.sortedLanguages.forEach(({ id }) => {
      this.translateService.getTranslation(id).subscribe((translations) => {
        if (translations?.CATALOG_DETAILS?.SEE_WIKIPEDIA) {
          this.wikipediaLabels[id] = translations.CATALOG_DETAILS.SEE_WIKIPEDIA;
        } else {
          this.wikipediaLabels[id] = 'Wikipedia'; // Default fallback
        }
      });
    });
  }

  /**
   * Returns the correct label for "See on Wikipedia".
   */
  getWikipediaLabel(language: string): string {
    return this.wikipediaLabels[language] || 'Wikipedia';
  }

  /**
   * Ensures that only one audio file plays at a time.
   */
  pauseOtherAudios(event: Event): void {
    const currentAudio = event.target as HTMLAudioElement;
    if (!currentAudio) return;

    this.audioPlayers.forEach((audioElement) => {
      if (audioElement.nativeElement !== currentAudio) {
        audioElement.nativeElement.pause();
        audioElement.nativeElement.currentTime = 0;
      }
    });
  }
}
