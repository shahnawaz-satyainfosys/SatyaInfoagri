import React from 'react';
import {Col , Row, Table, Form } from 'react-bootstrap';

export const FarmersEventDetails = () => {
  return (
    <>
    <Form>
    <Row>
    <div style={{ display: 'flex', justifyContent: 'end' }}>
    </div>

    <Table striped responsive id="FarmersEventListTable" className="no-pb">
     
   
     <thead>
      
        <tr>
          <th>S.No</th>
          <th>Event Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Venue</th>
      
          <th>S.No</th>
          <th>Event Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Venue</th>  
        </tr>

        
         
      </thead>
      
    
   
        
    </Table>
    </Row>
    </Form>
  </>
  )
}

export default FarmersEventDetails