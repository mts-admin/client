import styled, { css } from 'styled-components';

export const Message = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.colors.error};
    `}
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 8px;
`;
