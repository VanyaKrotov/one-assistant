import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Divider, Dropdown, SelectPicker } from 'rsuite';

import { WindowEventMessage } from 'definitions/window';
import { Screens } from 'definitions/screens';

import ProfilePreview from 'renderer/components/profile-preview';
import MinimizeIcon from 'renderer/icons/title-bar/minimize.svg';
import MaximizeIcon from 'renderer/icons/title-bar/maximize.svg';
import RestoreIcon from 'renderer/icons/title-bar/restore.svg';
import CloseIcon from 'renderer/icons/title-bar/close.svg';
import SettingsIcon from 'renderer/icons/settings.svg';
import LogoIcon from 'renderer/icons/logo20.svg';

import { view, profile } from 'renderer/store';

import { DEFAULT_PROFILE_COLOR } from '../constants';
import {
  ButtonControl,
  TitleContainer,
  IconControl,
  TitleControl,
  Button,
  FrameContainer,
  ContentContainer,
  TabsContainer,
  Tab,
  SettingsButton,
  ProfileTab,
  WindowGlobalStyle,
} from './styles';

const { ipcRenderer } = window.require('electron');

interface WindowFrameProps {
  children: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const profileName = profile.isAuthorized
    ? `${profile.profile?.name} | ${profile.activeEnvironment?.title || ''}`
    : `${profile.isAuthorizeChecked ? 'Ошибка' : 'Загрузка...'}`;
  const workEnvironments = Object.values(
    profile.profile?.workEnvironments || {}
  ).map(({ title, id }) => ({ label: title, value: id }));

  return (
    <FrameContainer>
      <WindowGlobalStyle />
      <TitleContainer>
        <IconControl>
          <LogoIcon />
        </IconControl>
        <TabsContainer>
          <Tab
            aria-selected={pathname === Screens.Notes}
            onClick={() => navigate(Screens.Notes)}
            disabled={!profile.isAuthorized}
          >
            Заметки
          </Tab>

          <Tab
            aria-selected={pathname === Screens.Tasks}
            onClick={() => navigate(Screens.Tasks)}
            disabled={!profile.isAuthorized}
          >
            Задачи
          </Tab>

          <Tab
            aria-selected={pathname === Screens.Passwords}
            onClick={() => navigate(Screens.Passwords)}
            disabled={!profile.isAuthorized}
          >
            Пароли
          </Tab>
        </TabsContainer>
        <TitleControl>{view.title}</TitleControl>
        <TabsContainer>
          <Dropdown
            renderToggle={(props, ref) => (
              <ProfileTab ref={ref} {...props} disabled={!profile.isAuthorized}>
                <ProfilePreview
                  className="margin-right-5"
                  size="xs"
                  onlyName
                  profile={{
                    color: profile.profile?.color || DEFAULT_PROFILE_COLOR,
                    name: profileName,
                    email: '',
                  }}
                />
              </ProfileTab>
            )}
          >
            {profile.profile && (
              <div style={{ padding: 10, width: 200 }}>
                <ProfilePreview profile={profile.profile} size="sm" />
              </div>
            )}

            <Divider style={{ margin: '2px 0px' }} />

            <SelectPicker
              data={workEnvironments}
              appearance="subtle"
              cleanable={false}
              searchable={false}
              disabled={workEnvironments.length === 1}
              value={profile.activeEnvironment?.id}
              className="full-width"
            />

            <Divider style={{ margin: '2px 0px' }} />

            <Dropdown.Item onClick={() => profile.signOut()}>
              Сменить профиль
            </Dropdown.Item>
          </Dropdown>
        </TabsContainer>
        <ButtonControl>
          <SettingsButton
            aria-selected={pathname === Screens.Settings}
            onClick={() => navigate(Screens.Settings)}
            disabled={!profile.isAuthorized}
          >
            <SettingsIcon />
          </SettingsButton>
          <Button
            onClick={() => ipcRenderer.send(WindowEventMessage.Minimize)}
            focused={false}
          >
            <MinimizeIcon />
          </Button>
          <Button
            onClick={() => ipcRenderer.send(WindowEventMessage.Maximize)}
            focused={false}
          >
            {view.isMaximizeWindow ? <RestoreIcon /> : <MaximizeIcon />}
          </Button>
          <Button
            onClick={() => ipcRenderer.send(WindowEventMessage.Close)}
            focused={false}
          >
            <CloseIcon />
          </Button>
        </ButtonControl>
      </TitleContainer>
      <ContentContainer>{children}</ContentContainer>
    </FrameContainer>
  );
};

export default observer(WindowFrame);
