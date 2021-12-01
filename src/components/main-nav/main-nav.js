import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tabs from '@mui/material/Tabs';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';

import { Drawer, Tab, Nav, MenuButton } from './styled-components';
import { handleLogout } from '../../store/auth/thunk';
import {
  selectAuthUserRole,
  selectAuthUserNewBonusesCount,
  selectAuthUserNewActivitiesCount,
} from '../../store/auth/selectors';
import { getMainNavItems } from '../../constants/navigation';

const MainNav = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const role = useSelector(selectAuthUserRole);
  const newBonusesCount = useSelector(selectAuthUserNewBonusesCount);
  const newActivitiesCount = useSelector(selectAuthUserNewActivitiesCount);

  const logout = () => dispatch(handleLogout());

  const mainNavItems = getMainNavItems(
    logout,
    newBonusesCount,
    newActivitiesCount,
  ).filter(({ allowedRoles }) => {
    if (!allowedRoles) return true;
    return allowedRoles.includes(role);
  });

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
          <Badge variant="dot" color="info" invisible={!hasNotification}>
            <MenuIcon />
          </Badge>
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
          {mainNavItems.map(
            ({ label, icon: Icon, link, hasBadge, onClick }) => (
              <Tab
                key={link || label}
                onClick={() => {
                  isMdDown && toggleDrawer();
                  onClick && onClick();
                }}
                icon={<Icon />}
                label={
                  <Badge variant="dot" color="info" invisible={!hasBadge}>
                    {label}
                  </Badge>
                }
                {...(link && { component: Link, to: link })}
              />
            ),
          )}
        </Tabs>
      </Drawer>
    </Nav>
  );
};

export default React.memo(MainNav);
