import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rights'
})
export class RightsPipe implements PipeTransform {

  transform(value: string): string {
    value = value.split('_').join(' ');
    if (value.includes('full')) {
      value = value.replace('full', '(full)');
    }
    value = value[0].toUpperCase() + value.slice(1);
    return value;
  }

}
