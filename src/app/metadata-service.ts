import { ApiBase } from './api-base';
import { Chapter } from '../corpus/orthography/chapter';
import { ChapterService } from '../corpus/orthography/chapter-service';
import { Translation } from '../corpus/translation/translation';
import { TranslationService } from '../corpus/translation/translation-service';
import { singleton } from 'tsyringe';
import axios from 'axios';

type Metadata = {
    chapters: Chapter[],
    translations: Translation[]
}

@singleton()
export class MetadataService extends ApiBase {

    constructor(
        private readonly chapterService: ChapterService,
        private readonly translationService: TranslationService) {
        super();
    }

    async cacheMetadata() {
      try {
        const response = await axios.get(this.url('/metadata'));
        const { chapters, translations } = response.data as Metadata;
        this.chapterService.chapters = chapters;
        this.translationService.translations = translations;
      } catch (error) {
          if (error instanceof Error) { // Checks if error is an instance of the Error class
              console.error('Error fetching metadata data:', error.message);
              throw new Error('Failed to load metadata data. Error: ' + error.message);
          } else {
              // Handle cases where the caught value isn't an Error object
              console.error('An unexpected error occurred with metadata:', error);
              throw new Error('An unexpected error occurred with metadata');
          }
      }
    }
}