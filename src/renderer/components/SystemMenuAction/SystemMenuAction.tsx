import * as React from 'react';
import './SystemMenuAction.scss';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import SystemMenuActiveLastBreadcrumb from '../SystemMenuActiveLastBreadcrumb/SystemMenuActiveLastBreadcrumb';
import SystemDrawerContent from '../SystemDrawerContent/SystemDrawerContent';
import type { VALUES_ACTION_TYPES } from '../../util/constant';

const drawerPosition = 'right';

function SystemMenuAction({
  activeSystemMenu,
  setActiveSystemMenu,
  activeSystemMenuText,
}: {
  activeSystemMenu: VALUES_ACTION_TYPES;
  setActiveSystemMenu: React.Dispatch<
    React.SetStateAction<VALUES_ACTION_TYPES>
  >;
  activeSystemMenuText: string;
}) {
  return (
    <div>
      <React.Fragment key={drawerPosition}>
        <Drawer
          anchor={drawerPosition}
          open={!!activeSystemMenu}
          onClose={() => setActiveSystemMenu('')}
        >
          <Box
            sx={{
              width: '80vw',
              height: '100%',
              backgroundColor: 'primary.light',
              padding: '20px',
            }}
          >
            <SystemMenuActiveLastBreadcrumb
              navItem={['系统', `${activeSystemMenuText}`]}
            />
            <Divider sx={{ marginTop: '4px' }} />
            <SystemDrawerContent activeSystemMenu={activeSystemMenu} />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default SystemMenuAction;
