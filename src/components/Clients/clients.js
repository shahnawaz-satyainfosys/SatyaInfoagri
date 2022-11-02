import React from 'react';
import TabPage from 'components/common/TabPage';

const tabList = {
  tab1: "Customer List",
  tab2: "Customer Details",
  tab3: "Transaction Details"
};

const Client = () => {
  return (
    <>
      <TabPage tab={tabList} />
    </>
  );
};

export default Client;