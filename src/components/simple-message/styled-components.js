import styled from 'styled-components';

export const Message = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 8px;
`;
