import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separatorMiles'
})
export class SeparatorMilesPipe implements PipeTransform {

 public transform(value: any) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
    }

}
