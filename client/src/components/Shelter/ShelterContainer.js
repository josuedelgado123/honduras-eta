import React, { useEffect, useState } from "react";
import ShelterList from "./ShelterList";
import SearchBar from "../Searchbar/Searchbar";
import { Col } from "reactstrap";
import mockShelters from "../../data/shelterMockData";
import filters from "../../data/departmentsData";
import { useAlert } from "react-alert";
import Instructions from "./Instructions";
import Loading from "../Loading/Loading";

const usaFilters = [
  {
    name: "USA",
    value: "usa"
  }
];

// const api = "http://192.168.0.38:3005/albergue";
// const api = "https://honduraseta.com/api/albergue";

const ShelterContainer = ({ department }) => {
  const alert = useAlert();
  const [searchField, setSearchField] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [shelters, setShelters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShelterTypeFilter, setSelectedShelterTypeFilter] = useState(
    ""
  );

  const fetchData = async () => {
    try {
      // estoy usando departement como country porque no tengo el campo country en la BD
      const res = await fetch(`albergue?country=${department}`);
      const shelters = await res.json();
      if (shelters.success) {
        setShelters(shelters.data);
      } else {
        alert.show(shelters.message);
      }
    } catch (error) {
      alert.error("error en el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredShelters = shelters.filter(
    (shelter) =>
      shelter["city"]
        .toString()
        .toLowerCase()
        .includes(searchField.toLowerCase()) &
      shelter["department"].toLowerCase().includes(selectedFilter) &
      shelter["shelter_type"]
        .toLowerCase()
        .includes(selectedShelterTypeFilter.toLowerCase())
  );

  const title =
    department === "USA"
      ? "Localizar un centro de apoyo en Estados Unidos"
      : "Localiza un albergue, centro de acopio o grupo de apoyo en Honduras";

  const total = shelters.length;

  return (
    <Col>
      <div id={`shelters${department}`} className="p-2 mt-1 rounded">
        <div className="box p-2 mb-2 rounded">
          <h4 className="text-center text-uppercase">{title}</h4>
          <Instructions total={total} department={department} />
          {isLoading ? (
            <Loading />
          ) : (
            <SearchBar
              key={200}
              shelter={department === "HN" ? "S" : "N"}
              setSelectedFilter={setSelectedFilter}
              setSearchField={setSearchField}
              searchField={searchField}
              placeHolder={"ciudad o municipio"}
              setSelectedShelterTypeFilter={setSelectedShelterTypeFilter}
              selectedShelterTypeFilter={selectedShelterTypeFilter}
              filterData={department === "USA" ? usaFilters : filters}
              selectedFilter={selectedFilter}
            />
          )}
        </div>
        <div className="box p-2 mb-2 rounded">
          <ShelterList data={filteredShelters} />
        </div>
      </div>
    </Col>
  );
};

export default ShelterContainer;
