import styled from 'styled-components';
import MuiDrawer from '@mui/material/Drawer';
import MuiTab from '@mui/material/Tab';

export const Nav = styled.nav`
  position: relative;
  width: 190px;
  padding: 10px 0;
  margin-right: 24px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius.medium};

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 0;
    margin-right: 0;
  }
`;

export const MenuButton = styled.div`
  position: absolute;
  top: -41px;
  left: -18px;
  padding: 2px 3px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius.small};

  .MuiSvgIcon-root {
    display: block;
    width: 28px;
    height: 28px;
  }
`;

export const Drawer = styled(MuiDrawer)`
  .MuiPaper-root {
    background-color: transparent;

    ${({ theme }) => theme.breakpoints.down('md')} {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }

  .MuiDrawer-paper {
    position: static;

    ${({ theme }) => theme.breakpoints.down('md')} {
      position: absolute;
    }
  }

  .MuiTabs-indicator {
    width: 3px;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .MuiTabs-root {
      min-width: 180px;
    }
  }
`;

export const Tab = styled(MuiTab)`
  min-height: auto;
  padding: 15px;
  font-size: ${({ theme }) => theme.fontSize.normal};
  flex-direction: row;
  justify-content: flex-start;

  .MuiTab-wrapper {
    flex-direction: row;
    justify-content: flex-start;
  }

  .MuiSvgIcon-root {
    margin-bottom: 0 !important;
    margin-right: 7px;
  }

  .MuiBadge-dot {
    top: -3px;
    right: -5px;
  }

  &.Mui-selected {
    color: ${({ theme }) => theme.colors.gold};
  }
`;
