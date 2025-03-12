import { Chapter } from './chapter';
import { CorpusError } from '../../errors/corpus-error';
import { singleton } from 'tsyringe';

@singleton()
export class ChapterService {
    private _chapters: Chapter[] | null = null;
    private apiDown: boolean = false;

    getChapter(chapterNumber: number): Chapter | null {
        if (this.apiDown || !this._chapters || chapterNumber > this._chapters.length) {
            return null; // or a placeholder/fallback chapter
        }
        return this._chapters[chapterNumber - 1];
    }

    get chapters(): Chapter[] {
        if (!this._chapters) {
            console.warn('Chapters data not loaded. The API might be down.');
            this.apiDown = true; // Flag indicating the API is down
            return []; // Return an empty array to keep the app functional
        }
        return this._chapters;
    }

    get isApiDown(): boolean {
        return this.apiDown;
    }

    set chapters(chapters: Chapter[]) {
        this._chapters = chapters;
        this.apiDown = false; // Reset the flag when chapters are successfully loaded
    }
}
