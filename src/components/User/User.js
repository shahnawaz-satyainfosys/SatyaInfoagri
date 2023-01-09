import React, { useState } from 'react'
import TabPage from 'components/common/TabPage';

const tabArray = ['User List', 'User Detail'];

const listColumnArray = [
    { accessor: 'sl', Header: 'S. No' },
    { accessor: 'loginUserName', Header: 'Username' },
    { accessor: 'loginUserEmailId', Header: 'Email Id' },
    { accessor: 'loginUserMobileNumber', Header: 'Mobile Number' },
    { accessor: 'lastLoginDate', Header: 'Last Login Date' },
    { accessor: 'status', Header: 'Active Status ' }
];

const User = () => {

    $('[data-rr-ui-event-key*="User Detail"]').click(function () {
        $("#btnNew").hide();
        $("#btnSave").show();
        $("#btnCancel").show();
    })

    const newDetails = () => {
        $('[data-rr-ui-event-key*="User Detail"]').attr('disabled', false);
        $('[data-rr-ui-event-key*="User Detail"]').trigger('click');
        $('#btnSave').attr('disabled', false);
    }

    const [listData, setListData] = useState([]);
    $('[data-rr-ui-event-key*="User List"]').click(function () {
        $("#btnNew").show();
        $("#btnSave").hide();
        $("#btnCancel").hide();
    })

    return (
        <>
            <TabPage
                listData={listData}
                tabArray={tabArray}
                listColumnArray={listColumnArray}
                module="User"
                newDetails={newDetails}
            />
        </>
    )
}

export default User