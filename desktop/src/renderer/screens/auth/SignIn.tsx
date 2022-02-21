import { Screens } from 'definitions/screens';
import { getSymbolsByProfileName } from 'helpers/text';
import { Observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  ButtonToolbar,
  FlexboxGrid,
  Form,
  IconButton,
} from 'rsuite';

import Profile from 'types/Profile';

import { CentredContainer } from 'renderer/components/containers';
import ProfilePreview from 'renderer/components/profile-preview';
import { profile, storage } from 'renderer/store';

import TrashIcon from 'renderer/icons/trash.svg';

import {
  BottomControl,
  FormSignInControl,
  FormTitle,
  Frame,
  ProfileContainer,
  ProfileName,
  SavedProfile,
  SavedProfiles,
  SavedProfilesTitle,
} from './components/styles';
import { SIGN_IN_PROFILE_VALUES } from './duck/constants';
import { SignInProfileValues } from './duck/types';

const SignIn = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [formValues, setFormValues] = useState<SignInProfileValues>(
    SIGN_IN_PROFILE_VALUES
  );
  const navigate = useNavigate();

  const changeSelectedProfile = (newProfile: Profile | null) => {
    setSelectedProfile(newProfile);
    setFormValues((prev) => ({ ...prev, email: newProfile?.email || '' }));
  };

  const onSubmit = async (isValid: boolean): Promise<boolean> => {
    if (!isValid) {
      return false;
    }

    setIsSubmitting(true);

    let status = true;
    const result = await profile.signIn(formValues);
    if (result) {
      setError(result);

      status = false;
    }

    setIsSubmitting(false);

    if (status) {
      navigate(Screens.Notes);
    }

    return status;
  };

  return (
    <CentredContainer>
      <Frame>
        <Form
          formValue={formValues}
          onChange={(values) => setFormValues(values as SignInProfileValues)}
          className="full-height"
          onSubmit={onSubmit}
        >
          <FormTitle>Авторизация профиля</FormTitle>
          <FormSignInControl>
            <FlexboxGrid className="full-width full-height" align="middle">
              <FlexboxGrid.Item colspan={12} className="padding-20">
                <SavedProfilesTitle>
                  Ваши сохраненные профили
                </SavedProfilesTitle>
                <Observer>
                  {() => (
                    <SavedProfiles>
                      {storage.profiles.map((savedProfile) => (
                        <SavedProfile
                          key={savedProfile.email}
                          selected={savedProfile === selectedProfile}
                          onClick={() => changeSelectedProfile(savedProfile)}
                        >
                          <FlexboxGrid justify="space-between" align="middle">
                            <FlexboxGrid.Item>
                              <ProfilePreview
                                profile={savedProfile}
                                key={savedProfile.name}
                              />
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item>
                              <object>
                                <IconButton
                                  className="remove"
                                  size="sm"
                                  circle
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    storage.removeProfile(savedProfile.id);
                                  }}
                                  icon={<TrashIcon />}
                                />
                              </object>
                            </FlexboxGrid.Item>
                          </FlexboxGrid>
                        </SavedProfile>
                      ))}
                    </SavedProfiles>
                  )}
                </Observer>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={12} className="padding-20 ">
                <CentredContainer>
                  <ProfileContainer>
                    <CentredContainer>
                      <Avatar
                        size="lg"
                        circle
                        style={{ backgroundColor: selectedProfile?.color }}
                      >
                        {getSymbolsByProfileName(selectedProfile?.name)}
                      </Avatar>
                      {selectedProfile?.name && (
                        <ProfileName>{selectedProfile.name}</ProfileName>
                      )}
                    </CentredContainer>
                  </ProfileContainer>

                  {!selectedProfile && (
                    <Form.Group controlId="email">
                      <Form.ControlLabel>Почта</Form.ControlLabel>
                      <Form.Control name="email" type="email" autoFocus />
                    </Form.Group>
                  )}

                  <Form.Group controlId="password">
                    <Form.ControlLabel>Пароль</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="password"
                      autoFocus={Boolean(selectedProfile)}
                      autoComplete="off"
                    />
                  </Form.Group>
                </CentredContainer>
                {selectedProfile && (
                  <Button
                    appearance="link"
                    className="margin-left-20 margin-top-15"
                    onClick={() => changeSelectedProfile(null)}
                  >
                    Войти в другой аккаунт
                  </Button>
                )}
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FormSignInControl>

          <BottomControl>
            <FlexboxGrid align="middle" justify="space-between">
              <FlexboxGrid.Item>{error}</FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <ButtonToolbar>
                  <Button
                    appearance="subtle"
                    onClick={() => navigate(Screens.AddProfile)}
                  >
                    Добавить новый профиль
                  </Button>
                  <Button
                    appearance="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Войти
                  </Button>
                </ButtonToolbar>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </BottomControl>
        </Form>
      </Frame>
    </CentredContainer>
  );
};

export default SignIn;
