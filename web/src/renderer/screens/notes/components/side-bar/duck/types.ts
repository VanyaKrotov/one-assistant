import { SidebarStates } from './constants';

export interface SidebarState {
  state: SidebarStates;
  payload: number | string | null;
}
