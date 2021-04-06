import { Col, Button } from "reactstrap";
const { Fragment } = require("react");

const ContainerButtons = () => {
  return (
    <Fragment>
      <Col
        sm={12}
        md={4}
        className="text-center mb-1 d-flex align-items-center"
      >
        <a href="#boats" rel="noreferrer" className="w-100 h-100">
          <Button color="primary" block className="h-100">
            CONTACTAR UNA LANCHA
          </Button>
        </a>
      </Col>
      <Col
        sm={12}
        md={4}
        className="text-center mb-1 d-flex align-items-center"
      >
        <a
          href="#sheltersHN"
          rel="noreferrer"
          className="w-100 border border-primary rounded w-100 h-100"
        >
          <Button color="light text-primary" block className="h-100">
            LOCALIZAR UN ALBERGUE O CENTRO ACOPIO HN
          </Button>
        </a>
      </Col>
      <Col
        sm={12}
        md={4}
        className="text-center mb-1 d-flex align-items-center"
      >
        <a href="#sheltersUSA" rel="noreferrer" className="w-100 h-100">
          <Button color="primary" block className="h-100">
            CENTROS DE ACOPIO ESTADOS UNIDOS
          </Button>
        </a>
      </Col>
    </Fragment>
  );
};

export default ContainerButtons;
