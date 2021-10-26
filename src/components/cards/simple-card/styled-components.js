import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Content = styled.article`
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-height: 150px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  min-width: 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  .MuiIconButton-root {
    margin-right: -8px;
  }
`;

export const TitleLink = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  margin-right: 4px;
  color: inherit;
`;
