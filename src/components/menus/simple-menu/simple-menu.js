import React from 'react';
import {
  arrayOf,
  shape,
  string,
  func,
  oneOfType,
  bool,
  object,
} from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const SimpleMenu = ({ options, anchorEl, open, handleClose }) => (
  <Menu anchorEl={anchorEl} open={open} onClose={handleClose} autoFocus={false}>
    {options.map(({ label, onClick, disabled }) => (
      <MenuItem
        key={label}
        onClick={() => {
          onClick();
          handleClose();
        }}
        disabled={disabled}
      >
        {label}
      </MenuItem>
    ))}
  </Menu>
);

SimpleMenu.propTypes = {
  options: arrayOf(
    shape({
      label: string.isRequired,
      onClick: func.isRequired,
      disabled: bool,
    }),
  ),
  anchorEl: oneOfType([func, object]),
  open: bool.isRequired,
  handleClose: func.isRequired,
};

export default SimpleMenu;
