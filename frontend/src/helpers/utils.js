import { SYMBOLS } from './generate_input_data';
import Airplane from '../assets/airplane.svg?react';
import Bicycle from '../assets/bicycle.svg?react';
import Boat from '../assets/boat.svg?react';
import Bus from '../assets/bus.svg?react';
import CarSport from '../assets/car.svg?react';
import Person from '../assets/person.svg?react';

// You can use these components in your code like this:
// const Icon = symbolToIcon['#'];
// return <Icon />;
export const symbolToIcon = {
    [SYMBOLS[0]]: Person,
    [SYMBOLS[1]]: Airplane,
    [SYMBOLS[2]]: Bicycle,
    [SYMBOLS[3]]: Boat,
    [SYMBOLS[4]]: Bus,
    [SYMBOLS[5]]: CarSport,
};

/**
 * Takes a date object and returns the time period of the date.
 * The time period is the first digit of the seconds of the date.
 */
export function getTimePeriod(date) {
    return Math.floor(date.getSeconds() / 10);
}

/**
 * Takes a date object and converts it to a string in format 'YYYY-MM-DD HH:mm:SS'
 */
export function dateToString(date) {
    // ISO String is in format 'YYYY-MM-DDTHH:mm:SS.SSSZ', so we replace the 'T' with a space and
    // keep only the part up to the seconds, normally we would use day.js for this, but there is no reason to
    // add another dependency for this simple task
    const dateParts = date.toString().split(' ');
    return `${dateParts[3]}-${date.getMonth() + 1}-${dateParts[2]} ${dateParts[4]}`;
}
