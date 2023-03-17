import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Rooms from '../components/Rooms/Rooms';
import Menu from '../components/Menu/Menu';

function Home() {
  const [menuActive, setMenuActive] = useState(0);

  return (
    <div className="Home">
      <Layout
        Menu={<Menu menuActive={menuActive} setMenuActive={setMenuActive} />}
      >
        <Rooms />
      </Layout>
    </div>
  );
}

export default Home;
