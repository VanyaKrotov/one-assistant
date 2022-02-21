import { makeAutoObservable } from 'mobx';
import {
  child,
  DatabaseReference,
  get,
  onValue,
  ref,
  set,
  Unsubscribe,
  update,
} from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { nanoid } from 'nanoid';

import Profile, { WorkEnvironments } from 'types/Profile';
import { mapFirebaseProfileToProfile } from 'helpers/mappers';

import { auth, db } from 'renderer/firebase';
import {
  AddProfileValues,
  SignInProfileValues,
} from 'renderer/screens/auth/duck/types';

import LocalDataStore from '../local-data';

class ProfileStore {
  private ref: DatabaseReference;

  private unsubscribe: Unsubscribe | null = null;

  public profile: Profile | null = null;

  private isCheckedAuthorize = false;

  private isProfileLoaded = false;

  constructor(private readonly storage: LocalDataStore) {
    makeAutoObservable(this);

    this.ref = ref(db, 'profiles');
    this.init();
  }

  public async checkAuthorize(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        this.isCheckedAuthorize = true;

        resolve(user);
        unsubscribe();
      });
    });
  }

  public get profileId() {
    return this.profile?.id || '';
  }

  public get isAuthorizeChecked() {
    return this.isProfileLoaded && this.isCheckedAuthorize;
  }

  public get activeEnvironment(): WorkEnvironments | null {
    if (this.profile?.activeWorkEnvironment) {
      return this.profile?.workEnvironments[
        this.profile?.activeWorkEnvironment
      ];
    }

    return null;
  }

  private async init() {
    const user = await this.checkAuthorize();
    if (user) {
      this.addProfileObserver(user.uid);
    } else {
      this.isProfileLoaded = true;
    }
  }

  public get isAuthorized(): boolean {
    return Boolean(this.profile);
  }

  public async addProfile({
    email,
    password,
    color,
    name,
  }: AddProfileValues): Promise<string | null> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const workEnvironment = {
        id: nanoid(16),
        title: 'common',
      };

      const profile = mapFirebaseProfileToProfile(result.user, {
        color,
        name,
        dateCreated: new Date(),
        workEnvironments: {
          [workEnvironment.id]: workEnvironment,
        },
      });

      await set(child(this.ref, profile.id), profile);

      this.storage.addProfile(profile);

      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      return (error as Error).message;
    }
  }

  public async signIn({
    email,
    password,
  }: SignInProfileValues): Promise<string | null> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await update(child(this.ref, result.user.uid), { lastLogin: new Date() });

      const snapshot = await get(child(this.ref, result.user.uid));
      const profile = mapFirebaseProfileToProfile(result.user, snapshot.val());

      this.profile = profile;
      this.storage.addProfile(profile);

      this.addProfileObserver(this.profile.id);

      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      return (error as Error).message;
    }
  }

  private addProfileObserver(userId: string) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.unsubscribe = onValue(child(this.ref, userId), (snapshot) => {
      this.profile = snapshot.val();
      this.isProfileLoaded = true;
    });
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(auth);
      this.profile = null;

      if (this.unsubscribe) {
        this.unsubscribe();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

export default ProfileStore;
