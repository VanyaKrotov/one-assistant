import { FC } from 'react';
import { Dropdown } from 'rsuite';
import {
  ContextMenu as ContextMenuLib,
  MenuItem as NativeMenuItem,
} from 'react-contextmenu';

import { ContextMenuItem } from './types';
import { utils, styles } from './duck';

interface ContextMenuProps {
  items: ContextMenuItem[];
  id: string;
}

const { MenuItem } = styles;

const ContextMenu: FC<ContextMenuProps> = ({ id, items }) => (
  <ContextMenuLib id={id}>
    <Dropdown.Menu>
      {items.map(({ handler, label, icon, className }) => (
        <NativeMenuItem onClick={utils.handlerBuilder(handler)} key={label}>
          <MenuItem icon={icon} className={className}>
            {label}
          </MenuItem>
        </NativeMenuItem>
      ))}
    </Dropdown.Menu>
  </ContextMenuLib>
);

export default ContextMenu;
