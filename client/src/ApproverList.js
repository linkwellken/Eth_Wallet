import React from 'react';

function Approvals({ approver, approvers, ApproverList }) {

    return (
        <div>
                <h2>Approvers</h2>
                    <table>
                        <thead>
                            <tr>
                                <th >Id</th>                                
                                <th >Approver 2</th>                                
                            </tr>
                        </thead>
                        <tbody>                       
                             {approver.map(approve => (
                                <tr key={approve.id}>
                                    <td>  {approve.id}</td>                                    
                                    <td>{approve.approver}</td>
                                </tr>                                 
                            ))}
                        </tbody>
                </table>
        </div>
    )
}

export default Approvals