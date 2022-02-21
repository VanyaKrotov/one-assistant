import { Theme } from 'definitions/styles';

export const getSystemTheme = (): Theme => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isDarkMode ? Theme.Dark : Theme.Light;
};
