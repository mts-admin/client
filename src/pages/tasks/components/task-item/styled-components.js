import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  align-items: center;

  .MuiFormControl-root {
    margin-bottom: 0;
  }
`;

export const TextWrapper = styled.div`
  flex-grow: 1;
`;

export const Text = styled.p`
  margin-right: 16px;
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
  word-break: break-all;
`;

export const Buttons = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;
