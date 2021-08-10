import React from "react";

export class StartInformation extends React.Component {
    render() {
        if (!this.props.characters) {
            return <>hola2</>;
        }
        
        return (<table>
            <tr>
                <td>Name</td>
                <td>Height</td>
                <td>Mass</td>
                <td>Hair_color</td>
                <td>Skin_color</td>
                <td>Eye_color</td>
                <td>Birth_year</td>
            </tr>

            {this.props.characters.map(d =>
                <tr>
                    <td>{d.name}</td>
                    <td>{d.height}</td>
                    <td>{d.mass}</td>

                    <td>{d.hair_color}</td>
                    <td>{d.skin_color}</td>
                    <td>{d.eye_color}</td>
                    <td>{d.birth_year}</td>
                </tr>
            )}

        </table>);
    }
}