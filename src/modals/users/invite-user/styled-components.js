import styled from 'styled-components';

import { TextButton } from '../../../components/buttons';

export const Content = styled.section``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 600;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 16px;
`;

export const Form = styled.form``;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const CancelButton = styled(TextButton)`
  margin-right: 16px;
`;
