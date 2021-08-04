import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datefilter',
  pure: false
})
export class DatefilterPipe implements PipeTransform {

  transform(value: string, search: string): unknown {
    if(value.includes(search)){
      return value;
    }else{
      return '';
    }
  }

}
