import { ApiBase } from '../../app/api-base';
import { Location } from '../orthography/location';
import { formatLocation } from '../orthography/location';
import { singleton } from 'tsyringe';
import axios from 'axios';

@singleton()
export class IrabService extends ApiBase {

    async getIrab(from: Location, to: Location) {
      try {
        const response = await axios.get(
            this.url('/irab'),
            {
                params: {
                    from: formatLocation(from),
                    to: formatLocation(to)
                }
            });

        return response.data as string[];
      } catch (error) {
          if (error instanceof Error) { // Checks if error is an instance of the Error class
              console.error('Error fetching irab data:', error.message);
              throw new Error('Failed to load irab data. Error: ' + error.message);
          } else {
              // Handle cases where the caught value isn't an Error object
              console.error('An unexpected error with irab data occurred:', error);
              throw new Error('An unexpected error with irab dataoccurred');
          }
      }
    }
}