import { ReactNode } from 'react';
import './Layout.scss';

function Layout({ children, Menu }: { children: ReactNode; Menu: ReactNode }) {
  return (
    <div className="layout">
      <div className="menu">{Menu}</div>
      <div className="main-content">{children}</div>
    </div>
  );
}

export default Layout;
