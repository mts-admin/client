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
  display: flex;
  width: 85%;
  max-width: 1300px;
  min-height: 85vh;
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.backgrounds.backgroundTransparent};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
`;
