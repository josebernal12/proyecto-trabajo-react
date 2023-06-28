/* eslint-disable react/prop-types */

export const TableAddress = ({ actividad }) => {
  return (
    
        <tr>
          <td>{actividad.actividadVulnerableRealizada}</td>
          <td>{actividad.entidadFederativa}</td>
          <td>{actividad.municipio}</td>
        </tr>
  );
};
