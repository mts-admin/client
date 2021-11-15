import styled from 'styled-components';

export const Content = styled.section`
  flex-grow: 1;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form``;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 8px;
  }
`;
