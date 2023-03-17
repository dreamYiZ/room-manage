import './Menu.scss';
import React from 'react';

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
          订房
        </div>
        <div
          role="presentation"
          className={`prevent-select menu-item ${
            menuActive === 1 ? 'active-menu-item' : ''
          }`}
          onClick={() => setMenuActive(1)}
          onKeyDown={() => setMenuActive(1)}
        >
          退房
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
          系统
        </div>
      </div>
    </div>
  );
}

export default Menu;
