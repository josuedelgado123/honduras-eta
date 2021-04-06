import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: "cover.jpeg",
    altText: "Slide 3",
    key: 4
  },
  {
    src: "requisitos.jpg",
    key: "2"
  },
  {
    src: "pueblo.jpg",
    altText: "Slide 1",
    key: "1"
  }
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;
