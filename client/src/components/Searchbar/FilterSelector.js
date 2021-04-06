import React from "react";

const FilterSelector = ({ filterData, selectedFilter, setSelectedFilter }) => {
  //setear las opciones que tiene el filtro
  const options = filterData.map((data, i) => (
    <option key={i} value={data.value}>
      {data.name}
    </option>
  ));
  return (
    <div className="input-group-prepend">
      <select
        style={{ backgroundColor: "#f8f9fa" }}
        value={selectedFilter}
        className="custom-select md-2"
        name="selectedFilter"
        onChange={(event) => setSelectedFilter(event.target.value)}
      >
        {options}
      </select>
    </div>
  );
};

export default FilterSelector;
