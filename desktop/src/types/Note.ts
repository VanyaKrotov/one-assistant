import Profile from './Profile';

export enum NoteType {
  Base,
  Daily,
}

export interface Viewer {
  lastView: number | null;
  active: boolean;
  startShared: number | null;
  rules: SharedRules;
  workEnvironment: string;
}

interface Note {
  id: string;
  title: string;
  type: NoteType;
  content: string | null;
  dateCreated: number;
  lastUpdated: number | null;
  pined?: boolean;
  prevId: string | null;
  viewers: Record<string, Viewer>;
}

export interface ExtendNote extends Omit<Note, 'viewers'> {
  viewers: Record<string, Profile>;
}

export enum SharedRules {
  Read = 1,
  Write = 2,
  All = Read + Write,
}

export default Note;
