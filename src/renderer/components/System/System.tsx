import './System.scss';

function System({ show }: { show: boolean }) {
  return <div style={{ display: `${show ? 'block' : 'none'}` }}>System</div>;
}

export default System;
