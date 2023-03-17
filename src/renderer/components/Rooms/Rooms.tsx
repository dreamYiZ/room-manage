import './Rooms.scss';

function Rooms({ show }: { show: boolean }) {
  return (
    <div
      style={{ display: `${show ? 'block' : 'none'}` }}
      className="rooms debug-border"
    >
      ffff
    </div>
  );
}

export default Rooms;
