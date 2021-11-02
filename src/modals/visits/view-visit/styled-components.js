import styled from 'styled-components';
import Alert from '@mui/lab/Alert';

export const Content = styled.section`
  font-size: ${({ theme }) => theme.fontSize.normal};

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.colors.grey};
    margin-right: 6px;
    font-size: 18px;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 4px;
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
`;

export const ItemsGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .MuiSvgIcon-fontSizeInherit {
    font-size: 8px;
    margin: 0 12px;
  }
`;

export const ItemLabel = styled.span`
  font-weight: 500;
  margin-right: 4px;
`;

export const Date = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeWrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-right: 24px;
  }
`;

export const TimeValue = styled.p``;

export const Recurring = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  padding: 2px 6px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 2px;
`;

export const Status = styled.p`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${({ color }) => color};

  .MuiSvgIcon-root {
    color: inherit;
  }
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
