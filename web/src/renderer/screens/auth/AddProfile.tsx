import { useState } from 'react';
import {
  Button,
  ButtonToolbar,
  FlexboxGrid,
  Form,
  Progress,
  Rate,
} from 'rsuite';
import { useNavigate } from 'react-router-dom';

import { COLORS_PALETTE } from 'definitions/styles';
import { Screens } from 'definitions/screens';

import ProfilePreview from 'renderer/components/profile-preview';
import LockIcon from 'renderer/icons/lock.svg';
import { ColorPicker } from 'renderer/components/pickers';
import { CentredContainer } from 'renderer/components/containers';
import { profile } from 'renderer/store';

import { AddProfileValues } from './duck/types';
import {
  ADD_PROFILE_SCHEMA,
  CREATE_PROFILE_VALUES,
  PASSWORD_SECURE_LEVEL_TEXT,
} from './duck/constants';
import {
  BottomControl,
  FormAddControl,
  Frame,
  FormTitle,
  ProfilePreviewContainer,
  PasswordSecureContainer,
  SecureTitle,
  LevelWordState,
} from './components/styles';
import {
  getFormCompletePercent,
  getPasswordSecureLevel,
} from './duck/selectors';

const AddProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<AddProfileValues>(
    CREATE_PROFILE_VALUES
  );
  const [formNotify, setFormNotify] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { color, level } = getPasswordSecureLevel(formValues.password);
  const completePercent = getFormCompletePercent(formValues);
  const navigate = useNavigate();

  const onSubmit = async (isValid: boolean): Promise<boolean> => {
    if (!isValid) {
      return false;
    }

    setIsSubmitting(true);

    const savedError = await profile.addProfile(formValues);

    if (savedError) {
      setFormNotify(savedError);
      setIsSubmitting(false);

      return false;
    }

    navigate(Screens.SignIn);

    return true;
  };

  const hasErrors = Object.keys(formErrors).length > 0;

  return (
    <CentredContainer>
      <Frame>
        <Form
          onCheck={setFormErrors}
          model={ADD_PROFILE_SCHEMA}
          className="full-height"
          formValue={formValues}
          onSubmit={onSubmit}
          onChange={(values) => setFormValues(values as AddProfileValues)}
          fluid
        >
          <FormTitle>Создание нового рабочего профиля</FormTitle>

          <FormAddControl>
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item colspan={12} className="padding-20">
                <ProfilePreviewContainer>
                  <ProfilePreview
                    profile={formValues}
                    size="lg"
                    className="margin-right-15"
                    defaultEmail="example@email.com"
                    defaultName="Name of profile"
                  />
                </ProfilePreviewContainer>

                <PasswordSecureContainer>
                  <SecureTitle>
                    Уровень надежности пароля (
                    <LevelWordState color={color}>
                      {formValues.password
                        ? PASSWORD_SECURE_LEVEL_TEXT[level]
                        : '-'}
                    </LevelWordState>
                    )
                  </SecureTitle>
                  <Rate
                    readOnly
                    value={level}
                    character={<LockIcon />}
                    style={{ color }}
                  />
                </PasswordSecureContainer>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={12} className="padding-20">
                <Form.Group controlId="name">
                  <Form.ControlLabel>Название профиля</Form.ControlLabel>
                  <Form.Control name="name" autoFocus />
                  <Form.Control
                    name="color"
                    data={COLORS_PALETTE}
                    accepter={ColorPicker}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.ControlLabel>Почта</Form.ControlLabel>
                  <Form.Control name="email" type="email" />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.ControlLabel>Пароль</Form.ControlLabel>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group controlId="passwordConfirmation">
                  <Form.ControlLabel>Повтор пароля</Form.ControlLabel>
                  <Form.Control
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="off"
                  />
                </Form.Group>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FormAddControl>

          <Progress.Line percent={completePercent} />

          <BottomControl>
            <FlexboxGrid align="middle">
              <FlexboxGrid.Item colspan={13}>
                {formNotify}
                {hasErrors && 'Форма заполнена не корректно'}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={11}>
                <ButtonToolbar className="text-align-right">
                  <Button
                    appearance="subtle"
                    onClick={() => navigate(Screens.SignIn)}
                  >
                    Войти в другой профиль
                  </Button>
                  <Button
                    type="submit"
                    appearance="primary"
                    disabled={completePercent !== 100 || isSubmitting}
                  >
                    Создать профиль
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

export default AddProfile;
