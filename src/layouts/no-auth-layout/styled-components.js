import styled from 'styled-components';

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
`;

export const Content = styled.main`
  width: 555px;
  padding: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.backgrounds.backgroundTransparent};

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: flex;
    flex-direction: column;
    width: 100vw;
    flex-grow: 1;
    border-radius: ${({ theme }) => theme.borderRadius.none};
  }
`;
