import React from "react";

const SearchBox = ({ placeHolder, setSearchField, ...rest }) => {
  return (
    <input
      {...rest}
      className="form-control"
      id="txtSearch"
      type="search"
      placeholder={"Escriba el nombre de la " + placeHolder}
      onChange={setSearchField}
    />
  );
};

export default SearchBox;
