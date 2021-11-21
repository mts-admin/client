import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';

export const TagsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Progress = styled(LinearProgress)`
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

export const ProgressWrapper = styled.div`
  margin-bottom: 12px;
`;

export const ProgressText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  margin-bottom: 8px;
`;

export const ProgressLabel = styled.span`
  margin-right: 6px;
`;

export const ProgressValue = styled.span``;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;
