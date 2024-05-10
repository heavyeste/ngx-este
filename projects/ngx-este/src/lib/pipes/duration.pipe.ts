import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nge_duration',
})
export class NgeDurationPipe implements PipeTransform {
  constructor(public decimalPipe: DecimalPipe) {}
  transform(total_seconds: number, includeSeconds: boolean = true) {
    let res = '';
    const isPositive: boolean = total_seconds >= 0;
    total_seconds = Math.abs(total_seconds);
    total_seconds = Math.ceil(total_seconds);
    const hours = Math.trunc(total_seconds / (60 * 60));
    // console.log(`hours: ${hours}`);
    let minutes = 0;
    minutes = Math.trunc((total_seconds - hours * 60 * 60) / 60);
    // if (includeSeconds) {
    // }
    // else {
    //   if(total_seconds) {
    //     minutes = parseInt(this.decimalPipe.transform(
    //       (total_seconds - hours * 60 * 60) / 60,
    //       '1.0-0',
    //     ));
    //   }
    // }
    // console.log(`minutes: ${minutes}`);
    const seconds = Math.trunc(total_seconds - hours * 3600 - minutes * 60);
    // console.log(`seconds: ${seconds}`);
    res = `${!isPositive ? '-' : ''}${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    if (includeSeconds) res = `${res}:${seconds.toString().padStart(2, '0')}`;
    return res;
  }
}
