import { ACTION_TYPES } from '../../util/constant';
import type { VALUES_ACTION_TYPES } from '../../util/constant';
import AddRoom from '../AddRoom/AddRoom';
import AddTag from '../AddTag/AddTag';
import DeleteRoom from '../DeleteRoom/DeleteRoom';
import SystemSettings from '../SystemSettings/SystemSettings';

export default function SystemDrawerContent({
  activeSystemMenu,
}: {
  activeSystemMenu: VALUES_ACTION_TYPES;
}) {
  const getComponentByName = (name: VALUES_ACTION_TYPES) => {
    if (name === ACTION_TYPES.ADD_ROOM) {
      return <AddRoom />;
    }
    if (name === ACTION_TYPES.DELETE_ROOM) {
      return <DeleteRoom />;
    }

    if (name === ACTION_TYPES.ADD_TAG) {
      return <AddTag />;
    }

    if (name === ACTION_TYPES.SYSTEM_SETTINGS) {
      return <SystemSettings />;
    }

    return '...';
  };

  return <>{getComponentByName(activeSystemMenu)}</>;
}
