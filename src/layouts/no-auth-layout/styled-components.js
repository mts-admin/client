import styled from 'styled-components';

export const Layout = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const Content = styled.main`
  width: 555px;
  padding: 32px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.main.backgroundTransparent};
`;
