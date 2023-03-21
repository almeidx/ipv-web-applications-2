import React from "react";

class MovieList extends React.Component {
  render() {
    const detalhe = "detalhe";

    return (
      <div>
        <h1>Lista de Filmes - Props</h1>
        <Detalhe title="Titulo">{detalhe}</Detalhe>;
      </div>
    );
  }
}

function Detalhe({ title, children }) {
  return (
    <div>
      <p>{title}</p>

      {children}
    </div>
  );
}

export default MovieList;
