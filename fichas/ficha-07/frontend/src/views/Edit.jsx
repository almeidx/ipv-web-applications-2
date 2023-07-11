import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Toast } from "../components/Toast.jsx";

export function Edit() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [id, setId] = useState(-1);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState(-1);
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const dismissBtn = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3333/filme/list?limit=4")
        .then((response) => response.json())
        .then((data) => setFilmes(data)),
      fetch("http://localhost:3333/genero/list")
        .then((response) => response.json())
        .then((data) => setGeneros(data)),
    ]);
  }, []);

  function disableToast() {
    setShowToast(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  /** @param {import("react").FormEvent<HTMLFormElement>} event */
  async function handleSave(event) {
    event.preventDefault();

    function updateToast(msg) {
      setToastMsg(msg);
      setShowToast(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        disableToast();
      }, 10_000);
    }

    try {
      await fetch(`http://localhost:3333/filme/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
          foto,
          genero,
        }),
      });

      updateToast("Filme atualizado com sucesso");

      dismissBtn.current?.click();

      setFilmes((filmes) =>
        filmes.map((filme) =>
          filme.id === id
            ? {
                id,
                titulo,
                descricao,
                foto,
                generoRel: generos.find((generoRel) => generoRel.id === genero),
              }
            : filme,
        ),
      );
    } catch (error) {
      updateToast("Error ao editar filme");
    }
  }

  return (
    <>
      <Navbar selected="editar" />

      <main
        className="container mx-auto"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <h1 className="text-center mt-3 mb-5">Editar um filme</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{ minWidth: "4rem" }}>
                ID
              </th>
              <th scope="col" style={{ minWidth: "12rem" }}>
                Título
              </th>
              <th scope="col">Descrição</th>
              <th scope="col" style={{ minWidth: "8rem" }}>
                Género
              </th>
              <th scope="col" style={{ minWidth: "8rem" }}>
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {filmes.map(({ id, titulo, foto, descricao, generoRel }) => (
              <tr key={`filme-${id}`}>
                <th scope="row">{id}</th>
                <td>
                  <div className="ms-2 d-flex gap-2 align-items-center">
                    <img
                      src={foto}
                      alt="..."
                      width="42"
                      className="rounded-3"
                      style={{ aspectRatio: "1/1" }}
                    />

                    {titulo}
                  </div>
                </td>
                <td>{descricao}</td>
                <td>{generoRel.descricao}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarModal"
                    onClick={() => {
                      setId(id);
                      setTitulo(titulo);
                      setGenero(generoRel.id);
                      setDescricao(descricao);
                      setFoto(foto);
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="editarModal"
          tabIndex="-1"
          aria-labelledby="editarModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editarModalLabel">
                  Editar Filme
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={dismissBtn}
                ></button>
              </div>

              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <form>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          name="titulo"
                          id="titulo"
                          placeholder="Titulo"
                          required
                          value={titulo}
                          onChange={(e) => setTitulo(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="genero"
                          value={genero}
                          onChange={(e) =>
                            setGenero(parseInt(e.target.value, 10))
                          }
                        >
                          <option disabled value={-1}>
                            Selecione o género do filme
                          </option>

                          {generos.map(({ id, descricao }) => (
                            <option key={`genero-${id}`} value={id}>
                              {descricao}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          name="foto"
                          id="foto"
                          placeholder="URL Foto"
                          required
                          value={foto}
                          onChange={(e) => setFoto(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          name="descricao"
                          id="descricao"
                          placeholder="Descrição"
                          required
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toast
        show={showToast}
        msg={toastMsg}
        hide={() => {
          disableToast();
        }}
      />

      <Footer />
    </>
  );
}
