import React from "react";
import { Table } from "reactstrap";

const PeopleTable = ({ people, deletePerson }) => {
  return (
    <div>
      <Table striped hover responsive size="sm">
        <thead>
          <tr>
            <th>Persona</th>
            <th style={{ width: "20%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {people.map(({ type }) => {
            return (
              <tr key={type}>
                <td>{type}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => deletePerson(e, type)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PeopleTable;
