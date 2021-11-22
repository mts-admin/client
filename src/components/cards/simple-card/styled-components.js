import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Content = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-height: 150px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  min-width: 0;

  ${({ hasanimation }) =>
    hasanimation === 'true' &&
    css`
      z-index: 0;

      &::before {
        content: '';
        background-image: linear-gradient(
          124deg,
          #ff5f6d,
          #ffc371,
          #2f8af7,
          #eb971e,
          #16d287,
          #f23f41,
          #594ef5,
          #1081f2,
          #1081f2
        );
        position: absolute;
        top: -2px;
        left: -2px;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        z-index: -1;
        background-size: 400%;
        filter: blur(5px);
        animation: growing 20s linear infinite;
        border-radius: ${({ theme }) => theme.borderRadius.medium};
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: ${({ theme }) => theme.borderRadius.medium};
      }
    `}
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

export const Title = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
