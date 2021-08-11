import React from "react";

const SpacesInformation = (props) => {
    return (
        <table>
        <thead id='table-name'>
            <tr>
                <td>ID</td>
                <td>STATE</td>
                <td>DETAIL</td>
                {props.reserved && (<td>LICENSE PLATE</td>)}
                {props.reserved && (<td>CHECK IN TIME</td>)}
                <td>RESERVED</td>
            </tr>
        </thead>
        <tbody>
    
            {
                props.spaces.length > 0 ?
                props.spaces.filter((space) => {
                    return space.reserved === props.reserved
                }).map((space) => (
                <tr key={space.id}>
                    <td>{space.id}</td>
                    <td>{space.state}</td>
                    <td>{space.detail}</td>
                    {props.reserved && (<td>{space.licensePlate}</td>)}
                    {props.reserved && (<td>{space.checkIn}</td>)}
                    
                    <td>{space.reserved.toString()}</td> 
                </tr>    
                )) : (
                    <tr>
                        <td colSpan={3}>No information parking</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}

export default SpacesInformation;