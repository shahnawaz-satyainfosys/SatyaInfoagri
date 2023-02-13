import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';

export const FamilyMemberList = () => {

    useEffect(() => {
        const count = $('#FamilyMembersListCard tr').length;
        if (count > 1) {
            $("#FamilyMembersListCard").show();
        }
    }, []);

    const showAddFamilyMemberForm = () => {
        $('#FamilyMembersForm').show();
        $('#FamilyMembersListCard').hide();
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button id='btnAddFamilyMember' onClick={() => showAddFamilyMemberForm()} className="mb-2">
                    Add Family Member
                </Button>
            </div>

            <Table striped responsive id="FamilyMembersListTable" className='no-pb'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Relation</th>
                        <th>Education</th>
                        <th>Active Status</th>
                        <th>Action</th>
                    </tr>
                </thead>                
            </Table>
        </>
    )
}

export default FamilyMemberList;