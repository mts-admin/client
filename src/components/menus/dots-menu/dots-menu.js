import React, { useState } from 'react';
import { arrayOf, shape, string, func, bool } from 'prop-types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DotsMenu = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-label="more actions"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: 0 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
    </>
  );
};

DotsMenu.propTypes = {
  options: arrayOf(
    shape({
      label: string.isRequired,
      onClick: func.isRequired,
      disabled: bool,
    }),
  ),
};

export default DotsMenu;
