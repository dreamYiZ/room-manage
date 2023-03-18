import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Rooms from '../components/Rooms/Rooms';
import System from '../components/System/System';
import Menu from '../components/Menu/Menu';

function Home() {
  const [menuActive, setMenuActive] = useState<number>(0);

  return (
    <div className="Home">
      <Layout
        Menu={<Menu menuActive={menuActive} setMenuActive={setMenuActive} />}
      >
        <Rooms menuActive={menuActive} show={menuActive < 2} />
        <System show={menuActive === 2} />
      </Layout>
    </div>
  );
}

export default Home;
