import React from 'react';
import { bool, func, string } from 'prop-types';
import Grid from '@mui/material/Grid';

import { StyledGrid, StyledSwitch } from './styled-components';

const SwitchWithLabels = ({ checked, onChange, startLabel, endLabel }) => (
  <StyledGrid component="label" alignItems="center">
    <Grid item>{startLabel}</Grid>
    <Grid item>
      <StyledSwitch checked={checked} onChange={onChange} />
    </Grid>
    <Grid item>{endLabel}</Grid>
  </StyledGrid>
);

SwitchWithLabels.propTypes = {
  checked: bool.isRequired,
  onChange: func.isRequired,
  startLabel: string.isRequired,
  endLabel: string.isRequired,
};

export default SwitchWithLabels;
