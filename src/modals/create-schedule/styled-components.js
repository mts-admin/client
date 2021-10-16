import styled from 'styled-components';

import { TextButton } from '../../components/buttons';

export const Content = styled.section``;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const Form = styled.form``;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CancelButton = styled(TextButton)`
  margin-right: 16px;
`;
