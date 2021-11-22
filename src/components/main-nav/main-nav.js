import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tabs from '@mui/material/Tabs';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';

import { Drawer, Tab, Nav, MenuButton } from './styled-components';
import { selectAuthUser } from '../../store/auth/selectors';
import { getMainNavItems } from '../../constants/navigation';

const MainNav = () => {
  const location = useLocation();

  const { newBonusesCount, newActivitiesCount } = useSelector(selectAuthUser);

  const mainNavItems = getMainNavItems(newBonusesCount, newActivitiesCount);

  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(() =>
    mainNavItems.findIndex(({ link }) => location.pathname.includes(link)),
  );

  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = () => setOpen((prevState) => !prevState);
  const handleTabsChange = (_, newValue) => setTabValue(newValue);

  const hasNotification = mainNavItems.some(({ hasBadge }) => hasBadge);

  return (
    <Nav>
      {isMdDown && (
        <MenuButton onClick={toggleDrawer}>
          {hasNotification ? (
            <Badge variant="dot" color="info">
              <MenuIcon />
            </Badge>
          ) : (
            <MenuIcon />
          )}
        </MenuButton>
      )}

      <Drawer
        open={open}
        onClose={toggleDrawer}
        variant={isMdDown ? 'temporary' : 'permanent'}
        anchor="left"
      >
        <Tabs
          value={tabValue}
          onChange={handleTabsChange}
          orientation="vertical"
          aria-label="main navigation"
        >
          {mainNavItems.map(({ label, icon: Icon, link, hasBadge }) => (
            <Tab
              key={link}
              onClick={toggleDrawer}
              icon={<Icon />}
              label={
                hasBadge ? (
                  <Badge variant="dot" color="info">
                    {label}
                  </Badge>
                ) : (
                  label
                )
              }
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
