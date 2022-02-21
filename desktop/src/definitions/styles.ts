import ValueLabel from 'types/ValueLabel';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const COLORS_PALETTE: ValueLabel<string>[] = [
  { label: 'gray', value: 'var(--rs-gray-500)' },
  { label: 'primary', value: 'var(--rs-primary-500)' },
  { label: 'orange', value: 'var(--rs-orange-500)' },
  { label: 'red', value: 'var(--rs-red-500)' },
  { label: 'yellow', value: 'var(--rs-yellow-500)' },
  { label: 'green', value: 'var(--rs-green-500)' },
  { label: 'violet', value: 'var(--rs-violet-500)' },
];
