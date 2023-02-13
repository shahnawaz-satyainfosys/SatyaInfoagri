import React, { useState } from 'react';
import TabPage from 'components/common/TabPage';

const tabArray = ['Farmers', 'Add Farmer', 'Family', 'Bank', 'Land', 'Cattle', 'Crop', 'Fruit', 'Documents', 'Premium', 'Events', 'Mkt SMS', 'Ledger'];

const listColumnArray = [
    { accessor: 'sl', Header: 'S. No' },
    { accessor: 'cardNo', Header: 'Card No' },
    { accessor: 'farmerName', Header: 'Farmer Name' },
    { accessor: 'fatherName', Header: 'Father Name' },
    { accessor: 'village', Header: 'Village' },
    { accessor: 'districtCode', Header: 'District Code' },
    { accessor: 'figCode', Header: 'FIG Code' },
    { accessor: 'mobile', Header: 'Mobile' },
    { accessor: 'user', Header: 'User' },
    { accessor: 'approvalStatus', Header: 'Approval Status' }
];

export const Farmers = () => {

    const [listData, setListData] = useState([]);

    return (
        <>
            <TabPage
                listData={listData}
                listColumnArray={listColumnArray}
                tabArray={tabArray}
                module="Farmers"
            />
        </>
    )
}

export default Farmers
