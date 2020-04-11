import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatSsn'})
export class SsnFormatPipe implements PipeTransform {

    transform(personalNumber: string) {
      if (!personalNumber) {
        return '';
      }
      personalNumber = personalNumber.replace('-', '');
      return personalNumber.substring(0, personalNumber.length - 4) + ' ****';
    }

}
