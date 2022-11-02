import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const TabPage = ({ tabList }) => {
  return (
    <>
      <Tabs variant='pills' defaultActiveKey="profile" id="uncontrolled-tab-example" className='mb-3'>
        {Object.values(tabList).map(tab => {
          return (
            <Tab eventKey={tab} title={tab} className='border p-3'>
              <p>
                Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone.
              </p>
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

export default TabPage;