import { useEffect, useState } from "react";
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";

export function List() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/filme/list?limit=4")
      .then((response) => response.json())
      .then((data) => setFilmes(data));
  }, []);

  return (
    <>
      <Navbar selected="listar" />

      <h1 className="text-center mt-3 mb-5">Lista de filmes</h1>

      <main
        className="container row col-12 mx-auto"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {filmes.map(({ id, titulo, descricao, foto, generoRel }) => (
          <div
            className="col-lg-3 d-flex align-items-stretch mb-4"
            key={`card-${id}`}
          >
            <div className="card">
              <img src={foto} className="card-img-top" alt="..." />

              <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <h6 className="card-subtitle text-muted mb-2">
                  {generoRel.descricao}
                </h6>

                <p className="card-text">{descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </>
  );
}
