import React from 'react';
import { bool, func, node } from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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

export default SimpleModal;
