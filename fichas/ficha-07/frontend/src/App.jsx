import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar.jsx";

export function App() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/filme/list?limit=4")
      .then((response) => response.json())
      .then((data) => setFilmes(data));
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <form action="admin">
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                      />
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-primary" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {filmes.map(({ id, foto }) => (
            <div
              key={`slider-${id}`}
              className="carousel-item active ratio ratio-16x9"
              style={{ marginBottom: "-180px" }}
            >
              <img
                src={foto}
                className="d-block h-75 object-fit-cover"
                alt="..."
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
          style={{ marginTop: "-30px" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
          style={{ marginTop: "-30px" }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container" id="destaques">
        <div className="row">
          <h2>Filmes em destaque</h2>
        </div>

        <div className="row">
          {filmes.map(({ id, titulo, descricao, foto }) => (
            <div className="col" key={`card-${id}`}>
              <div className="card">
                <img src={foto} className="card-img-top" alt="..." />

                <div className="card-body">
                  <h5 className="card-title">{titulo}</h5>

                  <p className="card-text">{descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-light text-center text-lg-start mt-5">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          Copyright © {new Date().getFullYear()}{" "}
          <a className="text-dark" href="https://almeidx.dev/">
            almeidx.dev
          </a>{" "}
          | All rights reserved
        </div>
      </footer>
    </>
  );
}
