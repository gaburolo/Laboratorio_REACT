import React from "react";

const SpacesInformation = (props) => {
    return (
        <table>
        <thead id='table-name'>
            <tr>
                <td>ID</td>
                <td>STATE</td>
                <td>DETAIL</td>
                <td>LICENSE PLATE</td>
                <td>CHECK IN TIME</td>
                <td>RESERVED</td>
            </tr>
        </thead>
        <tbody>
    
            {
                props.spaces.length > 0 ?
                props.spaces.filter((space) => {
                    return space.reservado === props.reserved
                }).map((space) => (
                <tr key={space.id}>
                    <td>{space.id}</td>
                    <td>{space.state}</td>
                    <td>{space.detalle}</td>
                    <td>{space.placa}</td>
                    <td>{space.horaIngreso}</td>
                    <td>{space.reservado.toString()}</td> 
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