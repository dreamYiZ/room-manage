import React from 'react';
import Layout from '../components/layout/Layout';
import Rooms from '../components/Rooms/Rooms';
import Menu from '../components/Menu/Menu';

function Home() {
  return (
    <div className="Home">
      <Layout Menu={<Menu />}>
        <Rooms />
      </Layout>
    </div>
  );
}

export default Home;
