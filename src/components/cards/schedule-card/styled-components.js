import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Content = styled.article`
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-height: 150px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  min-width: 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const TitleLink = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  margin-right: 5px;
  color: inherit;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: grey;
  margin-bottom: 16px;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const CreatedAt = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: grey;
`;
