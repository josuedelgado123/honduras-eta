import React from "react";
import { Row } from "reactstrap";
import ShelterCard from "./ShelterCard";

const ShelterList = ({ data }) => {
  return (
    <Row>
      {data.length > 0 ? (
        data.map(
          ({
            aprox_people: aproxPeople,
            shelter_id: id,
            people,
            contact,
            products,
            city,
            address,
            phone_numbers: phoneNumbers,
            shelter_type: shelterType,
            delivery,
            department,
            location,
            name
          }) => {
            return (
              <ShelterCard
                contact={contact}
                key={id}
                city={city}
                address={address}
                people={people}
                aproxPeople={aproxPeople}
                products={products}
                delivery={delivery}
                shelterType={shelterType}
                phoneNumbers={phoneNumbers}
                department={department}
                location={location}
                name={name}
              />
            );
          }
        )
      ) : (
        <div className="p-2 w-100 text-center">
          Lo sentimos, no se encontraron resultados para el departamento
          seleccionado :( Estaremos agregando nuevos datos
        </div>
      )}
    </Row>
  );
};

export default ShelterList;
