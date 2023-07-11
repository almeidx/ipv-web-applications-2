export function Toast({ show, msg, hide }) {
  return (
    <div
      className="toast position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        bottom: "1rem",
        right: "1rem",
        display: show ? "block" : "none",
      }}
    >
      <div className="toast-body d-flex justify-content-between">
        <p className="mb-0">{msg}</p>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={() => hide()}
        ></button>
      </div>
    </div>
  );
}
