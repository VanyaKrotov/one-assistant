import { getSymbolsByProfileName } from 'helpers/text';
import { FC } from 'react';

import { Viewer } from 'types/Note';
import { ProfilePreview } from 'types/Profile';

import ShareIcon from 'renderer/icons/share.svg';
import { Container, ShareIconsContainer, Avatar } from './styles';

interface SharedToProps {
  viewers: { profile: ProfilePreview; viewInfo: Viewer }[];
}

const SharedTo: FC<SharedToProps> = ({ viewers }) => (
  <Container title="Управление доступом">
    <ShareIconsContainer>
      <ShareIcon />
    </ShareIconsContainer>
    {viewers.map(({ profile, viewInfo }) => (
      <Avatar
        key={profile.id}
        style={{ backgroundColor: profile.color }}
        data-active={viewInfo.active}
      >
        {getSymbolsByProfileName(profile.name)}
      </Avatar>
    ))}
  </Container>
);

export default SharedTo;
