import { useState } from 'react';
import './System.scss';
import SystemMenu from '../SystemMenu/SystemMenu';
import { SYSTEM_MENU } from '../../util/constant';
import SystemMenuAction from '../SystemMenuAction/SystemMenuAction';
import type { VALUES_ACTION_TYPES } from '../../util/constant';

export type T_Menu = {
  text: string;
  onClickMenu: () => void;
};

function System({ show }: { show: boolean }) {
  const [activeSystemMenu, setActiveSystemMenu] =
    useState<VALUES_ACTION_TYPES>('');
  const [activeSystemMenuText, setActiveSystemMenuText] = useState<string>('');

  const systemMenuList: T_Menu[] = SYSTEM_MENU.map((sysMenu) => {
    return {
      text: sysMenu.title,
      onClickMenu: () => {
        setActiveSystemMenu(sysMenu.action);
        setActiveSystemMenuText(sysMenu.title);
      },
    };
  });

  const onClickMenu = (menu: T_Menu) => {
    menu.onClickMenu();
  };

  return (
    <div style={{ display: `${show ? 'block' : 'none'}` }}>
      <div className="system-menu-container">
        {systemMenuList.map((menu) => {
          return (
            <SystemMenu
              key={menu.text}
              menu={menu}
              onClick={() => onClickMenu(menu)}
            />
          );
        })}
      </div>

      <SystemMenuAction
        activeSystemMenu={activeSystemMenu}
        setActiveSystemMenu={setActiveSystemMenu}
        activeSystemMenuText={activeSystemMenuText}
      />
    </div>
  );
}

export default System;
