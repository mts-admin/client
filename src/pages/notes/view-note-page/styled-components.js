import styled from 'styled-components';

import { BackButton } from '../../../components/buttons';

export const Content = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .quill {
    margin-bottom: 50px;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: 600;
  margin-right: 24px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    margin-right: 0;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: column-reverse;
  }
`;

export const Buttons = styled.div`
  align-self: flex-start;
  flex-shrink: 0;

  button {
    border-radius: ${({ theme }) => theme.borderRadius.small};

    &:first-child {
      margin-right: 8px;
      color: ${({ theme }) => theme.colors.blue};
    }

    &:last-child {
      color: ${({ theme }) => theme.colors.error};
    }
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    flex-direction: row;
    align-self: flex-end;
    margin-bottom: 16px;

    button:first-child {
      margin-right: 8px;
      margin-bottom: 0px;
    }
  }
`;

export const TagsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: auto;
`;

export const TagItem = styled.span`
  font-size: ${({ theme }) => theme.fontSize.normal};
  margin: 6px 6px 0 0;
`;

export const ButtonBack = styled(BackButton)`
  align-self: flex-start;
  margin-bottom: 4px;

  ${({ theme }) => theme.breakpoints.down('lg')} {
    margin-bottom: -32px;
  }
`;
