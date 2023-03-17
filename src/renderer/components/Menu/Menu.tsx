import './Menu.scss';
import React from 'react';
import TocRoundedIcon from '@mui/icons-material/TocRounded';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

function Menu({
  menuActive,
  setMenuActive,
}: {
  menuActive: number;
  setMenuActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="menu gradient-border">
      <div className="top-menu">
        <div
          role="presentation"
          className={`prevent-select menu-item ${
            menuActive === 0 ? 'active-menu-item' : ''
          }`}
          onClick={() => setMenuActive(0)}
          onKeyDown={() => setMenuActive(0)}
        >
          <TocRoundedIcon fontSize="large" />
          <div className="menu-text">订房</div>
        </div>
        <div
          role="presentation"
          className={`prevent-select menu-item ${
            menuActive === 1 ? 'active-menu-item' : ''
          }`}
          onClick={() => setMenuActive(1)}
          onKeyDown={() => setMenuActive(1)}
        >
          <LowPriorityRoundedIcon fontSize="large" />
          <div className="menu-text">退房</div>
        </div>
      </div>
      <div className="bottom-menu">
        <div
          role="presentation"
          className={`prevent-select menu-item ${
            menuActive === 2 ? 'active-menu-item' : ''
          }`}
          onClick={() => setMenuActive(2)}
          onKeyDown={() => setMenuActive(2)}
        >
          <SettingsSuggestRoundedIcon fontSize="large" />
          <div className="menu-text">系统</div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
