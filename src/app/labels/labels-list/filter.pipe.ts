import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName): any {

    if (!value || value.length === 0 || filterString === '') {
      return value;
    }

    const resArray = [];
    for (const item of value) {
      if (item[propName].startsWith(filterString)) {
        resArray.push(item);
      }
    }
    return resArray;
  }
}
