import styled from 'styled-components';
import MuiModal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

export const Modal = styled(MuiModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0;
  z-index: 1;
`;

export const ModalContent = styled.div`
  position: relative;
  width: 50vw;
  min-width: 300px;
  max-width: 800px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows[5]};

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 75vw;
    padding: 20px;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 85vw;
  }
`;
