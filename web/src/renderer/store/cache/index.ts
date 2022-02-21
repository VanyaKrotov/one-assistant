import { makeAutoObservable, reaction } from 'mobx';
import { db } from 'renderer/firebase';
import { Unsubscribe } from 'firebase/auth';
import { onValue, ref, child } from 'firebase/database';

import { ProfilePreview } from 'types/Profile';
import LocalDataStore from '../local-data';

class CacheStore {
  public profilesMap: Record<string, ProfilePreview> = {};

  private profilesUnsubscribeMap: Record<string, Unsubscribe> = {};

  constructor(private readonly storage: LocalDataStore) {
    makeAutoObservable(this);

    reaction(() => this.storage.profilesForCache, this.setSubscribeProfiles);
    this.setSubscribeProfiles(this.storage.profilesForCache);
  }

  private setSubscribeProfiles = (profilesList: string[]) => {
    profilesList.forEach((id) => {
      if (!this.profilesUnsubscribeMap[id]) {
        return;
      }

      this.profilesUnsubscribeMap[id]();

      const { [id]: rem, ...restUns } = this.profilesUnsubscribeMap;
      const { [id]: test, ...restProfiles } = this.profilesMap;

      this.profilesUnsubscribeMap = restUns;
      this.profilesMap = restProfiles;
    });

    profilesList.forEach((id) => {
      if (this.profilesUnsubscribeMap[id]) {
        return;
      }

      this.profilesUnsubscribeMap[id] = onValue(
        child(ref(db, 'profiles'), id),
        (snapshot) => {
          const {
            activeWorkEnvironment,
            workEnvironments,
            settings,
            ...profile
          } = snapshot.val();

          this.profilesMap[id] = profile;
        }
      );
    });
  };
}

export default CacheStore;
