import React, { useState } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        {options.map(({ label, onClick }) => (
          <MenuItem
            key={label}
            onClick={() => {
              onClick();
              handleClose();
            }}
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
    }),
  ),
};

export default DotsMenu;
