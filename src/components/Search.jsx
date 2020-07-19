import React from "react";

const Search = (props) => {
  const { _searchProduct, _readSearchData } = props;
  return (
    <form onSubmit={_searchProduct}>
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div className="campo">
        <label>Productos:</label>
        <input
          type="text"
          placeholder="Nombre Productos"
          name="productos"
          onChange={_readSearchData}
        />
      </div>
      <input
        type="submit"
        className="btn btn-azul btn-block"
        value="Buscar Producto"
      />
    </form>
  );
};

export default Search;
