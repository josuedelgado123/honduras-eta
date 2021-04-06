import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShelterTable from "./ShelterTable";
import SearchBar from "../../components/Searchbar/Searchbar";
import filters from "../../data/departmentsData";
import Loading from "../../components/Loading/Loading";
import { useAlert } from "react-alert";

// const api = "https://honduraseta.com/api";
// const api = "http://192.168.0.38:3005";

const ShelterContainer = () => {
  const alert = useAlert();
  const [searchField, setSearchField] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedShelterTypeFilter, setSelectedShelterTypeFilter] = useState(
    ""
  );
  const [shelters, setShelters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`/albergue`);
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
    if (filters.length === 19) {
      const all = {
        name: "Todos",
        value: ""
      };
      filters.unshift(all);
    }
  }, []);

  const filteredShelters = shelters.filter(
    (shelter) =>
      shelter["name"]
        .toString()
        .toLowerCase()
        .includes(searchField.toLowerCase()) &
      shelter["department"].toLocaleLowerCase().includes(selectedFilter) &
      shelter["shelter_type"]
        .toLocaleLowerCase()
        .includes(selectedShelterTypeFilter.toLowerCase())
  );

  return (
    <div className="container mt-1">
      <div className="text-center box border rounded p-2">
        <h2 className="text-uppercase">
          Albergues, grupos de apoyo y centros de acopio registrados
        </h2>
      </div>
      <Instructions />
      <AddNewBar />
      <div className="box pl-2 pr-2 pt-2 rounded border">
        <SearchBar
          setSelectedFilter={setSelectedFilter}
          setSearchField={setSearchField}
          setSelectedShelterTypeFilter={setSelectedShelterTypeFilter}
          selectedShelterTypeFilter={selectedShelterTypeFilter}
          placeHolder={"ciudad o municipio"}
          filterData={filters}
          selectedFilter={selectedFilter}
        />
      </div>
      <div>
        {isLoading ? <Loading /> : <ShelterTable shelters={filteredShelters} />}
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="box border rounded mt-1 p-2">
      <p>
        <strong className="text-uppercase">Intrucciones:</strong> <br />
        Hay dos opciones:
        <br />
        * Registrar un nuevo albergue
        <br />
        * Editar información de un albergue ya registrado
        <br />
        Si vas a <strong>REGISTRAR</strong>: <br />
        * Valida que no se haya registrado primero, escribiendo el nombre en el
        buscador. <br />* Si <strong>NO</strong> muestra resultados,{" "}
        <strong>REGISTRA</strong> presionando el botón{" "}
        <strong>REGISTRAR NUEVO.</strong>
        <br />
        Si encuentra resultados es porque lo que vas a registrar ya existe,
        presiona el botón
        <strong> EDITAR</strong> y actualiza la información.
        <br />
        Si vas a <strong>EDITAR</strong>: <br />* Presiona el botón
        <strong> EDITAR</strong> y actualiza la información.
      </p>
    </div>
  );
};

const AddNewBar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-1 border rounded p-2 mb-1 box">
      <div className="font-weight-bold">Registrar uno nuevo</div>
      <Link to="/admin/albergue/nuevo">
        <button className="btn btn-primary">Registrar Nuevo</button>
      </Link>
    </div>
  );
};

export default ShelterContainer;
