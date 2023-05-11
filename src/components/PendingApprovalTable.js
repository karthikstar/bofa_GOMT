import { Button, Table } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function PendingApprovalTable({user}) {
    const pendingArray = {
        "id":1,
        "client_id":1,
        "grossamount_difference": 200,
        "commission_difference" : 300,
    }

    return (
        <Table
        aria-label="Example table with static content"
        css={{
            height: "auto",
            minWidth: "100%",
        }}
        >
        <Table.Header>
            <Table.Column>Version ID</Table.Column>
            <Table.Column>Requestor ID</Table.Column>
            <Table.Column>ClientID</Table.Column>
            <Table.Column>Gross Amount Difference</Table.Column>
            <Table.Column>Commission Difference</Table.Column>
            <Table.Column>Approval Status</Table.Column>
        </Table.Header>
        <Table.Body>
            {/* {pendingArray.map((entry, idx) => {
                <Table.Row key={idx}>
                    <Table.Cell>{entry.id}</Table.Cell>
                    <Table.Cell>{entry.id}</Table.Cell>
                    <Table.Cell>{entry.client_id}</Table.Cell>
                    <Table.Cell>{entry.grossamount_difference}</Table.Cell>
                    <Table.Cell>{entry.commission_difference}</Table.Cell>
                    <Table.Cell>
                        <Button onclick={async ()=> {
                            const data = {clientID: entry.clientID, configID: configID, approverID: approverID }
                           
                            const JSONdata = JSON.stringify(data);
                           
                            const response = await fetch('/api/approve', {
                                method: 'POST',
                                body: JSONdata,
                              })
                        
                              const payload = await response.json()
                              if (response.ok) {
                                // Handle successful form submission
                                console.log(payload.data)
                                alert("APPROVED")
                                //setPendingArray([...pendingArray.splice(idx,1)])
                              }

                              }}> Approve</Button>
                    </Table.Cell>          
                </Table.Row>
            })} */}

        </Table.Body>
        </Table>
    );
}