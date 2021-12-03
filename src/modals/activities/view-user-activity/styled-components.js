import styled from 'styled-components';
import Alert from '@mui/lab/Alert';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 600;
  text-align: center;
`;

export const Section = styled.div`
  padding: 16px 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:first-of-type {
    padding-top: 12px;
  }

  &:last-of-type {
    padding-bottom: 0;
  }
`;

export const Item = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

export const ItemLabel = styled.p`
  font-weight: 600;
  margin-right: 6px;
`;

export const ItemValue = styled.p``;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
