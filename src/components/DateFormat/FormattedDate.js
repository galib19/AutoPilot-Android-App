import moment from 'moment';

export function getDateMMM(date) {
    return moment(date).format('MMM DD, YYYY');
}

export function getTime12HourFormat(date) {
    return moment(date).format('hh:mm a');
}

export function getMMDDYYYY(date) {
    return moment(date).format('MM-DD-YYYY');
}

export function getYYYYMMDDWithTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}