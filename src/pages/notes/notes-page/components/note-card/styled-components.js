import styled from 'styled-components';

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 8px;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TagItem = styled.span`
  font-size: ${({ theme }) => theme.fontSize.smallest};
  margin: 4px 4px 0 0;
`;

export const Footer = styled.footer`
  margin-top: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

export const CreatedAt = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};
`;

export const StartButtonWrapper = styled.div`
  .MuiRating-root {
    display: block;
  }
`;
