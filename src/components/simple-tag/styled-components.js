import styled, { css } from 'styled-components';

import { hexToRgba } from '../../utils/general';

export const Tag = styled.div`
  padding: 2px 8px;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.small};

  ${({ type, color }) =>
    type === 'outlined'
      ? css`
          background-color: transparent;
          border: 1px solid ${color};
          color: ${color};
        `
      : css`
          background-color: ${hexToRgba(color, 0.25)};
          color: ${color};
        `}
`;
