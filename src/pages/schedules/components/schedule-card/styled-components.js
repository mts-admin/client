import styled from 'styled-components';

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};
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
  color: ${({ theme }) => theme.colors.grey};
`;
