import { getSymbolsByProfileName } from 'helpers/text';
import { FC } from 'react';
import { Avatar, AvatarProps, FlexboxGrid } from 'rsuite';
import Profile from 'types/Profile';
import { Email, ProfileName } from './styles';

interface ProfilePreviewProps {
  profile: Pick<Profile, 'color' | 'email' | 'name'>;
  defaultName?: string;
  defaultEmail?: string;
  className?: string;
  onlyName?: boolean;
  size?: AvatarProps['size'];
}

const ProfilePreview: FC<ProfilePreviewProps> = ({
  defaultName,
  defaultEmail,
  size,
  className,
  onlyName,
  profile: { name, email, color },
}) => {
  const viewedName = (name || defaultName) as string;
  const viewedEmail = email || defaultEmail;

  return (
    <FlexboxGrid align="middle">
      <FlexboxGrid.Item className={className}>
        <Avatar circle size={size} style={{ backgroundColor: color }}>
          {getSymbolsByProfileName(viewedName)}
        </Avatar>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        {viewedName && <ProfileName size={size}>{viewedName}</ProfileName>}
        {viewedEmail && !onlyName && <Email size={size}>{viewedEmail}</Email>}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

ProfilePreview.defaultProps = {
  defaultName: '',
  defaultEmail: '',
  className: 'margin-right-5',
  size: 'md',
  onlyName: false,
};

export default ProfilePreview;
