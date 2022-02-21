// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProfileSettings {}

export interface WorkEnvironments {
  id: string;
  title: string;
}

export interface ProfilePreview {
  id: string;
  name: string;
  email: string;
  color: string;
  lastLogin: Date | null;
  dateCreated: Date;
}

interface Profile extends ProfilePreview {
  activeWorkEnvironment: string;
  workEnvironments: Record<string, WorkEnvironments>;
  settings: ProfileSettings;
}

export default Profile;
