import React from 'react'
import { Table } from 'react-bootstrap'

export const FarmersLedgerDetails = () => {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'end' }}>
     
    </div>

    <Table striped responsive id="FarmersLedgerDetailsTable" className="no-pb">
      <thead>
        <tr>
          <th>Date</th>
          <th>Narration</th>
          <th>Dr.</th>
          <th>Cr.</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <label style={{ display: 'flex', justifyContent: 'center' }}>Total Amt</label>
     
      </tr>
      </tbody>
    </Table>
  </>
  )
}

export default FarmersLedgerDetails