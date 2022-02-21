import { Schema } from 'rsuite';

import { COLORS_PALETTE } from 'definitions/styles';
import { AddProfileValues, SignInProfileValues } from './types';

export const CREATE_PROFILE_VALUES: AddProfileValues = {
  color: COLORS_PALETTE[0].value,
  email: '',
  name: '',
  passwordConfirmation: '',
  password: '',
  dateCreated: new Date(),
  lastLogin: null,
};

export const SIGN_IN_PROFILE_VALUES: SignInProfileValues = {
  email: '',
  password: '',
};

export const ADD_PROFILE_SCHEMA = Schema.Model({
  name: Schema.Types.StringType().isRequired('Данное поле обязательно.'),
  email: Schema.Types.StringType()
    .isEmail('Пожалуйста введите корректную почту.')
    .isRequired('Данное поле обязательно.'),
  password: Schema.Types.StringType()
    .isRequired('Данное поле обязательно.')
    .minLength(8, 'Слишком короткий пароль.'),
  passwordConfirmation: Schema.Types.StringType()
    .isRequired('Данное поле обязательно.')
    .addRule(
      (value, { password }) => value === password,
      'Пароли не совпадают.'
    ),
});

export const PASSWORD_SECURE_LEVEL_TEXT = [
  'плохо',
  'не безопасно',
  'хорошо',
  'надежно',
  'несокрушим',
];
