import React from "react";
import { Row } from "reactstrap";
import { makeid } from "../../utils/Functions";
import BoatCard from "./BoatCard";

const BoatList = ({ data }) => {
  return (
    <Row>
      {data.length > 0 ? (
        data.map(({ id, additionalInfo, phoneNumbers, department, city }) => {
          return (
            <BoatCard
              key={makeid(4)}
              additionalInfo={additionalInfo}
              phoneNumbers={phoneNumbers}
              department={department}
              city={city}
            />
          );
        })
      ) : (
        <div key={makeid(4)} className="p-2 w-100 text-center">
          Lo sentimos, no se encontraron resultados para el departamento
          seleccionado :( Estaremos agregando nuevos datos
        </div>
      )}
    </Row>
  );
};

export default BoatList;
