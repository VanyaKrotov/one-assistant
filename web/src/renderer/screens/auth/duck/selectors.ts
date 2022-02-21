import { AddProfileValues } from './types';

export const getPasswordSecureLevel = (
  password: string
): { level: number; color: string } => {
  if (!password) {
    return { level: 0, color: '' };
  }

  const level = [
    password.match(/^.*\d+.*$/),
    password.match(/^.*[a-z]+.*$/),
    password.match(/^.*[A-Z]+.*$/),
    password.match(/^.*[-,_.*&#$]+.*$/),
  ]
    .map(Boolean)
    .map(Number)
    .reduce((acc, el) => acc + el, 1);

  return {
    level,
    color: [
      'var(--rs-red-500)',
      'var(--rs-orange-500)',
      'var(--rs-yellow-500)',
      'var(--rs-cyan-500)',
      'var(--rs-green-500)',
    ][level - 1],
  };
};

export const getFormCompletePercent = ({
  email,
  name,
  password,
  passwordConfirmation,
}: AddProfileValues): number =>
  [
    email,
    name,
    password,
    passwordConfirmation && passwordConfirmation === password,
  ].reduce((acc, el) => acc + Number(Boolean(el)), 0) * 25;
