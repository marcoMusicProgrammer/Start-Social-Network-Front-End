import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'replaceDash'
})
export class ReplaceDashPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-/g, ' • ');
  }
}
