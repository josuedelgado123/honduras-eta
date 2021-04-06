import React, { Component } from "react";
import { Table } from "reactstrap";

const ProductsTable = ({ products, deleteProduct }) => {
  return (
    <div>
      <Table striped hover responsive size="sm">
        <thead>
          <tr>
            <th>Producto</th>
            <th style={{ width: "20%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ name }) => {
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => deleteProduct(e, name)}
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

export default ProductsTable;
