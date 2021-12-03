import React, { useState } from 'react';
import * as R from 'ramda';

import { Tabs, Content } from './styled-components';
import StatementsTab from './components/statements-tab';
import StatisticsTab from './components/statistics-tab';
import { FINANCE_TAB } from '../../constants/finances';

const FinancesPage = () => {
  const [activeTab, setActiveTab] = useState(FINANCE_TAB.STATEMENTS.value);

  const handleTabChange = (_, value) => setActiveTab(value);

  return (
    <Content>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        options={Object.values(FINANCE_TAB)}
      />

      {R.cond([
        [R.equals(FINANCE_TAB.STATEMENTS.value), () => <StatementsTab />],
        [R.equals(FINANCE_TAB.STATISTICS.value), () => <StatisticsTab />],
      ])(activeTab)}
    </Content>
  );
};

export default FinancesPage;
