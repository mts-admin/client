import styled from 'styled-components';

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 16px;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1;
  color: ${({ theme }) => theme.colors.grey};
  margin-right: 6px;
`;
