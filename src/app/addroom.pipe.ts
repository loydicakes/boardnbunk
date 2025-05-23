import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addroom',
  standalone: true
})
export class AddroomPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
