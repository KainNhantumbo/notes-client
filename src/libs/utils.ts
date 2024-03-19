import moment from 'moment';

export function formatDate(date: string): string {
  return moment(date).format('LL');
}

export function formatDateByCalendar(date: string): string {
  return moment(date).calendar();
}

export function formatDateByType(date: string, format: string): string {
  return moment(date).format(format);
}
