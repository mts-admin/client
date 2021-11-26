import styled from 'styled-components';

import { TextButton } from '../../../../components/buttons';

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  display: block;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 8px;
`;

export const ImageButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
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
    margin-top: 4px;
  }
`;
