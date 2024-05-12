import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; 

        switch(value.toUpperCase()) { 
          case 'M':
            return 'Masculino';
          case 'F':
            return 'Femenino';
          default:
            return value; 
        }
  }
}