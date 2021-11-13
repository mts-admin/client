import React, { useEffect, useMemo } from 'react';
import { array } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
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
import {
  capitalizeFirstLetter,
  getComponentState,
} from '../../../../../utils/general';
import {
  FINANCE_STATISTICS_TYPE,
  FINANCE_TYPE,
} from '../../../../../constants/finances';
import { COMPONENT_STATE } from '../../../../../constants/general';
import { COLORS } from '../../../../../styles/theme';

const StatisticsFull = ({ dateRange }) => {
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
        type: FINANCE_STATISTICS_TYPE.FULL,
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
      R.is(Object, statistics)
        ? Object.entries(statistics)
            .map(([name, value]) => ({
              name: capitalizeFirstLetter(name),
              value,
              color:
                name === FINANCE_TYPE.INCOME ? COLORS.SUCCESS : COLORS.ERROR,
            }))
            .sort((a, b) => (a.name > b.name ? 1 : -1))
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
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name} - ${entry.value}`}
              outerRadius={150}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
    ],
  ])(componentState);
};

StatisticsFull.propTypes = {
  dateRange: array.isRequired,
};

export default React.memo(StatisticsFull);
