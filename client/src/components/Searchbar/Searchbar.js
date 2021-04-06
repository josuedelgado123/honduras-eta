import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";
import SearchBox from "./Searchbox";
import FilterSelector from "./FilterSelector";
import { makeid } from "../../utils/Functions";

const SearchBar = ({
  filterData,
  selectedFilter,
  setSelectedFilter,
  placeHolder,
  setSearchField,
  searchField,
  selectedShelterTypeFilter,
  setSelectedShelterTypeFilter,
  shelter
}) => {
  return (
    <Row className="input-group mb-3">
      <Col sm={12} md={2} className="pr-0 mb-1">
        <label htmlFor="">Departamento</label>
        <FilterSelector
          filterData={filterData}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </Col>
      <Col sm={12} md={10} className="pr-0 mb-1">
        <label htmlFor="">Ubicación</label>
        <SearchBox
          value={searchField}
          placeHolder={placeHolder}
          setSearchField={(event) => setSearchField(event.target.value)}
        />
      </Col>
      {shelter == "S" && (
        <Col sm={12} md={12} className="mb-1">
          <SearchRadioButtons
            key={makeid(4)}
            selectedShelterTypeFilter={selectedShelterTypeFilter}
            setSelectedShelterTypeFilter={setSelectedShelterTypeFilter}
          />
        </Col>
      )}
    </Row>
  );
};

const SearchRadioButtons = ({
  selectedShelterTypeFilter,
  setSelectedShelterTypeFilter
}) => {
  return (
    <Fragment>
      <div>
        <label htmlFor="">Buscar por albergue o casa de acoplo:</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="selectedShelterTypeFilter"
          onChange={(e) => setSelectedShelterTypeFilter(e.target.value)}
          checked={selectedShelterTypeFilter === ""}
          id="typeAll"
          value=""
        />
        <label className="form-check-label" htmlFor="typeAll">
          Todos
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="selectedShelterTypeFilter"
          onChange={(e) => setSelectedShelterTypeFilter(e.target.value)}
          checked={selectedShelterTypeFilter === "AE"}
          id="typeAE"
          value="AE"
        />
        <label className="form-check-label" htmlFor="typeAE">
          Albergue
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="selectedShelterTypeFilter"
          onChange={(e) => setSelectedShelterTypeFilter(e.target.value)}
          checked={selectedShelterTypeFilter === "CA"}
          id="typeCA"
          value="CA"
        />
        <label className="form-check-label" htmlFor="typeCA">
          Casa de acoplo / grupo de apoyo
        </label>
      </div>
    </Fragment>
  );
};

export default SearchBar;
