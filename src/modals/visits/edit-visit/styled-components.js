import styled from 'styled-components';
import Alert from '@mui/lab/Alert';

import ContentSection from '../../../components/content-section/content-section';

export const Content = styled.section`
  display: flex;
  flex-direction: column;

  .MuiFormControlLabel-root {
    margin: 0;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const FormSection = styled(ContentSection)`
  margin-bottom: 16px;

  h3 {
    margin-bottom: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;

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

export const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .MuiTextField-root {
    width: 48%;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  button:not(:last-child) {
    margin-right: 8px;
  }
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
