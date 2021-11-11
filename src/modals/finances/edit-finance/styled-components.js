import styled from 'styled-components';
import Alert from '@mui/material/Alert';

import ContentSection from '../../../components/content-section/content-section';

export const Content = styled.section``;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: column-reverse;
    justify-content: stretch;
  }
`;

export const Row = styled.div`
  width: 48%;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const FormSection = styled(ContentSection)`
  margin-bottom: 16px;

  h3 {
    margin-bottom: 16px;
  }
`;

export const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .MuiTextField-root:first-child {
    margin-right: 16px;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    justify-content: stretch;
  }
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
