import styled from 'styled-components';
import Button from '@mui/material/Button';

export const Content = styled.section`
  position: relative;
  flex-grow: 1;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  margin-bottom: 16px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  button:last-child {
    margin-left: 8px;
    padding: 4px 20px;
  }
`;

export const DeleteButton = styled(Button)`
  margin-right: auto;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;
