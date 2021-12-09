import styled from 'styled-components';
import Alert from '@mui/lab/Alert';
import ShowMoreText from 'react-show-more-text';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const Image = styled.img`
  display: block;
  width: auto;
  height: 250px;
  max-width: 100%;
  margin: 0 auto;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

export const Description = styled(ShowMoreText)`
  line-height: 1.5;
  margin-bottom: 24px;

  a {
    display: block;
  }
`;

export const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Text = styled.p`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 8px;
`;

export const TextBold = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.normal};
  color: ${({ theme }) => theme.colors.grey};
  margin-left: 4px;
`;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
