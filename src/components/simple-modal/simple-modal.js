import React from 'react';
import { bool, func, node } from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { Modal, CloseButton, ModalContent } from './styled-components';

const SimpleModal = ({ open, onClose, children }) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 300,
    }}
  >
    <Fade in={open}>
      <ModalContent>
        <CloseButton aria-label="close modal" onClick={onClose}>
          <HighlightOffIcon />
        </CloseButton>
        {children}
      </ModalContent>
    </Fade>
  </Modal>
);

SimpleModal.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  children: node.isRequired,
};

export default React.memo(SimpleModal);
