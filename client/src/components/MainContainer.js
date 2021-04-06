import React from "react";
import { Container, Row, Col } from "reactstrap";
import BoatContainer from "./Boat/BoatContainer";
import ShelterContainer from "./Shelter/ShelterContainer";
import Carousel from "./Carousel.js/Carousel";
import MainButtons from "./MainButtons/MainButtons";

const Example = () => {
  return (
    <Container>
      <Row className="border rounded mt-1 p-1">
        <Col className="">
          <Carousel />
        </Col>
      </Row>
      <Row className="border rounded mt-1 p-1">
        <MainButtons />
      </Row>
      <Row className="border rounded mt-1 p-1">
        <ShelterContainer key={1} department="HN" />
      </Row>
      <Row className="border rounded mt-1 p-1">
        <ShelterContainer key={2} department="USA" />
      </Row>
      <Row className="border rounded mt-1 p-1">
        <BoatContainer />
      </Row>
    </Container>
  );
};

export default Example;
