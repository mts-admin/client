import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DateTime } from 'luxon';

import { FINANCE_STATISTICS_TYPE } from '../../../../constants/finances';

const getStatisticsType = (value) =>
  value ? FINANCE_STATISTICS_TYPE.BY_DAY : FINANCE_STATISTICS_TYPE.FULL;

const useStatisticsTabContainer = () => {
  const [{ statisticsTypeChecked, dateRange }, setFilters] = useState(() => ({
    statisticsTypeChecked: true,
    dateRange: [DateTime.now().startOf('month'), DateTime.now().endOf('month')],
  }));

  const { handleSubmit, control } = useForm();

  const handleDateRangeChange = handleSubmit((values) => {
    setFilters((prevState) => ({ ...prevState, dateRange: values.dateRange }));
  });
  const handleStatisticsTypeChange = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      statisticsTypeChecked: event.target.checked,
    }));
  };

  const statisticsType = getStatisticsType(statisticsTypeChecked);

  return {
    control,
    dateRange,
    statisticsType,
    statisticsTypeChecked,
    handleDateRangeChange,
    handleStatisticsTypeChange,
  };
};

export default useStatisticsTabContainer;
