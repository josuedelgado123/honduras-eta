import { Fragment } from "react";
import { Col } from "reactstrap";

const Instructions = ({ department, total }) => {
  return (
    <Col sm={12} className="box border rounded mb-1 mt-1 p-1">
      <div>
        ¡Actualmente hay <strong>{total}</strong> de lugares registrados!
        Encontra alguno para donar.
      </div>
      <p>
        {department === "USA" ? (
          <Fragment>
            <strong className="text-uppercase">Intrucciones:</strong> <br />
            Si estás en Estados Unidos y quieres apoyar, busca acá si hay algún
            centro de acopio o grupo de apoyo registrado.
          </Fragment>
        ) : (
          <Fragment>
            <strong className="text-uppercase">Intrucciones:</strong> <br />
            Puedes localizar un albergue, para acercarte directamente, o buscar
            una casa de acopio / grupo de apoyo al cual puedas avocarte. <br />{" "}
            Algunos grupos de apoyo están incluso yendo a recoger donaciones.
          </Fragment>
        )}
        <br />
      </p>
    </Col>
  );
};

export default Instructions;
