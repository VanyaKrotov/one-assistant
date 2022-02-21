import { useMemo } from 'react';

import Note, { Viewer } from 'types/Note';
import { ProfilePreview } from 'types/Profile';

import { cache } from 'renderer/store';

export interface JoinedViewers {
  profile: ProfilePreview;
  viewInfo: Viewer;
}

export const useJoinedViewers = (
  currentNote?: Note | null
): JoinedViewers[] => {
  return useMemo<JoinedViewers[]>(
    () =>
      Object.entries(currentNote?.viewers || {})
        .map(([id, viewInfo]) => ({
          profile: cache.profilesMap[id],
          viewInfo,
        }))
        .filter((e) => e.profile),
    [currentNote]
  );
};
