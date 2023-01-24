import TabPage from 'components/common/TabPage';
import React, { useState, useEffect } from 'react';

const tabArray = ['Product List', 'Product Detail'];

const listColumnArray = [
    { accessor: 'sl', Header: 'Product Id' },
    { accessor: 'roleName', Header: 'Product Name' },
    { accessor: 'status', Header: 'Active Status' }
];

export const Product = () => {

    const [listData, setListData] = useState([]);

    useEffect(() => {        
        $('[data-rr-ui-event-key*="Product Detail"]').attr('disabled', true);
    }, []);

    $(document).on('click', '[data-rr-ui-event-key*="Product List"]', function () {
        $("#btnNew").show();
        $("#btnSave").hide();
        $("#btnCancel").hide();
        $('[data-rr-ui-event-key*="Product Detail"]').attr('disabled', true);
    });

    $(document).on('click', '[data-rr-ui-event-key*="Product Detail"]', function () {
        $("#btnNew").hide();
        $("#btnSave").show();
        $("#btnCancel").show();
        $('[data-rr-ui-event-key*="Product Detail"]').attr('disabled', false);
    });

    const newDetails = () => {
        $('[data-rr-ui-event-key*="Product Detail"]').attr('disabled', false);
        $('[data-rr-ui-event-key*="Product Detail"]').trigger('click');
        $('#btnSave').attr('disabled', false);
    };

    const cancelClick = () => {
        $('[data-rr-ui-event-key*="Product List"]').trigger('click');
    }

    const exitModule = () => {
        window.location.href = '/dashboard';
    }

    return (
        <>
            <TabPage
                listData={listData}
                listColumnArray={listColumnArray}
                tabArray={tabArray}
                module='Product'
                newDetails={newDetails}
                cancelClick={cancelClick}
                exitModule={exitModule}
            />
        </>
    )
}
export default Product;