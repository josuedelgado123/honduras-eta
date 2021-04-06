import React from "react";
import { Table } from "reactstrap";

const PhoneNumbersTable = ({ phoneNumbers, deletePhoneNumber }) => {
  return (
    <div>
      <Table striped hover responsive size="sm">
        <thead>
          <tr>
            <th>Nº telefono</th>
            <th style={{ width: "20%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {phoneNumbers.map(({ number }) => {
            return (
              <tr key={number}>
                <td>{number}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => deletePhoneNumber(e, number)}
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

export default PhoneNumbersTable;
