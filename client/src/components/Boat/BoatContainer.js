import React, { useState } from "react";
import BoatList from "./BoatList";
import SearchBar from "../Searchbar/Searchbar";
import { Button, Col } from "reactstrap";
import boats from "../../data/boatsData";
import filters from "../../data/departmentsData";

const BoatContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const filteredBoats = boats.filter(
    (boat) =>
      boat["city"]
        .toString()
        .toLowerCase()
        .includes(searchField.toLowerCase()) &
      boat["department"].toLocaleLowerCase().includes(selectedFilter)
  );

  return (
    <Col>
      <Col sm={12} md={12} className="text-center">
        <a href="#sheltersHN" rel="noreferrer">
          <Button color="warning">IR ARRIBA NUEVAMENTE</Button>
        </a>
      </Col>
      <div id="boats" className="p-2 rounded">
        <div className="box p-2 mb-2 rounded">
          <h4 className="text-center text-uppercase">
            Contacta una lancha cercana a tu ciudad o departamento
          </h4>
          <SearchBar
            setSelectedFilter={setSelectedFilter}
            setSearchField={setSearchField}
            placeHolder={"ciudad o municipio"}
            filterData={filters}
            selectedFilter={selectedFilter}
          />
        </div>
        <div className="box p-2 mb-2 rounded">
          <BoatList data={filteredBoats} />
        </div>
      </div>
    </Col>
  );
};

export default BoatContainer;
