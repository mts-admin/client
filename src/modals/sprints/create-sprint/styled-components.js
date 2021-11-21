import styled from 'styled-components';

import ContentSection from '../../../components/content-section/content-section';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const FormSection = styled(ContentSection)`
  margin-bottom: 16px;

  h3 {
    margin-bottom: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: column;
    justify-content: stretch;
  }
`;

export const Row = styled.div`
  width: 48%;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;

  button:not(:last-child) {
    margin-right: 8px;
  }
`;
