import { format, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { NOTE_TYPE_LABELS } from 'definitions/notes';
import { NoteType } from 'types/Note';

export const getSymbolsByProfileName = (name?: string | null): string => {
  if (!name) {
    return '??';
  }

  return name
    .split(' ')
    .filter((word) => word.length > 2)
    .map((word) => word[0].toLocaleUpperCase())
    .slice(0, 2)
    .join('');
};

export const getDailyTitle = (date: number | Date): string => {
  const formatDate = format(date, 'dd MMM yyyy', { locale: ru });

  if (isToday(date)) {
    return `Сегодня (${formatDate})`;
  }

  if (isYesterday(date)) {
    return `Вчера (${formatDate})`;
  }

  return formatDate;
};

export const getNoteTypeLabel = (noteType: NoteType): string =>
  NOTE_TYPE_LABELS[noteType];
