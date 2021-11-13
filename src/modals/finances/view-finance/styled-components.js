import styled, { css } from 'styled-components';
import Alert from '@mui/lab/Alert';

export const Content = styled.section``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 600;
`;

export const Section = styled.section`
  padding: 16px 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
  }

  &:last-of-type {
    padding-bottom: 0;
  }
`;

export const Item = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }

  ${({ color }) =>
    color &&
    css`
      color: ${color};

      .MuiSvgIcon-root {
        color: ${color};
      }
    `}
`;

export const ItemLabel = styled.span`
  font-weight: 500;
  margin-right: 4px;

  ${({ type }) =>
    type === 'icon' &&
    css`
      color: ${({ theme }) => theme.colors.grey};

      .MuiSvgIcon-root {
        vertical-align: sub;
        font-size: ${({ theme }) => theme.fontSize.h3};
      }
    `}
`;

export const ItemsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > *:not(:last-of-type) {
    margin-bottom: 0;

    &:first-child {
      margin-right: 32px;
    }
  }
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
