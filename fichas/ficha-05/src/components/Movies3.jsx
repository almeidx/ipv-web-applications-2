import React from "react";
import MovieCard from "./MovieCard.jsx";

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: [
        { id: 1, src: "/lenna.png" },
        { id: 2, src: "/lenna.png" },
        { id: 3, src: "/lenna.png" },
      ],
    };
  }

  render() {
    return (
      <div>
        <h1>Lista de Filmes - Props</h1>
        {this.state.pictures.map((picture) => (
          <MovieCard key={picture.id} src={picture.src}>
            Titulo
          </MovieCard>
        ))}
      </div>
    );
  }
}

export default MovieList;
