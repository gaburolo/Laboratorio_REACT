import React from "react";

const SpacesInformation = (props) => {
    return (
        <table>
        <thead id='table-name'>
            <tr>
                <td>ID</td>
                <td>STATE</td>
                <td>DETAIL</td>
                <td>VEHICLE</td>
                <td>LICENSE PLATE</td>
                <td>CHECK IN TIME</td>
                <td>RESERVED</td>
                <td>ACTION</td>
            </tr>
        </thead>
        <tbody>
            {
                props.spaces.length > 0 ?
                props.spaces.filter((space) => {
                    return space.reservado === props.reserved
                }).map(space => (
                <tr key={space.id}>
                    <td>{space.id}</td>
                    <td>{space.state}</td>
                    <td>{space.detalle}</td>
                    <td>{space.vehiculo.toString()}</td>
                    <td>{space.placa}</td>
                    <td>{space.horaIngreso}</td>
                    <td>{space.reservado.toString()}</td>
                    {props.reserved === false ?
                        (<td>
                            <button 
                                className='button muted-button'
                                onClick={() => {props.setReserved(space, true)}}
                                >Reserve
                            </button>
                        </td>) :
                        (<td>
                            <button 
                                className='button muted-button'
                                onClick={() => {props.setReserved(space, false)}}
                                >Break Free
                            </button>
                        </td>)
                    } 
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