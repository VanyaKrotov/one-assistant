import { User as FirebaseUser } from 'firebase/auth';
import Profile from 'types/Profile';

export const mapFirebaseProfileToProfile = (
  { uid, email }: FirebaseUser,
  additionalInfo: Partial<Profile> = {}
): Profile => ({
  id: uid,
  email: email!,
  settings: {},
  color: '',
  name: '',
  dateCreated: new Date(),
  workEnvironments: {},
  lastLogin: null,
  ...additionalInfo,
});
