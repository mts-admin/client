import React from 'react';
import * as R from 'ramda';

import useStatisticsTabContainer from './container';
import StatisticsFull from './components/statistics-full';
import StatisticsByDay from './components/statistics-by-day';
import {
  Content,
  FiltersWrapper,
  StatisticsWrapper,
} from './styled-components';
import { ControlledDateRangePicker } from '../../../../components/form-items';
import SwitchWithLabels from '../../../../components/switch-with-labels';
import { FINANCE_STATISTICS_TYPE } from '../../../../constants/finances';

const StatisticsTab = () => {
  const {
    control,
    dateRange,
    statisticsType,
    statisticsTypeChecked,
    handleDateRangeChange,
    handleStatisticsTypeChange,
  } = useStatisticsTabContainer();

  return (
    <Content>
      <FiltersWrapper>
        <ControlledDateRangePicker
          name="dateRange"
          control={control}
          defaultValue={dateRange}
          onClose={handleDateRangeChange}
          clearable={false}
          size="small"
        />

        <SwitchWithLabels
          checked={statisticsTypeChecked}
          onChange={handleStatisticsTypeChange}
          startLabel="Summary"
          endLabel="By day"
        />
      </FiltersWrapper>

      <StatisticsWrapper>
        {R.cond([
          [
            R.equals(FINANCE_STATISTICS_TYPE.FULL),
            () => <StatisticsFull dateRange={dateRange} />,
          ],
          [
            R.equals(FINANCE_STATISTICS_TYPE.BY_DAY),
            () => <StatisticsByDay dateRange={dateRange} />,
          ],
        ])(statisticsType)}
      </StatisticsWrapper>
    </Content>
  );
};

export default StatisticsTab;
