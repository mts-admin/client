import styled from 'styled-components';

export const InputFileWrapper = styled.div`
  margin-right: 8px;
`;

export const InputFile = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
`;

export const InputFileLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  .MuiSvgIcon-root {
    margin-right: 2px;
    opacity: 0.5;
  }
`;

export const CropWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  .ReactCrop {
    align-self: center;

    & > div:first-child {
      width: 100%;
    }
  }

  .ReactCrop__image {
    display: block;
    min-height: 300px;
    max-height: 650px;
    margin: 0 auto;
  }
`;

export const Buttons = styled.div`
  align-self: flex-end;
  margin-top: 20px;

  button {
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  button:first-child {
    margin-right: 8px;
  }
`;
