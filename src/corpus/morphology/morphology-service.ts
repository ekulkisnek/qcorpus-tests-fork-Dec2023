import { ApiBase } from '../../app/api-base';
import { Verse } from '../orthography/verse';
import { WordMorphology } from './word-morphology';
import { formatLocation, Location } from '../orthography/location';
import { singleton } from 'tsyringe';
import axios from 'axios';

@singleton()
export class MorphologyService extends ApiBase {

    async getMorphology(location: Location, count: number, translations: string[]) {
      try {
        const response = await axios.get(
            this.url('/morphology'),
            {
                params: {
                    location: formatLocation(location),
                    n: count,
                    translation: translations.join(',')
                }
            });
        return response.data as Verse[];
      } catch (error) {
          if (error instanceof Error) { // Checks if error is an instance of the Error class
              console.error('Error fetching morphology data:', error.message);
              throw new Error('Failed to load morphology data. Error: ' + error.message);
          } else {
              // Handle cases where the caught value isn't an Error object
              console.error('An unexpected error occurred with morphology data:', error);
              throw new Error('An unexpected error occurred with morphology data');
          }
      }
    }

    async getWordMorphology(location: Location) {
        const response = await axios.get(
            this.url('/morphology/word'),
            { params: { location: formatLocation(location) } });
        return response.data as WordMorphology;
    }
}