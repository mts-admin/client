import styled, { css } from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;

  ${({ hasmargin }) =>
    hasmargin === 'true' &&
    css`
      & > * {
        margin-right: -8px;
      }
    `}
`;

export const Image = styled.img`
  display: block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.silver};
  overflow: hidden;
  cursor: pointer;
`;

export const RestCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.silver};
  font-size: 10px;
`;
