import styled from 'styled-components';

import { TextButton } from '../../components/buttons';

export const Content = styled.section``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 4px;
  font-weight: 600;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: grey;
  margin-bottom: 24px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CancelButton = styled(TextButton)`
  margin-right: 16px;
`;
