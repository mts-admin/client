import styled from 'styled-components';
import Button from '@mui/material/Button';
import ShowMoreText from 'react-show-more-text';

import { BackButton } from '../../components/buttons';

export const Content = styled.article`
  position: relative;
  flex-grow: 1;
`;

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: 600;
  margin-bottom: 4px;
`;

export const Tags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  div {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

export const Description = styled(ShowMoreText)`
  line-height: 1.5;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSize.small};

  a {
    display: block;
  }
`;

export const Buttons = styled.div`
  button {
    margin-left: 8px;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

export const ButtonBack = styled(BackButton)`
  margin-right: auto;
`;

export const ButtonEdit = styled(Button)`
  color: ${({ theme }) => theme.colors.blue};
`;

export const ButtonDelete = styled(Button)`
  color: ${({ theme }) => theme.colors.error};
`;

export const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
  font-style: italic;
`;
