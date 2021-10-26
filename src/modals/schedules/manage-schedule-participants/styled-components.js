import styled from 'styled-components';

import { ControlledInput } from '../../../components/form-items';
import { ButtonPrimary } from '../../../components/buttons';

// main
export const Content = styled.section`
  position: relative;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: ${({ theme }) => theme.fontSize.smallest};
  }
`;

// invite form
export const InviteFormContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const InviteFormControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const InputEmail = styled(ControlledInput)`
  margin-bottom: 12px;
`;

export const InviteButton = styled(ButtonPrimary)`
  padding: 6px 12px;
  line-height: 1.5;
  align-self: center;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    align-self: flex-end;
    margin: 4px 0;
  }
`;

// participant item
export const ParticipantItemContent = styled.div``;

export const ParticipantItemCheckboxes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0;
  }
`;

export const ParticipantItemButtons = styled.div`
  ${({ theme }) => theme.breakpoints.down('md')} {
    align-self: flex-end;
  }

  button {
    border-radius: ${({ theme }) => theme.borderRadius.small};
    padding: 2px 8px;
    font-size: ${({ theme }) => theme.fontSize.smallest};
    margin: 0 4px;
    line-height: 1.5;
  }
`;
