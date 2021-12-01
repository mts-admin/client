import styled from 'styled-components';
import Alert from '@mui/lab/Alert';

export const Content = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h2};
  font-weight: 600;
  margin-bottom: 16px;
`;

export const Section = styled.div`
  padding: 16px 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:last-of-type {
    padding-bottom: 0;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

export const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 50%;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`;

export const Text = styled.div`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    text-align: center;
  }
`;

export const Name = styled.p`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.h2};
  word-break: break-all;
`;

export const Email = styled.p`
  display: flex;
  align-items: center;
  word-break: break-all;

  .MuiSvgIcon-root {
    margin-right: 6px;
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const Item = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

export const ItemLabel = styled.p`
  font-weight: 600;
  margin-right: 6px;
`;

export const ItemValue = styled.p``;

export const ErrorMessage = styled(Alert)`
  width: 90%;
  margin: 0 auto;
`;
