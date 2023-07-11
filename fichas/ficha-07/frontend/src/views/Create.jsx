import { useEffect, useState } from "react";
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Toast } from "../components/Toast.jsx";

export function Create() {
  const [generos, setGeneros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState(-1);
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/genero/list")
      .then((response) => response.json())
      .then((data) => setGeneros(data));
  }, []);

  /** @param {import("react").FormEvent<HTMLFormElement>} event */
  async function handleFilmeCreate(event) {
    event.preventDefault();

    const data = {
      titulo,
      descricao,
      foto,
      genero: Number.parseInt(genero, 10),
    };

    try {
      const response = await fetch("http://localhost:3333/filme/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      setToastMsg("Filme criado com sucesso");
      setShowToast(true);
    } catch {
      setToastMsg("Erro ao criar o filme");
      setShowToast(true);
    }
  }

  return (
    <>
      <Navbar selected="criar" />

      <main
        className="container mx-auto"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        <div className="row">
          <h1 className="text-center mt-3 mb-5">Criar um filme</h1>

          <div className="col-12">
            <form
              className="mb-5"
              onSubmit={handleFilmeCreate}
              onReset={() => {
                setTitulo("");
                setGenero(-1);
                setDescricao("");
                setFoto("");
              }}
            >
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
                  onChange={(e) => setGenero(e.target.value)}
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

              <div className="gap-2 d-flex">
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>

                <button className="btn btn-secondary" type="reset">
                  Apagar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Toast msg={toastMsg} show={showToast} hide={() => setShowToast(false)} />

      <Footer />
    </>
  );
}
