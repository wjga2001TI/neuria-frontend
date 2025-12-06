import { Pipe, PipeTransform } from '@angular/core';

import { DateTime, DateTimeFormatOptions } from "luxon";

@Pipe({ name: 'dateToHumans' })
export class DateToHumansPipe implements PipeTransform {

    transform(fecha: string, tipo: string = 'normal'): string {

    	let dateTime = DateTime.fromISO(fecha.split(' ').join('T'))

    	let finalTipo: DateTimeFormatOptions = DateTime.DATE_FULL;
    	if(tipo == 'full')
    	{
    		//finalTipo = DateTime.DATE_MED_WITH_WEEKDAY;
    		finalTipo = DateTime.DATE_HUGE;
    	}

        return dateTime.toLocaleString(finalTipo);
    }
}
