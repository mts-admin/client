import styled from 'styled-components';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: 600;
  margin-bottom: 8px;
`;

export const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeValue = styled.p`
  width: 42px;
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: 600;
  line-height: 1;
  margin-bottom: 6px;
`;

export const TimeLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.smallest};
`;

export const Divider = styled.div`
  font-size: ${({ theme }) => theme.fontSize.h2};
  align-self: flex-start;
  margin: 0 8px;
  margin-top: -5px;
`;
