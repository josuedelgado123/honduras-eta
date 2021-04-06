import React from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import icon from "../../resources/icon2.png";
import { makeid } from "../../utils/Functions";

const BoatCard = ({ id, additionalInfo, phoneNumbers, department, city }) => {
  return (
    <Col sm="12" md="6" lg="4" className="mt-1">
      <Card body className="mh-100 text-center">
        <div>
          Departamento: <h5 className="mb-0">{department.toUpperCase()}</h5>
        </div>
        <div>
          Ciudad/Municipio: <h5 className="mb-0">{city.toUpperCase()}</h5>
        </div>
        <div>{additionalInfo}</div>
        {phoneNumbers.map(({ phoneNumber }) => {
          return (
            <Button key={makeid(4)} className="mb-1" color="primary">
              <img
                style={{ widht: 19, height: 19, backgroundColor: "white" }}
                src={icon}
              ></img>
              <a className="no-deco-link" href={`tel:${phoneNumber}`}>
                {" "}
                (504) {phoneNumber}
              </a>
            </Button>
          );
        })}
      </Card>
    </Col>
  );
};

export default BoatCard;
