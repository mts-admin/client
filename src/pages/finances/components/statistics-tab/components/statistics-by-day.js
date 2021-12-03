import React, { useEffect, useMemo } from 'react';
import { array } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import * as R from 'ramda';

import { handleFinancesStatisticsGet } from '../../../../../store/finances/thunk';
import {
  selectFinancesLoading,
  selectFinancesStatistics,
} from '../../../../../store/finances/selectors';
import { clearFinances } from '../../../../../store/finances/actions';
import useCancelToken from '../../../../../hooks/use-cancel-token';
import { getComponentState } from '../../../../../utils/general';
import { FINANCE_STATISTICS_TYPE } from '../../../../../constants/finances';
import { COMPONENT_STATE } from '../../../../../constants/general';
import { COLORS } from '../../../../../styles/theme';

const StatisticsByDay = ({ dateRange }) => {
  const dispatch = useDispatch();

  const [generateCancelToken, cancelRequest] = useCancelToken();

  const [start, end] = dateRange;
  const params = useMemo(
    () => ({
      ...(start && { start: start.toString() }),
      ...(end && { end: end.toString() }),
    }),
    [start, end],
  );

  useEffect(() => {
    cancelRequest();

    dispatch(
      handleFinancesStatisticsGet({
        params,
        cancelToken: generateCancelToken(),
        type: FINANCE_STATISTICS_TYPE.BY_DAY,
      }),
    );

    return () => cancelRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => dispatch(clearFinances()), [dispatch]);

  const statistics = useSelector(selectFinancesStatistics);
  const loading = useSelector(selectFinancesLoading);

  const data = useMemo(
    () =>
      R.is(Array, statistics)
        ? statistics.sort((a, b) => (a.date > b.date ? 1 : -1))
        : [],
    [statistics],
  );

  const componentState = useMemo(
    () => getComponentState(loading, null, data.length === 0),
    [loading, data],
  );

  return R.cond([
    [R.equals(COMPONENT_STATE.LOADING), () => <CircularProgress />],
    [
      R.equals(COMPONENT_STATE.EMPTY),
      () => (
        <Alert severity="info">There are no statistics for this period</Alert>
      ),
    ],
    [
      R.equals(COMPONENT_STATE.SUCCESS),
      () => (
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 30,
              right: 50,
              left: 0,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke={COLORS.SUCCESS}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="outcome"
              stroke={COLORS.ERROR}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
    ],
  ])(componentState);
};

StatisticsByDay.propTypes = {
  dateRange: array.isRequired,
};

export default React.memo(StatisticsByDay);
