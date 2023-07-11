import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Create } from "./views/Create.jsx";
import { Edit } from "./views/Edit.jsx";
import { List } from "./views/List.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/criar" element={<Create />} />
        <Route path="/editar" element={<Edit />} />
        <Route path="/listar" element={<List />} />

        <Route path="*" element={<Navigate to="/listar" replace={true} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
