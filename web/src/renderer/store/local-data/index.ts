import { makeAutoObservable } from 'mobx';

import Profile from 'types/Profile';

class LocalDataStore {
  private savedProfiles: Profile[] = [];

  private _selectedNoteId: string | null = null;

  private _profilesForCache: Set<string> = new Set();

  constructor() {
    makeAutoObservable(this);

    const localParsedData = JSON.parse(localStorage.getItem('storage') || '{}');

    this.savedProfiles = localParsedData.savedProfiles || [];
    this._selectedNoteId = localParsedData._selectedNoteId || null;
    this._profilesForCache = localParsedData._profilesForCache || [];
  }

  private saveStorage(): void {
    localStorage.setItem('storage', JSON.stringify(this));
  }

  public set profiles(values: Profile[]) {
    this.savedProfiles = values;
    this.saveStorage();
  }

  public get profiles(): Profile[] {
    return this.savedProfiles;
  }

  public addProfile(newProfile: Profile) {
    this.profiles = this.profiles.concat(newProfile);

    return this.profiles;
  }

  public removeProfile(id: string) {
    this.profiles = this.profiles.filter((profile) => profile.id !== id);
  }

  public get selectedNoteId() {
    return this._selectedNoteId;
  }

  public get profilesForCache() {
    return this._profilesForCache;
  }

  public addProfileForCache(id: string) {
    this._profilesForCache = this._profilesForCache.add(id);
  }

  public addProfilesForCache(ids: string[]) {
    this._profilesForCache = new Set([...this._profilesForCache, ...ids]);
  }

  public removeProfileForCache(id: string) {
    this.profilesForCache.delete(id);
  }

  public removeProfilesForCache(ids: string[]) {
    ids.forEach((val) => {
      this.profilesForCache.delete(val);
    });
  }

  public setSelectedNoteId(value: string | null) {
    this._selectedNoteId = value;
    this.saveStorage();
  }
}

export default LocalDataStore;
