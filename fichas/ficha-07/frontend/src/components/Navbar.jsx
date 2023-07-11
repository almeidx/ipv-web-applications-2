import { Link } from "react-router-dom";

export function Navbar({ selected }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ height: "4rem" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Filmes
        </Link>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/criar"
                className={`nav-link ${selected === "criar" ? "active" : ""}`}
                aria-current="page"
              >
                Criar
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/listar"
                className={`nav-link ${selected === "listar" ? "active" : ""}`}
                aria-current="page"
              >
                Listar
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/editar"
                className={`nav-link ${selected === "editar" ? "active" : ""}`}
                aria-current="page"
              >
                Editar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
