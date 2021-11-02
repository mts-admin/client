import styled from 'styled-components';

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    padding: 36px 0;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 0;
  }
`;

export const Container = styled.main`
  display: flex;
  width: 85%;
  max-width: 1300px;
  min-height: 90vh;
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.backgrounds.backgroundTransparent};

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
    min-height: 100vh;
    border-radius: ${({ theme }) => theme.borderRadius.none};
    padding-top: 48px;
  }
`;
