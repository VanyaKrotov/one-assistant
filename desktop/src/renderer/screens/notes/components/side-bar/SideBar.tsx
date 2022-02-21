import React, { FC, useMemo, useState } from 'react';
import { ButtonToolbar, FlexboxGrid, IconButton, Input, List } from 'rsuite';
import { observer } from 'mobx-react-lite';
import { ContextMenuTrigger } from 'react-contextmenu';

import { getDailyTitle } from 'helpers/text';

import { notes, storage } from 'renderer/store';
import { Section, Sections } from 'renderer/components/menu';
import ContextMenu from 'renderer/components/context-menu';
import { useKeyPress } from 'renderer/hooks';

import AddIcon from 'renderer/icons/add.svg';
import SearchIcon from 'renderer/icons/search.svg';
import PinedIcon from 'renderer/icons/pined.svg';

import { DailyPicker, PageListItem } from './components/styles';
import { SidebarState } from './duck/types';
import {
  DEFAULT_SIDEBAR_STATE,
  FREE_MENU_OPTIONS,
  PINED_MENU_OPTIONS,
  SidebarStates,
} from './duck/constants';

const SideBar: FC = () => {
  const [state, setState] = useState<SidebarState>(DEFAULT_SIDEBAR_STATE);
  const { dailyPages } = notes;

  const dailyPagesList = useMemo(
    () =>
      dailyPages.map(({ id, dateCreated }) => ({
        label: getDailyTitle(dateCreated),
        value: id,
      })),
    [dailyPages]
  );

  const resetState = () => setState(DEFAULT_SIDEBAR_STATE);

  const onAddItem = async ({
    target,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    const noteName = (target as HTMLInputElement).value;
    if (!noteName) {
      return;
    }

    const result = await notes.addNote(noteName);
    if (result) {
      resetState();
    }
  };

  useKeyPress({
    Escape: resetState,
  });

  return (
    <Sections>
      <ContextMenu id="pined-menu-notes" items={PINED_MENU_OPTIONS} />
      <ContextMenu id="free-menu-notes" items={FREE_MENU_OPTIONS} />
      {notes.dailyPages.length > 0 && (
        <Section title="Ежедневная">
          <DailyPicker
            value={storage.selectedNoteId}
            data={dailyPagesList}
            onChange={(val: string) => storage.setSelectedNoteId(val)}
            placeholder="Не выбрано"
          />
        </Section>
      )}
      {notes.pinedPages.length > 0 && (
        <Section title="Закреплено">
          <List className="without-shadow">
            {notes.pinedPages.map(({ title, id }, index) => (
              <ContextMenuTrigger id="pined-menu-notes" key={id}>
                <PageListItem
                  selected={storage.selectedNoteId === id}
                  index={index}
                  onClick={() => storage.setSelectedNoteId(id)}
                >
                  <FlexboxGrid align="middle" justify="space-between">
                    <FlexboxGrid.Item>{title}</FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                      <object>
                        <IconButton
                          title="Открепить"
                          onClick={(event) => {
                            event.stopPropagation();
                            notes.changePinedById(id, false);
                          }}
                          icon={<PinedIcon />}
                          size="xs"
                          appearance="subtle"
                        />
                      </object>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </PageListItem>
              </ContextMenuTrigger>
            ))}
          </List>
        </Section>
      )}
      <Section
        title="Страницы"
        additionalButtons={
          <ButtonToolbar className="margin-right-5">
            <IconButton
              icon={<AddIcon />}
              circle
              size="xs"
              appearance="subtle"
              title="Добавить страницу"
              onClick={() =>
                setState({ state: SidebarStates.AddItem, payload: null })
              }
            />
            <IconButton
              icon={<SearchIcon />}
              circle
              size="xs"
              appearance="subtle"
              title="Поиск по страницам"
            />
          </ButtonToolbar>
        }
      >
        <List
          className="without-shadow"
          sortable
          onSort={(moveInfo) =>
            notes.changeOrder(moveInfo?.oldIndex, moveInfo?.newIndex)
          }
        >
          {notes.unPinedPages.map(({ title, id }, index) => (
            <ContextMenuTrigger id="free-menu-notes" key={id}>
              <PageListItem
                data-uid={id}
                selected={storage.selectedNoteId === id}
                index={index}
                onClick={() => storage.setSelectedNoteId(id)}
              >
                {title}
              </PageListItem>
            </ContextMenuTrigger>
          ))}
          {state.state === SidebarStates.AddItem && (
            <PageListItem>
              <Input
                autoFocus
                size="xs"
                placeholder="Введите название"
                onPressEnter={onAddItem}
                onBlur={resetState}
              />
            </PageListItem>
          )}
        </List>
      </Section>
    </Sections>
  );
};

export default observer(SideBar);
