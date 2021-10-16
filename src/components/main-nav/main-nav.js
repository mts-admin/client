import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tabs from '@material-ui/core/Tabs';
import MenuIcon from '@material-ui/icons/Menu';

import { Drawer, Tab, Nav, MenuButton } from './styled-components';
import { mainNavItems } from '../../constants/navigation';

const MainNav = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(() =>
    mainNavItems.findIndex(({ link }) => location.pathname.includes(link)),
  );

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => setOpen((prevState) => !prevState);
  const handleTabsChange = (_, newValue) => setTabValue(newValue);

  return (
    <Nav>
      {isSmDown && (
        <MenuButton onClick={toggleDrawer}>
          <MenuIcon />
        </MenuButton>
      )}

      <Drawer
        open={open}
        onClose={toggleDrawer}
        variant={isSmDown ? 'temporary' : 'permanent'}
        anchor="left"
      >
        <Tabs
          value={tabValue}
          onChange={handleTabsChange}
          orientation="vertical"
          aria-label="main navigation"
        >
          {mainNavItems.map(({ label, icon: Icon, link }) => (
            <Tab
              key={link}
              icon={<Icon />}
              label={label}
              component={Link}
              to={link}
            />
          ))}
        </Tabs>
      </Drawer>
    </Nav>
  );
};

export default React.memo(MainNav);
