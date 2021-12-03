import styled from 'styled-components';

import { TextButton } from '../../../components/buttons';

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
  margin-top: 16px;
`;

export const CancelButton = styled(TextButton)`
  margin-right: 16px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  display: block;
  width: 175px;
  height: 175px;
  margin-bottom: 12px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ImageButtonsWrapper = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: center;
  }
`;

export const ButtonDelete = styled(TextButton)`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  padding: 2px 4px;
  line-height: 1;

  .MuiSvgIcon-root {
    font-size: ${({ theme }) => theme.fontSize.h3};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 8px;
  }
`;
