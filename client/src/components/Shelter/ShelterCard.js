import React from "react";
import { Card, Button, Col, CardSubtitle } from "reactstrap";
import CardModal from "./CardModal";
import icon from "../../resources/eye.png";

const ShelterCard = ({
  aproxPeople,
  people,
  contact,
  city,
  address,
  phoneNumbers,
  department,
  name,
  shelterType,
  delivery,
  products
}) => {
  return (
    <Col sm="12" md="6" lg="4" className="mt-1">
      <CardModal
        aproxPeople={aproxPeople}
        name={name}
        people={people}
        contact={contact}
        phoneNumbers={phoneNumbers}
        products={products}
        delivery={delivery}
        shelterType={shelterType}
        address={address}
      >
        <Card body className="mh-100 text-center">
          <CardSubtitle>
            Departamento:{" "}
            <div className="font-weight-bold text-truncate">
              {department.toUpperCase()}
            </div>
          </CardSubtitle>
          {delivery === "S" ? (
            <span className="delivery bg-warning">
              {" "}
              Podemos recoger tu donación{" "}
            </span>
          ) : null}
          <div>
            Ciudad:{" "}
            <div className="font-weight-bold text-truncate">
              {city.toUpperCase()}
            </div>
          </div>
          <div>
            {shelterType === "CA" ? "Centro de acoplo:" : "Albergue:"}{" "}
            <div className="font-weight-bold text-truncate">
              {name.toUpperCase()}
            </div>
          </div>

          <Button className="mb-1" color="primary">
            <img style={{ widht: 25, height: 25 }} src={icon}></img> VER
            DETALLES
          </Button>
        </Card>
      </CardModal>
    </Col>
  );
};

export default ShelterCard;
