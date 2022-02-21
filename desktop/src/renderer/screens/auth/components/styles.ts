import styled from 'styled-components';

export const Frame = styled.div`
  width: 800px;
  height: 568px;
  background-color: var(--rs-gray-700);
`;

export const FormTitle = styled.h4`
  text-align: center;
  padding: 10px 20px;
`;

export const FormAddControl = styled.div`
  height: calc(100% - 150px);
  width: 100%;
`;

export const FormSignInControl = styled.div`
  height: calc(100% - 114px);
  width: 100%;
`;

export const BottomControl = styled.div`
  height: 60px;
  padding: 10px 20px;
`;

export const ProfilePreviewContainer = styled.div`
  margin: 56px 0px 20px 0px;
  padding: 10px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  border: 2px solid var(--rs-divider-border);
`;

export const PasswordSecureContainer = styled.div`
  margin-top: 94px;
  padding: 10px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  border: 2px solid var(--rs-divider-border);
`;

export const SecureTitle = styled.p`
  line-height: 150%;
  margin-bottom: 15px;
`;

export const LevelWordState = styled.span`
  color: ${({ color }) => color};
`;

export const SavedProfilesTitle = styled.p`
  font-size: 16px;
  line-height: 120%;
  font-weight: 500;
  margin-bottom: 26px;
`;

export const SavedProfiles = styled.div`
  overflow-y: auto;
  height: 340px;
`;

export const SavedProfile = styled.button.attrs({ type: 'button' })<{
  selected: boolean;
}>`
  border: 2px solid transparent;
  background-color: ${({ selected }) =>
    selected ? ' var(--rs-gray-600)' : 'transparent'};
  text-align: start;
  padding: 10px;
  width: 100%;

  & button.remove {
    display: ${({ selected }) => (selected ? 'inline-block' : 'none')};
  }

  &:hover {
    background-color: var(--rs-gray-600);
  }

  &:enabled:focus button.remove,
  &:enabled:hover button.remove {
    display: inline-block;
  }

  &:enabled:focus {
    border: 2px solid var(--rs-gray-800);
  }
`;

export const ProfileContainer = styled.div`
  margin-bottom: 15px;
`;

export const ProfileName = styled.h5`
  margin: 10px;
  font-weight: 500;
`;
