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
  margin: 20px 0 40px 0;
`;

export const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Text = styled.p`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 8px;
`;

export const TextBold = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.colors.grey};
  margin-left: 4px;
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
