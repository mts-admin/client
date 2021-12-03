import styled from 'styled-components';

export const CardContent = styled.article`
  display: flex;
  align-items: center;
  padding: 6px 0;
  line-height: 1.4;
`;

export const CardImageWrapper = styled.div`
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

export const CardImage = styled.img`
  width: 33px;
  height: 33px;
  object-fit: cover;
`;

export const CardTextWrapper = styled.div`
  margin-right: auto;
  padding-right: 8px;
`;

export const CardName = styled.h4`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};
`;
