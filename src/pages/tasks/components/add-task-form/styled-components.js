import styled from 'styled-components';

import { ButtonPrimary } from '../../../../components/buttons';

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ButtonAdd = styled(ButtonPrimary)`
  margin-left: 16px;
  padding: 8px 24px;
  flex-shrink: 0;
`;
