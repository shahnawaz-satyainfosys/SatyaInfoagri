import React from 'react';
 import { Tabs, Tab } from 'react-bootstrap';

const TabPage = () => {
  return (
    <>
       <Tabs variant='pills' defaultActiveKey="profile" id="uncontrolled-tab-example" className='mb-3'>
        <Tab eventKey="home" title="Home" className='border p-3'>
          <p>
            Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone.
          </p>
        </Tab>
        <Tab eventKey="profile" title="Profile" className='border p-3'>
          <p>
            Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic.
          </p>
        </Tab>
        <Tab eventKey="contact" title="Contact" className='border p-3' disabled>
          <p>
            Accuse me thus: that I have scanted all, Wherein I should your great deserts repay, Forgot
            upon your dearest love to call, Whereto all bonds do tie me day by day; That I have frequent
            been with unknown minds, And given to time your own dear-purchas'd right;
          </p>
        </Tab>
      </Tabs>
    </>
  );
};

export default TabPage;