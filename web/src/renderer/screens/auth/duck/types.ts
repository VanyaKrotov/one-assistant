import Profile from 'types/Profile';

export interface AddProfileValues extends Omit<Profile, 'settings' | 'id'> {
  passwordConfirmation: string;
  password: string;
}

export interface SignInProfileValues extends Pick<Profile, 'email'> {
  password: string;
}
