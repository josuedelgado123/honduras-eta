import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  Alert
} from "reactstrap";
import icon from "../../resources/icon2.png";
import { makeid } from "../../utils/Functions";

const DetailModal = ({
  children,
  name,
  aproxPeople,
  phoneNumbers,
  products,
  contact,
  people,
  delivery,
  address,
  shelterType
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const numbers =
    phoneNumbers.length > 0 ? (
      phoneNumbers.map(({ number }, i) => (
        <Button key={makeid(4)} className="mb-1 w-100" color="primary">
          <img
            style={{ width: 19, height: 19, backgroundColor: "white" }}
            src={icon}
          ></img>
          <a className="no-deco-link" href={`tel:${number}`}>
            {" "}
            (504) {number}
          </a>
        </Button>
      ))
    ) : (
      <Alert className="text-center" color="danger">
        No han registrado números telefonicos
      </Alert>
    );

  const productsList =
    products.length > 0 ? (
      products.map(({ name }) => (
        <Alert key={makeid(4)} className="text-center mb-0" color="dark">
          {name.toUpperCase()}
        </Alert>
      ))
    ) : (
      <Alert key={makeid(4)} className="text-center" color="danger">
        No han registrado los productos que necesitan
      </Alert>
    );

  const peopleList =
    people.length > 0 ? (
      people.map(({ type }) => (
        <Alert key={makeid(4)} className="text-center mb-0" color="dark">
          {type.toUpperCase()}
        </Alert>
      ))
    ) : (
      <Alert key={makeid(4)} className="text-center" color="danger">
        No han registrado las personas que necesitan
      </Alert>
    );

  return (
    <div>
      {<div onClick={toggle}>{children}</div>}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="text-center" toggle={toggle}>
          {name}
        </ModalHeader>
        <ModalBody>
          <div className="text-center bg-secondary p-2 mb-1 text-white font-weight-bold">
            <div>
              {shelterType == "CA" ? "CENTRO ACOPLO/GRUPO APOYO" : "ALBERGUE"}
            </div>
          </div>
          {delivery === "S" ? (
            <div className="text-uppercase bg-warning text-center p-1 mb-2 font-weight-bold">
              {" "}
              Podemos recoger tu donación, llamanos{" "}
            </div>
          ) : null}
          <div className="mb-1">
            <div className="text-center font-weight-bold">
              PRODUCTOS QUE NECESITAN
            </div>
            <ListGroup className="text-center">{productsList}</ListGroup>
          </div>
          <div className="mb-1">
            <div className="text-center font-weight-bold">
              COLABORADORES QUE SE NECESITAN
            </div>
            <ListGroup className="text-center">{peopleList}</ListGroup>
          </div>
          <div className="mb-1">
            <div className="text-center font-weight-bold ">
              INFORMACIÓN ADICIONAL
            </div>
            <Alert className="text-center mb-0" color="dark">
              {address}
            </Alert>
          </div>
          <div className="mb-1">
            <div className="text-center font-weight-bold ">
              CANTIDAD APROX DE PERSONAS
            </div>
            <Alert className="text-center mb-0" color="dark">
              {aproxPeople}
            </Alert>
          </div>
          <div className="mb-1">
            <div className="text-center font-weight-bold">DIRECCIÓN</div>
            <Alert className="text-center mb-0" color="dark">
              {address}
            </Alert>
          </div>
          <div className="mb-1">
            <div className="text-center font-weight-bold">CONTACTO</div>
            <Alert className="text-center mb-0" color="dark">
              {contact === "" ? "-" : contact}
            </Alert>
          </div>
          <div>
            <div className="text-center font-weight-bold">
              NÚMEROS DE TELEFONO
            </div>
            {numbers}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DetailModal;
