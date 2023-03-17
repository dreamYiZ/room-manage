import './SystemMenu.scss';
import Button from '@mui/material/Button';

function SystemMenu({
  menu,
  onClick,
}: {
  menu: { text: string };
  onClick: () => void;
}) {
  return (
    <Button
      variant="outlined"
      color="warning"
      className="prevent-select system-menu"
      onClick={onClick}
    >
      {menu.text}
    </Button>
  );
}

export default SystemMenu;
