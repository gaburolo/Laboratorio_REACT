import React from "react";

export class SpacesInformation extends React.Component {
    render() {
        if (!this.props.spaces) {
            return <>hola2</>;
        };

        async function addParqueo() {
            const detalle=document.getElementById("detalle").value;
            const rawResponse = await fetch("https://localhost/api/spaces", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"detalle":detalle})
            });
            const content = await rawResponse.json();
          
            console.log(content);
          };

        return (<section>
            <table>
            <tr>
                <td>ID</td>
                <td>STATE</td>
                <td>DETAIL</td>
                <td>VEHICLE</td>
                <td>LICENSE PLATE</td>
                <td>CHECK IN TIME</td>
                <td>RESERVED</td>
            </tr>

            {this.props.spaces.map(e =>
                
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

        </table>
        <div>
            <input type='text' className='descripcion' placeholder='Ingrese aqui la descripción' id='detalle'/>
            <button type='submit' className='guardar'onClick={addParqueo}>Guardar</button>
        </div>


        </section>
        
        
        
        


        
        );
    }
}