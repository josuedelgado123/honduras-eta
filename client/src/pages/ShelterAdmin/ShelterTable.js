import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { makeid } from "../../utils/Functions";

const ShelterTable = ({ shelters }) => {
  return (
    <Fragment>
      <div className="table-info text-center w-100">
        Desplaza a la derecha para ver más información de la tabla ->
      </div>
      <table className="table table-hover table-responsive-sm">
        <thead className="">
          <tr>
            <th scope="col">Departamento</th>
            <th>Ubicación</th>
            <th>Nombre</th>
            <th>Tipo (Albergue o casa de acoplo)</th>
            <th style={{ width: "10%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {shelters.map((shelter, i) => {
            const {
              department,
              city,
              name,
              shelter_id: id,
              shelter_type: shelterType
            } = shelter;
            return (
              <tr key={makeid(4)}>
                <td className="align-middle">{department}</td>
                <td className="align-middle">{city}</td>
                <td className="align-middle">{name}</td>
                <td className="align-middle">
                  {shelterType === "CA"
                    ? "GRUPO DE APOYO / CASA DE ACOPIO"
                    : "ALBERGUE"}
                </td>
                <Buttons id={id} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

const Buttons = ({ id, eliminar }) => {
  return (
    <td className="align-middle">
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <Link to={"/admin/albergue/editar/" + id}>
          <button className="btn btn-primary btn-sm">Editar</button>
        </Link>
      </div>
    </td>
  );
};

export default ShelterTable;
