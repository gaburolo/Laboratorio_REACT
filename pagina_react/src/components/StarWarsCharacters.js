import React from "react";

export class StarWarsCharacters extends React.Component {
    render() {
        if (!this.props.characters) {
            return <>hola2</>;
        }
        
        return (<table>
            <tr>
                <td>ID</td>
                <td>STATE</td>
                <td>DETAIL</td>
                <td>VEHICLE</td>
                <td>LICENSE PLATE</td>
                <td>CHECK IN TIME</td>
                <td>RESERVED</td>
            </tr>
            {this.props.characters.map(e =>
                
                <tr>
                    <td>{e.id}</td>
                    <td>{e.state}</td>
                    <td>{e.detalle}</td>
                    
                    <td>{e.vehiculo.toString()}</td>
                    <td>{e.placa}</td>
                    <td>{e.horaIngreso}</td>
                    <td>{e.reservado.toString()}</td>
                </tr>)
            }
        </table>);
    }
}